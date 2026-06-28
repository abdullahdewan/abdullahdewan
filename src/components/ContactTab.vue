<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle2 } from 'lucide-vue-next';

const senderName = ref('');
const senderEmail = ref('');
const message = ref('');

const isSubmitting = ref(false);
const consoleLogs = ref<string[]>([]);
const isSuccess = ref(false);

const logOutput = (text: string, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      consoleLogs.value.push(text);
      resolve(true);
    }, delay);
  });
};

const sendTransmission = async (e: Event) => {
  e.preventDefault();
  if (!senderName.value || !senderEmail.value || !message.value) return;

  isSubmitting.value = true;
  consoleLogs.value = [];
  isSuccess.value = false;

  await logOutput('INITIATING TRANSMISSION PROTOCOL...', 200);
  await logOutput('ESTABLISHING SECURE SSH TUNNEL ON PORT 22...', 400);
  await logOutput('DNS LOOKUP FOR NODE: DEWAN_BD.LOCAL...', 300);
  await logOutput('HANDSHAKE COMPLETED. PACKING PAYLOAD DATA...', 450);
  await logOutput(`SENDER_ID: ${senderName.value.toUpperCase()} <${senderEmail.value}>`, 200);
  await logOutput('ENCRYPTING PACKET USING AES-256-GCM...', 500);
  await logOutput('SENDING COMPRESSED DATA STREAM...', 600);
  await logOutput('STATUS 202: TRANSMISSION BUFFERED SUCCESSFUL!', 400);
  await logOutput('LOGGED TERMINATION HANDSHAKE.', 200);

  isSubmitting.value = false;
  isSuccess.value = true;

  // Reset form
  senderName.value = '';
  senderEmail.value = '';
  message.value = '';
};
</script>

<template>
  <div class="space-y-6">
    <div class="border-b-2 border-foreground pb-4">
      <h2 class="text-xl uppercase font-bold tracking-tight">TRANSMIT_PACKET.sh</h2>
      <p class="text-xs text-muted-foreground uppercase font-mono mt-1">
        Establish encrypted communication tunnel directly to operators terminal
      </p>
    </div>
    <div class="pt-2">
      <form
        v-if="!isSuccess && !isSubmitting"
        @submit="sendTransmission"
        class="space-y-4 font-mono text-sm"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label for="sender_name" class="text-xs uppercase text-muted-foreground font-bold"
              >SENDER_NAME:</label
            >
            <input
              id="sender_name"
              v-model="senderName"
              required
              type="text"
              placeholder="e.g. ADMIN_USER"
              class="w-full bg-background border border-foreground px-3 py-2 text-xs uppercase rounded-none focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>
          <div class="space-y-1.5">
            <label for="sender_email" class="text-xs uppercase text-muted-foreground font-bold"
              >SENDER_EMAIL:</label
            >
            <input
              id="sender_email"
              v-model="senderEmail"
              required
              type="email"
              placeholder="e.g. hello@abdullahdewan.com"
              class="w-full bg-background border border-foreground px-3 py-2 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label for="message" class="text-xs uppercase text-muted-foreground font-bold"
            >TRANSMISSION_PACKET_CONTENT:</label
          >
          <textarea
            id="message"
            v-model="message"
            required
            rows="5"
            placeholder="Type your message text here..."
            class="w-full bg-background border border-foreground p-3 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-foreground font-mono"
          ></textarea>
        </div>

        <div class="pt-2">
          <Button
            type="submit"
            class="w-full rounded-none border-2 border-foreground hover:bg-muted text-xs uppercase font-bold tracking-wider py-5 gap-2 cursor-pointer"
          >
            <Send class="size-4" />
            <span>TRANSMIT_SECURE_PACKET</span>
          </Button>
        </div>
      </form>

      <!-- Connection console logs terminal view -->
      <div
        v-if="isSubmitting || isSuccess"
        class="border border-foreground bg-black text-green-400 p-4 font-mono text-xs space-y-1.5 min-h-[220px] select-none terminal-screen"
      >
        <div v-for="(log, idx) in consoleLogs" :key="idx" class="flex gap-2">
          <span class="text-green-500 font-bold">$</span>
          <span>{{ log }}</span>
        </div>
        <div v-if="isSubmitting" class="flex items-center gap-1 mt-2">
          <span class="text-green-500 font-bold">$</span>
          <span class="animate-pulse font-bold text-white uppercase">PROCESS_RUNNING</span>
          <span class="blink-cursor"></span>
        </div>

        <div
          v-if="isSuccess"
          class="mt-4 border-2 border-green-400 p-3 text-center bg-green-950/20 text-green-300"
        >
          <div
            class="flex items-center justify-center gap-1.5 font-bold uppercase text-sm mb-1 text-green-400"
          >
            <CheckCircle2 class="size-5" />
            <span>PACKET TRANSMITTED SUCCESS</span>
          </div>
          <p class="text-[10px] uppercase text-green-300/80">
            Transmission buffered on operator's side. Connection closed.
          </p>
          <Button
            @click="isSuccess = false"
            variant="outline"
            class="mt-3 h-7 text-[9px] rounded-none border-green-400 text-green-400 bg-black hover:bg-green-400/20 px-3 uppercase font-bold"
          >
            SEND_ANOTHER
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
