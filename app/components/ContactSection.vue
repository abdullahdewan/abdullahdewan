<script setup lang="ts">
import { ref } from 'vue';
import { Send, CheckCircle2, Lock, Unlock, Mail, ShieldCheck } from 'lucide-vue-next';

const senderName = ref('');
const senderEmail = ref('');
const message = ref('');
const turnstileToken = ref('');

const secureMode = ref(false);
const secretKey = ref('SYS_SECRET_KEY');
const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref('');

const turnstileReady = ref(false);

const activateTurnstile = () => {
  if (!turnstileReady.value) turnstileReady.value = true;
};

const { playClick, playSuccessLog, playErrorLog } = useAudio();

const encryptMessage = async (plainText: string, keyString: string) => {
  const enc = new TextEncoder();
  const rawKeyBytes = enc.encode(keyString);
  const rawKey = new Uint8Array(32);
  rawKey.set(rawKeyBytes.slice(0, 32));

  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    cryptoKey,
    enc.encode(plainText)
  );

  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const encryptedArray = new Uint8Array(encrypted);
  const encryptedHex = Array.from(encryptedArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return `-----BEGIN AES-256-GCM SECURE TRANSMISSION-----\nIV: ${ivHex}\nPAYLOAD: ${encryptedHex}\n-----END AES-256-GCM SECURE TRANSMISSION-----`;
};

const sendTransmission = async (e: Event) => {
  e.preventDefault();
  if (!senderName.value || !senderEmail.value || !message.value || !turnstileToken.value) return;

  isSubmitting.value = true;
  isSuccess.value = false;
  errorMessage.value = '';

  let finalMessage = message.value;
  if (secureMode.value) {
    try {
      finalMessage = await encryptMessage(message.value, secretKey.value);
    } catch {
      errorMessage.value = 'Browser cryptographic encryption failed.';
      isSubmitting.value = false;
      playErrorLog();
      return;
    }
  }

  try {
    const res = await $fetch<{ success: boolean }>('/api/contact', {
      method: 'POST',
      body: {
        senderName: senderName.value,
        senderEmail: senderEmail.value,
        message: finalMessage,
        'cf-turnstile-response': turnstileToken.value,
        isEncrypted: secureMode.value,
        secretKey: secureMode.value ? secretKey.value : undefined,
      },
    });

    if (res.success) {
      isSuccess.value = true;
      playSuccessLog();
      senderName.value = '';
      senderEmail.value = '';
      message.value = '';
      turnstileToken.value = '';
    } else {
      errorMessage.value = 'Failed to deliver transmission. Please try again.';
      playErrorLog();
    }
  } catch {
    errorMessage.value = 'Transmission service error. Please try again.';
    playErrorLog();
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Contact Info / Direct Channels (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        <div class="space-y-3">
          <h4 class="text-lg font-bold text-foreground font-heading">
            Let's build something together.
          </h4>
          <p class="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Whether you have an upcoming project, need full-stack architecture consultancy, or wish
            to explore new engineering roles, feel free to reach out.
          </p>
        </div>

        <div class="space-y-3">
          <div class="flex items-center gap-3 bg-card border border-border p-3.5 rounded-xl">
            <div
              class="size-8 rounded-lg bg-secondary flex items-center justify-center text-accent"
            >
              <Mail class="size-4" />
            </div>
            <div>
              <span class="text-[10px] text-muted-foreground font-mono uppercase block">EMAIL</span>
              <a
                href="mailto:hello@abdullahdewan.com"
                class="text-xs text-foreground font-medium hover:text-accent transition-colors"
              >
                hello@abdullahdewan.com
              </a>
            </div>
          </div>

          <div class="flex items-center gap-3 bg-card border border-border p-3.5 rounded-xl">
            <div
              class="size-8 rounded-lg bg-secondary flex items-center justify-center text-accent"
            >
              <ShieldCheck class="size-4" />
            </div>
            <div>
              <span class="text-[10px] text-muted-foreground font-mono uppercase block"
                >ENCRYPTION PROTOCOL</span
              >
              <span class="text-xs text-foreground font-medium font-mono">
                WebCrypto AES-256-GCM End-to-End
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Transmission Form (7 cols) -->
      <div class="lg:col-span-7 bg-card border border-border rounded-xl p-6 space-y-4">
        <div v-if="isSuccess" class="py-8 text-center space-y-3">
          <div
            class="size-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto"
          >
            <CheckCircle2 class="size-6" />
          </div>
          <h4 class="text-base font-bold text-foreground font-heading">
            Message Delivered Successfully
          </h4>
          <p class="text-xs text-muted-foreground max-w-sm mx-auto">
            Thank you for reaching out. Your transmission has been received and I will respond as
            soon as possible.
          </p>
          <button
            class="px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-mono rounded-lg transition-colors cursor-pointer mt-2"
            @click="isSuccess = false"
          >
            Send Another Message
          </button>
        </div>

        <form v-else class="space-y-4" @submit="sendTransmission">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label for="name" class="text-xs font-medium text-foreground block">Name</label>
              <input
                id="name"
                v-model="senderName"
                required
                type="text"
                placeholder="Your name"
                class="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                @focusin="activateTurnstile"
              />
            </div>
            <div class="space-y-1.5">
              <label for="email" class="text-xs font-medium text-foreground block">Email</label>
              <input
                id="email"
                v-model="senderEmail"
                required
                type="email"
                placeholder="your.email@example.com"
                class="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                @focusin="activateTurnstile"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label for="message_body" class="text-xs font-medium text-foreground block"
              >Message</label
            >
            <textarea
              id="message_body"
              v-model="message"
              required
              rows="4"
              placeholder="Tell me about your project, questions, or ideas..."
              class="w-full bg-background border border-border rounded-lg p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
              @focusin="activateTurnstile"
            ></textarea>
          </div>

          <!-- Encryption Mode Switch -->
          <div
            class="bg-background/60 border border-border/80 p-3 rounded-lg flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <Lock v-if="secureMode" class="size-3.5 text-accent" />
              <Unlock v-else class="size-3.5 text-muted-foreground" />
              <span class="text-xs text-foreground font-mono">Client-Side Cipher (AES-256)</span>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="secureMode"
                type="checkbox"
                class="sr-only peer"
                aria-label="Toggle cipher encryption"
                @change="playClick()"
              />
              <div
                class="w-8 h-4 bg-secondary border border-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-muted-foreground after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:bg-accent peer-checked:bg-accent/20 peer-checked:border-accent/40"
              ></div>
            </label>
          </div>

          <div v-if="errorMessage" class="text-rose-400 text-xs font-mono">
            {{ errorMessage }}
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div class="overflow-hidden inline-block rounded-lg border border-border/60">
              <NuxtTurnstile
                v-if="turnstileReady"
                v-model="turnstileToken"
                :options="{ theme: 'dark' }"
              />
            </div>

            <button
              type="submit"
              :disabled="!turnstileToken || isSubmitting"
              class="px-5 py-2.5 bg-foreground text-background hover:bg-foreground/90 font-medium text-xs rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            >
              <Send class="size-3.5" />
              <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
