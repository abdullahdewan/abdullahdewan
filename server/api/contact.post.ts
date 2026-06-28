import { z } from 'zod';
import {
  createError,
  defineEventHandler,
  getHeader,
  getRequestIP,
  readBody,
  setResponseStatus,
} from 'h3';

const ContactSchema = z.object({
  senderName: z.string().trim().min(2, 'Name is too short').max(100),

  senderEmail: z.string().trim().email('Invalid email address').max(255),

  message: z.string().trim().min(5, 'Message is too short').max(5000),

  website: z.string().optional().default(''),

  'cf-turnstile-response': z.string().min(1, 'Turnstile token missing'),
});

function escapeDiscord(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/([`*_{}[\]()#+.!|>-])/g, '\\$1')
    .replace(/@/g, '@\u200B');
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (!config.webhookUrl) {
    console.error('Missing webhookUrl runtime config');

    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error',
    });
  }

  let body: unknown;

  try {
    body = await readBody(event);
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body',
    });
  }

  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: parsed.error.flatten(),
    });
  }

  const {
    senderName,
    senderEmail,
    message,
    website,
    'cf-turnstile-response': turnstileToken,
  } = parsed.data;

  /*
   * Honeypot
   * Bots usually fill hidden fields.
   */
  if (website) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Spam detected',
    });
  }

  /*
   * Verify Cloudflare Turnstile
   */
  const turnstile = await verifyTurnstileToken(turnstileToken, event);

  if (!turnstile.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Turnstile verification failed',
    });
  }

  const ip =
    getRequestIP(event, {
      xForwardedFor: true,
    }) ?? 'Unknown';

  const userAgent = getHeader(event, 'user-agent') ?? 'Unknown';

  const referer = getHeader(event, 'referer') ?? 'Unknown';

  const embed = {
    title: '📩 New Contact Form Submission',
    color: 0x5865f2,
    timestamp: new Date().toISOString(),

    fields: [
      {
        name: '👤 Name',
        value: escapeDiscord(senderName),
        inline: true,
      },
      {
        name: '📧 Email',
        value: escapeDiscord(senderEmail),
        inline: true,
      },
      {
        name: '💬 Message',
        value: escapeDiscord(message),
      },
      {
        name: '🌐 IP',
        value: `\`${ip}\``,
        inline: true,
      },
      {
        name: '📄 Referer',
        value: escapeDiscord(referer),
      },
      {
        name: '🖥 User Agent',
        value: escapeDiscord(userAgent).slice(0, 1024),
      },
    ],

    footer: {
      text: 'Contact Form',
    },
  };

  try {
    await $fetch(config.webhookUrl, {
      method: 'POST',

      body: {
        embeds: [embed],
      },

      timeout: 10000,

      retry: 1,
    });
  } catch (error) {
    console.error('Discord webhook failed', {
      error,
      ip,
      email: senderEmail,
    });

    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to deliver message',
    });
  }

  setResponseStatus(event, 201);

  return {
    success: true,
    message: 'Your message has been sent successfully.',
    timestamp: new Date().toISOString(),
  };
});
