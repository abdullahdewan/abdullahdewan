import {
  createError,
  defineEventHandler,
  getHeader,
  getRequestIP,
  readBody,
  setResponseStatus,
} from 'h3';

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
    website,
    'cf-turnstile-response': turnstileToken,
    isEncrypted,
    secretKey,
  } = parsed.data;
  let { message } = parsed.data;

  // Honeypot spam check
  if (website) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Spam detected',
    });
  }

  // Verify Cloudflare Turnstile token
  const turnstile = await verifyTurnstileToken(turnstileToken, event);
  if (!turnstile.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Turnstile verification failed',
    });
  }

  // Handle server-side decryption if cipher payload was sent
  if (isEncrypted) {
    if (!secretKey) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Decryption key missing',
      });
    }
    try {
      message = decryptAESGCM(message, secretKey);
    } catch (err) {
      console.error('Decryption failed:', err);
      throw createError({
        statusCode: 400,
        statusMessage: 'Decryption failed: check shared key integrity',
      });
    }
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
        name: '🔒 Secure Transport',
        value: isEncrypted ? '`AES-256-GCM (Decrypted Server-Side)`' : '`Plaintext`',
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
