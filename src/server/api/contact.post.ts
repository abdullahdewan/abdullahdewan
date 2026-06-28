export default defineEventHandler(async (event) => {
  const body = await readBody<{
    senderName: string;
    senderEmail: string;
    message: string;
    'cf-turnstile-response': string;
  }>(event);
  const config = useRuntimeConfig();

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing body',
    });
  }

  const { senderName, senderEmail, message, 'cf-turnstile-response': turnstileToken } = body;

  if (!senderName || !senderEmail || !message || !turnstileToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields or turnstile token',
    });
  }

  const verifyTurnstileResponse = await verifyTurnstileToken(turnstileToken, event);

  if (!verifyTurnstileResponse.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Turnstile token',
    });
  }

  if (config.webhookUrl) {
    const payload = {
      content: `**New Contact Form Submission**\n\n**Name:** ${senderName}\n**Email:** ${senderEmail}\n**Message:** ${message}`,
    };

    try {
      await $fetch(config.webhookUrl as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });
    } catch (error) {
      console.error('Failed to send webhook notification', error);
      // We don't want to throw an error if the webhook fails, just log it.
    }
  }

  return { success: true, message: 'Message sent successfully' };
});
