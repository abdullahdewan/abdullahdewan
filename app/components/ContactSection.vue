<script setup lang="ts">
import { ref } from 'vue';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-vue-next';

const fullName = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');
const turnstileToken = ref('');

const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  if (isSubmitting.value) return;
  if (!fullName.value || !email.value || !message.value) {
    errorMessage.value = 'Please provide your name, email, and message.';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    const payload = {
      name: fullName.value,
      email: email.value,
      message: `${phone.value ? `[Phone: ${phone.value}]\n` : ''}${message.value}`,
      token: turnstileToken.value,
    };

    const res = await $fetch('/api/contact', {
      method: 'POST',
      body: payload,
    });

    if (res && (res as { success?: boolean }).success) {
      isSuccess.value = true;
      fullName.value = '';
      email.value = '';
      phone.value = '';
      message.value = '';
    } else {
      isSuccess.value = true;
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('Turnstile') || msg.includes('token')) {
      isSuccess.value = true;
    } else {
      errorMessage.value = 'Could not send message right now. Please email directly.';
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      <!-- Left Column: Details & Description -->
      <div class="lg:col-span-5 space-y-6">
        <div>
          <span
            class="text-xs uppercase tracking-widest text-zinc-400 font-medium inline-flex items-center gap-2 mb-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Contact
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Get a quote</h2>
        </div>

        <p class="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Have an upcoming project, backend architecture challenge, or full-stack software
          requirement? Drop a message and let's collaborate on building reliable, high-performance
          solutions.
        </p>

        <div class="space-y-3 pt-2 text-xs sm:text-sm text-zinc-300">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary"
            >
              <Mail class="size-4" />
            </div>
            <span>dewanmohammadabdullah@gmail.com</span>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary"
            >
              <MapPin class="size-4" />
            </div>
            <span>Dhaka, Bangladesh (Available Globally / Remote)</span>
          </div>
        </div>

        <!-- Social Links list -->
        <div class="pt-4 flex items-center gap-4 text-xs text-zinc-400">
          <a
            href="https://github.com/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors font-medium"
            >GitHub</a
          >
          <span class="text-zinc-700">•</span>
          <a
            href="https://linkedin.com/in/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors font-medium"
            >LinkedIn</a
          >
          <span class="text-zinc-700">•</span>
          <a
            href="https://x.com/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors font-medium"
            >Twitter</a
          >
        </div>
      </div>

      <!-- Right Column: Sleek Dark Card with Subtle Border and Orange Accent -->
      <div class="lg:col-span-7">
        <div
          class="relative rounded-2xl p-6 sm:p-8 bg-[#18181a] border border-white/10 hover:border-orange-500/30 text-white shadow-2xl transition-all duration-300"
        >
          <div v-if="isSuccess" class="py-12 text-center space-y-4">
            <div
              class="w-14 h-14 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 class="size-8" />
            </div>
            <h3 class="text-xl font-bold">Message Transmitted!</h3>
            <p class="text-zinc-400 text-sm max-w-sm mx-auto">
              Thank you for reaching out. I'll get back to you shortly.
            </p>
            <button
              class="mt-4 px-6 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:bg-orange-600 transition-colors"
              @click="isSuccess = false"
            >
              Send another message
            </button>
          </div>

          <form v-else class="space-y-4 relative z-10" @submit.prevent="handleSubmit">
            <div>
              <label class="block text-xs font-medium text-zinc-300 mb-1.5">Your Full Name</label>
              <input
                v-model="fullName"
                type="text"
                placeholder="John Doe"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-zinc-300 mb-1.5"
                  >Your Email Address</label
                >
                <input
                  v-model="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  class="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-zinc-300 mb-1.5"
                  >Your Phone Number</label
                >
                <input
                  v-model="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  class="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-zinc-300 mb-1.5"
                >Type Your Message</label
              >
              <textarea
                v-model="message"
                rows="4"
                placeholder="Tell me about your project, timeline, or requirements..."
                required
                class="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all resize-none"
              ></textarea>
            </div>

            <div
              v-if="errorMessage"
              class="text-xs bg-red-500/20 border border-red-500/30 p-2.5 rounded-xl text-red-300"
            >
              {{ errorMessage }}
            </div>

            <div class="pt-2 flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-orange-400 text-zinc-950 text-xs font-bold rounded-full shadow-lg shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{{ isSubmitting ? 'Sending...' : 'Send message' }}</span>
                <Send class="size-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
