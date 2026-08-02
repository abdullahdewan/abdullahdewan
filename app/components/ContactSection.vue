<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
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

const activeTimeouts = new Set<ReturnType<typeof setTimeout>>();

onUnmounted(() => {
  activeTimeouts.forEach(clearTimeout);
});

const logOutput = (text: string, delay: number) => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      consoleLogs.value.push(text);
      if (secureMode.value) playTick();
      activeTimeouts.delete(timeoutId);
      resolve(true);
    }, delay);
    activeTimeouts.add(timeoutId);
  });
};

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
    <div class="border-b-3 border-black dark:border-white pb-4">
      <h2
        class="text-lg font-black font-mono tracking-tight flex items-center gap-2 text-foreground uppercase"
      >
        <span class="w-3 h-5 bg-primary border border-black dark:border-white"></span>
        TRANSMIT_PACKET.sh
      </h2>
      <p class="text-xs text-foreground font-mono font-bold uppercase mt-1">
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
              class="text-[10px] uppercase text-foreground font-mono font-black tracking-wider block"
              >SENDER_NAME:</label
            >
            <input
              id="sender_name"
              v-model="senderName"
              required
              type="text"
              placeholder="e.g. ADMIN_USER"
              class="w-full bg-card border-3 border-black dark:border-white px-3.5 py-2.5 text-xs font-mono font-bold text-foreground focus:outline-none shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4] focus:shadow-[5px_5px_0px_0px_#000000] transition-all"
              @focusin="activateTurnstile"
            />
          </div>
          <div class="space-y-2">
            <label
              for="sender_email"
              class="text-[10px] uppercase text-foreground font-mono font-black tracking-wider block"
              >SENDER_EMAIL:</label
            >
            <input
              id="sender_email"
              v-model="senderEmail"
              required
              type="email"
              placeholder="e.g. hello@abdullahdewan.com"
              class="w-full bg-card border-3 border-black dark:border-white px-3.5 py-2.5 text-xs font-mono font-bold text-foreground focus:outline-none shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4] focus:shadow-[5px_5px_0px_0px_#000000] transition-all"
              @focusin="activateTurnstile"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label
            for="message"
            class="text-[10px] uppercase text-foreground font-mono font-black tracking-wider block"
            >TRANSMISSION_PACKET_CONTENT:</label
          >
          <textarea
            id="message"
            v-model="message"
            required
            rows="5"
            placeholder="Type your message text here..."
            class="w-full bg-card border-3 border-black dark:border-white p-3.5 text-xs font-mono font-bold text-foreground focus:outline-none shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4] focus:shadow-[5px_5px_0px_0px_#000000] transition-all"
            @focusin="activateTurnstile"
          ></textarea>
        </div>

        <!-- Encryption controls -->
        <div
          class="border-3 border-black dark:border-white bg-card p-3.5 shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4] flex flex-col gap-3"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-[10px] uppercase font-black text-foreground font-mono flex items-center gap-1.5"
            >
              <Lock v-if="secureMode" class="size-4 text-primary animate-pulse" />
              <Unlock v-else class="size-4 text-muted-foreground" />
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
                class="w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none border-2 border-black dark:border-white peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-2 after:border-black after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"
              ></div>
            </label>
          </div>

          <!-- Secret Key Input -->
          <div v-if="secureMode" class="space-y-1.5 pt-2 border-t-2 border-black dark:border-white">
            <span
              class="text-[9px] uppercase text-foreground font-mono font-black tracking-wider block"
              >SHARED_SECRET_KEY:</span
            >
            <input
              v-model="secretKey"
              required
              type="text"
              class="w-full bg-card border-2 border-black dark:border-white px-3 py-1.5 text-xs font-mono font-bold text-foreground focus:outline-none shadow-[2px_2px_0px_0px_#000]"
              @keydown="playTick()"
            />
            <span class="text-[8px] text-muted-foreground uppercase font-mono font-bold block">
              // Message will be encrypted in-browser before wire transit.
            </span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div class="overflow-hidden inline-block border-2 border-black">
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
            size="lg"
            variant="default"
            class="flex-1 sm:flex-none"
            @mouseenter="playTick()"
          >
            <Send class="size-4" />
            <span>TRANSMIT_SECURE_PACKET</span>
          </Button>
        </div>
      </form>

      <!-- Connection console logs terminal view -->
      <div
        v-if="isSubmitting || isSuccess"
        class="border-3 border-black dark:border-white bg-slate-950 text-cyan-400 p-5 font-mono text-xs space-y-2 min-h-60 select-none terminal-screen shadow-[5px_5px_0px_0px_#000000] dark:shadow-[5px_5px_0px_0px_#06b6d4]"
      >
        <div v-for="(log, idx) in consoleLogs" :key="idx" class="flex gap-2 leading-relaxed">
          <span class="text-yellow-400 font-black">$</span>
          <span class="font-bold">{{ log }}</span>
        </div>
        <div v-if="isSubmitting" class="flex items-center gap-2 mt-2">
          <span class="text-yellow-400 font-black">$</span>
          <span class="animate-pulse font-black text-white uppercase text-[10px] tracking-wider"
            >PROCESS_RUNNING</span
          >
          <span class="blink-cursor"></span>
        </div>

        <div
          v-if="isSuccess"
          class="mt-5 border-2 border-cyan-400 p-4 bg-cyan-950 text-cyan-200 shadow-[3px_3px_0px_0px_#000]"
        >
          <div
            class="flex items-center justify-center gap-1.5 font-black uppercase text-sm mb-1.5 text-yellow-400"
          >
            <CheckCircle2 class="size-5 text-yellow-400" />
            <span>PACKET TRANSMITTED SUCCESS</span>
          </div>
          <p class="text-[10px] uppercase text-cyan-300 font-bold tracking-wider text-center">
            Transmission buffered on operator's side. Connection closed.
          </p>
          <Button
            variant="secondary"
            size="sm"
            class="mt-4 w-full"
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
