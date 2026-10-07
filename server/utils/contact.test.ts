import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import { ContactSchema, escapeDiscord, decryptAESGCM } from './contact';

describe('contact server utils', () => {
  describe('escapeDiscord', () => {
    it('escapes Markdown and mention symbols', () => {
      const input = 'Hello @everyone *bold* _italic_ `code` [link](url) #heading >quote';
      const output = escapeDiscord(input);

      expect(output).toContain('@\u200Beveryone');
      expect(output).toContain('\\*bold\\*');
      expect(output).toContain('\\_italic\\_');
      expect(output).toContain('\\`code\\`');
    });
  });

  describe('ContactSchema validation', () => {
    it('accepts valid contact payload', () => {
      const payload = {
        senderName: 'John Doe',
        senderEmail: 'john@example.com',
        message: 'This is a genuine inquiry message.',
        website: '',
        'cf-turnstile-response': 'valid-turnstile-token',
        isEncrypted: false,
      };

      const result = ContactSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it('rejects payload with invalid email', () => {
      const payload = {
        senderName: 'John Doe',
        senderEmail: 'not-an-email',
        message: 'This is a test message.',
        'cf-turnstile-response': 'token',
      };

      const result = ContactSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    it('rejects payload missing turnstile token', () => {
      const payload = {
        senderName: 'John Doe',
        senderEmail: 'john@example.com',
        message: 'This is a test message.',
        'cf-turnstile-response': '',
      };

      const result = ContactSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });

  describe('decryptAESGCM', () => {
    it('successfully decrypts an AES-256-GCM encrypted payload', () => {
      const secret = 'super-secret-key-12345';
      const plaintext = 'Confidential message content';

      // Encrypt
      const iv = crypto.randomBytes(12);
      const key = Buffer.alloc(32);
      const rawKeyBytes = Buffer.from(secret);
      rawKeyBytes.copy(key, 0, 0, Math.min(rawKeyBytes.length, 32));

      const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
      let ciphertext = cipher.update(plaintext, 'utf8');
      ciphertext = Buffer.concat([ciphertext, cipher.final()]);
      const tag = cipher.getAuthTag();
      const payload = Buffer.concat([ciphertext, tag]);

      const formattedBlock = `IV: ${iv.toString('hex')}\nPAYLOAD: ${payload.toString('hex')}`;

      const decrypted = decryptAESGCM(formattedBlock, secret);
      expect(decrypted).toBe(plaintext);
    });

    it('throws error when secret key is incorrect', () => {
      const secret = 'correct-key-12345';
      const wrongSecret = 'wrong-key-99999';
      const plaintext = 'Secret';

      const iv = crypto.randomBytes(12);
      const key = Buffer.alloc(32);
      Buffer.from(secret).copy(key, 0, 0, Math.min(secret.length, 32));

      const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
      const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
      const tag = cipher.getAuthTag();
      const payload = Buffer.concat([ciphertext, tag]);
      const formattedBlock = `IV: ${iv.toString('hex')}\nPAYLOAD: ${payload.toString('hex')}`;

      expect(() => decryptAESGCM(formattedBlock, wrongSecret)).toThrow();
    });
  });
});
