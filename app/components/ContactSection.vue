<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '~/components/ui/button';
import { Send, CheckCircle2, Lock, Unlock } from 'lucide-vue-next';

const senderName = ref('');
const senderEmail = ref('');
const message = ref('');
const turnstileToken = ref('');

const secureMode = ref(false);
const secretKey = ref('SYS_TEMP_KEY_8X');
const isSubmitting = ref(false);
const consoleLogs = ref<string[]>([]);
const isSuccess = ref(false);

const turnstileReady = ref(false);

const activateTurnstile = () => {
  if (!turnstileReady.value) turnstileReady.value = true;
};

const { playClick, playTick, playSuccessLog, playErrorLog } = useAudio();
const { colorMode } = useTheme();

const logOutput = (text: string, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      consoleLogs.value.push(text);
      if (secureMode.value) playTick();
      resolve(true);
    }, delay);
  });
};

const encryptMessage = async (plainText: string, keyString: string) => {
  const enc = new TextEncoder();
  // Pad/slice key to 32 bytes with null bytes to align with backend Buffer allocation
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

  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for GCM mode

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
  consoleLogs.value = [];
  isSuccess.value = false;

  await logOutput('INITIATING TRANSMISSION PROTOCOL...', 200);

  let finalMessage = message.value;
  if (secureMode.value) {
    await logOutput('GENERATING EPHEMERAL AES KEY FROM SHARED SECRET...', 300);
    await logOutput('ENCRYPTING PLAIN TEXT PACKETS WITH AES-256-GCM...', 400);
    try {
      finalMessage = await encryptMessage(message.value, secretKey.value);
      await logOutput('CIPHERTEXT PACKET ENCODED SUCCESS.', 200);
    } catch (err) {
      console.warn(err);
      await logOutput('CRYPTOGRAPHY ERROR: ENCRYPTION FAILED.', 200);
      isSubmitting.value = false;
      playErrorLog();
      return;
    }
  }

  await logOutput('ESTABLISHING SECURE TUNNEL TO API ENDPOINT...', 300);

  try {
    const res = await $fetch('/api/contact', {
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
      await logOutput('HANDSHAKE COMPLETED. PAYLOAD DATA DELIVERED...', 400);
      await logOutput(`SENDER_ID: ${senderName.value.toUpperCase()} <${senderEmail.value}>`, 200);
      await logOutput('STATUS 200: TRANSMISSION SUCCESSFUL!', 300);
      isSuccess.value = true;
      playSuccessLog();
    } else {
      await logOutput('STATUS 500: TRANSMISSION FAILED!', 400);
      playErrorLog();
    }
  } catch (err) {
    console.warn(err);
    await logOutput('STATUS 500: TRANSMISSION FAILED.', 400);
    playErrorLog();
  } finally {
    isSubmitting.value = false;
  }

  if (isSuccess.value) {
    senderName.value = '';
    senderEmail.value = '';
    message.value = '';
    turnstileToken.value = '';
  }
};
</script>

<template>
  <div class="space-y-6 font-sans">
    <div class="border-b border-border/60 pb-4">
      <h2
        class="text-lg font-bold font-heading tracking-tight flex items-center gap-2 text-foreground"
      >
        <span class="w-1 h-5 bg-primary rounded-full"></span>
        TRANSMIT_PACKET.sh
      </h2>
      <p class="text-xs text-muted-foreground uppercase font-mono mt-1">
        Establish encrypted communication tunnel directly to operators terminal
      </p>
    </div>

    <div class="pt-2">
      <!-- Form Deck -->
      <form v-if="!isSuccess && !isSubmitting" class="space-y-5" @submit="sendTransmission">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label
              for="sender_name"
              class="text-[10px] uppercase text-muted-foreground font-mono font-bold tracking-wider"
              >SENDER_NAME:</label
            >
            <input
              id="sender_name"
              v-model="senderName"
              required
              type="text"
              placeholder="e.g. ADMIN_USER"
              class="w-full bg-card/30 border border-border px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 font-mono"
              @focusin="activateTurnstile"
            />
          </div>
          <div class="space-y-2">
            <label
              for="sender_email"
              class="text-[10px] uppercase text-muted-foreground font-mono font-bold tracking-wider"
              >SENDER_EMAIL:</label
            >
            <input
              id="sender_email"
              v-model="senderEmail"
              required
              type="email"
              placeholder="e.g. hello@abdullahdewan.com"
              class="w-full bg-card/30 border border-border px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 font-mono"
              @focusin="activateTurnstile"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label
            for="message"
            class="text-[10px] uppercase text-muted-foreground font-mono font-bold tracking-wider"
            >TRANSMISSION_PACKET_CONTENT:</label
          >
          <textarea
            id="message"
            v-model="message"
            required
            rows="5"
            placeholder="Type your message text here..."
            class="w-full bg-card/30 border border-border p-3.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 font-sans"
            @focusin="activateTurnstile"
          ></textarea>
        </div>

        <!-- Encryption controls -->
        <div class="border border-border/80 bg-card/20 p-3 rounded-xl flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span
              class="text-[9px] uppercase font-bold text-foreground font-mono flex items-center gap-1.5"
            >
              <Lock v-if="secureMode" class="size-3.5 text-primary animate-pulse" />
              <Unlock v-else class="size-3.5 text-muted-foreground" />
              CIPHER ENCRYPTION MODE (AES-256-GCM)
            </span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="secureMode"
                type="checkbox"
                class="sr-only peer"
                aria-label="Toggle cipher encryption mode"
                @change="playClick()"
              />
              <div
                class="w-7 h-4 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white dark:after:bg-slate-400 after:border after:border-slate-300 dark:after:border-slate-600 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary dark:peer-checked:after:bg-slate-950"
              ></div>
            </label>
          </div>

          <!-- Secret Key Input -->
          <div v-if="secureMode" class="space-y-1.5 pt-1.5 border-t border-border/40">
            <span class="text-[8px] uppercase text-primary font-mono font-bold tracking-wider block"
              >SHARED_SECRET_KEY:</span
            >
            <input
              v-model="secretKey"
              required
              type="text"
              class="w-full bg-card/45 border border-border px-3 py-1.5 text-[10px] rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 font-mono text-foreground"
              @keydown="playTick()"
            />
            <span class="text-[7px] text-muted-foreground uppercase font-mono block">
              // Message will be encrypted in-browser before wire transit.
            </span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div class="overflow-hidden inline-block">
            <NuxtTurnstile
              v-if="turnstileReady"
              :key="colorMode"
              v-model="turnstileToken"
              :options="{ theme: colorMode === 'dark' ? 'dark' : 'light' }"
            />
          </div>

          <Button
            type="submit"
            :disabled="!turnstileToken"
            class="flex-1 sm:flex-none rounded-xl border border-primary/45 bg-primary text-primary-foreground hover:bg-primary/95 text-xs uppercase font-mono font-bold tracking-wider py-5 gap-2 cursor-pointer shadow-[0_4px_15px_rgba(6,182,212,0.15)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.25)] transition-all duration-300"
            @mouseenter="playTick()"
          >
            <Send class="size-3.5" />
            <span>TRANSMIT_SECURE_PACKET</span>
          </Button>
        </div>
      </form>

      <!-- Connection console logs terminal view -->
      <div
        v-if="isSubmitting || isSuccess"
        class="border border-border/80 bg-slate-950 text-cyan-400 p-5 rounded-2xl font-mono text-xs space-y-2 min-h-60 select-none terminal-screen shadow-lg"
      >
        <div v-for="(log, idx) in consoleLogs" :key="idx" class="flex gap-2 leading-relaxed">
          <span class="text-cyan-500 font-bold">$</span>
          <span>{{ log }}</span>
        </div>
        <div v-if="isSubmitting" class="flex items-center gap-2 mt-2">
          <span class="text-cyan-500 font-bold">$</span>
          <span class="animate-pulse font-bold text-white uppercase text-[10px] tracking-wider"
            >PROCESS_RUNNING</span
          >
          <span class="blink-cursor"></span>
        </div>

        <div
          v-if="isSuccess"
          class="mt-5 border border-cyan-500/40 p-4 rounded-xl text-center bg-cyan-950/20 text-cyan-200"
        >
          <div
            class="flex items-center justify-center gap-1.5 font-bold uppercase text-sm mb-1.5 text-cyan-400"
          >
            <CheckCircle2 class="size-5" />
            <span>PACKET TRANSMITTED SUCCESS</span>
          </div>
          <p class="text-[10px] uppercase text-cyan-300/80 tracking-wider">
            Transmission buffered on operator's side. Connection closed.
          </p>
          <Button
            variant="outline"
            class="mt-4 h-8 text-[9px] rounded-lg border-cyan-500/60 text-cyan-400 bg-transparent hover:bg-cyan-400/10 px-4 uppercase font-bold"
            @click="
              isSuccess = false;
              playClick();
            "
            @mouseenter="playTick()"
          >
            SEND_ANOTHER
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
