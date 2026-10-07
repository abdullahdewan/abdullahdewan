import { z } from 'zod';
import crypto from 'crypto';

export const ContactSchema = z.object({
  senderName: z.string().trim().min(2, 'Name is too short').max(100),
  senderEmail: z.string().trim().email('Invalid email address').max(255),
  message: z.string().trim().min(5, 'Message is too short').max(10000),
  website: z.string().optional().default(''),
  'cf-turnstile-response': z.string().min(1, 'Turnstile token missing'),
  isEncrypted: z.boolean().optional().default(false),
  secretKey: z.string().optional(),
});

export function escapeDiscord(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/([`*_{}[\]()#+.!|>-])/g, '\\$1')
    .replace(/@/g, '@\u200B');
}

export function decryptAESGCM(encryptedBlock: string, keyString: string): string {
  const lines = encryptedBlock.split('\n');
  let ivHex = '';
  let payloadHex = '';

  for (const line of lines) {
    if (line.startsWith('IV: ')) ivHex = line.replace('IV: ', '').trim();
    if (line.startsWith('PAYLOAD: ')) payloadHex = line.replace('PAYLOAD: ', '').trim();
  }

  if (!ivHex || !payloadHex) {
    throw new Error('Invalid secure transmission format');
  }

  const iv = Buffer.from(ivHex, 'hex');
  const payload = Buffer.from(payloadHex, 'hex');

  const tagLength = 16;
  if (payload.length <= tagLength) {
    throw new Error('Ciphertext payload is too short');
  }

  const ciphertext = payload.subarray(0, payload.length - tagLength);
  const tag = payload.subarray(payload.length - tagLength);

  // Derive key: pad/slice to exactly 32 bytes for AES-256
  const key = Buffer.alloc(32);
  const rawKeyBytes = Buffer.from(keyString);
  rawKeyBytes.copy(key, 0, 0, Math.min(rawKeyBytes.length, 32));

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(ciphertext, undefined, 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
