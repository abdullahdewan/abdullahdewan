<script setup lang="ts">
import { Mail, MapPin, CheckCircle2, ArrowRight, Clock } from '@lucide/vue';

const fullName = ref('');
const email = ref('');
const phone = ref('');
const subject = ref('');
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
      message: `${subject.value ? `[Subject: ${subject.value}]\n` : ''}${phone.value ? `[Phone: ${phone.value}]\n` : ''}${message.value}`,
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
      subject.value = '';
      message.value = '';
    } else {
      errorMessage.value = 'Could not deliver transmission. Please email directly.';
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : '';
    errorMessage.value = msg || 'Could not send message right now. Please email directly.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="space-y-12">
    <!-- Clean Section Head -->
    <div class="text-center space-y-4 max-w-3xl mx-auto">
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
        Let's Connect & Collaborate
      </h2>
      <p class="text-zinc-400 text-base sm:text-lg leading-relaxed">
        Have an open position, high-concurrency architecture challenge, or project in mind? Reach
        out directly.
      </p>
    </div>

    <!-- Contact Card Wrapper -->
    <div class="card-spotlight p-6 sm:p-10 lg:p-14">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <!-- Left Column: Contact Details -->
        <div class="lg:col-span-5 space-y-8">
          <div class="space-y-3">
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Get Ready To Build <br />
              Reliable Systems
            </h3>
            <p class="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Available for full-time senior engineering roles, architectural consultations, and
              mission-critical software initiatives.
            </p>
          </div>

          <!-- Contact Items List -->
          <ul class="space-y-6">
            <li class="flex items-start gap-4 group min-w-0">
              <div
                class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-brand transition-all duration-300 shrink-0"
              >
                <Mail class="size-5" />
              </div>
              <div class="space-y-1 min-w-0">
                <div class="text-xs font-mono text-zinc-400 uppercase tracking-wider">E-mail:</div>
                <a
                  href="mailto:dewanmohammadabdullah@gmail.com"
                  class="text-sm sm:text-base font-semibold text-white hover:underline transition-colors block break-all sm:break-normal"
                >
                  dewanmohammadabdullah@gmail.com
                </a>
              </div>
            </li>

            <li class="flex items-start gap-4 group">
              <div
                class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-brand transition-all duration-300 shrink-0"
              >
                <MapPin class="size-5" />
              </div>
              <div class="space-y-1">
                <div class="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Location:
                </div>
                <div class="text-sm sm:text-base font-semibold text-white">Dhaka, Bangladesh</div>
                <div class="text-xs text-zinc-400">Available Globally (Remote)</div>
              </div>
            </li>

            <li class="flex items-start gap-4 group">
              <div
                class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-brand transition-all duration-300 shrink-0"
              >
                <Clock class="size-5" />
              </div>
              <div class="space-y-1">
                <div class="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Availability:
                </div>
                <div class="text-sm sm:text-base font-semibold text-white">
                  Open for Full-Time Roles
                </div>
                <div class="text-xs text-emerald-400 font-mono font-semibold">
                  STATUS: ACTIVE_FOR_HIRE
                </div>
              </div>
            </li>
          </ul>

          <!-- Social Links with Authentic SVG Icons -->
          <div class="pt-4 border-t border-white/5 flex items-center gap-3">
            <a
              href="https://github.com/abdullahdewan"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              aria-label="GitHub Profile"
            >
              <IconGithub class="size-5" />
            </a>
            <a
              href="https://linkedin.com/in/abdullahdewan"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              aria-label="LinkedIn Profile"
            >
              <IconLinkedin class="size-5" />
            </a>
            <a
              href="https://x.com/xabdullahdewan"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              aria-label="X Profile"
            >
              <IconX class="size-5" />
            </a>
          </div>
        </div>

        <!-- Right Column: Interactive Contact Form -->
        <div class="lg:col-span-7 w-full">
          <div v-if="isSuccess" class="py-16 text-center space-y-4">
            <div
              class="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 class="size-8" />
            </div>
            <h3 class="text-2xl font-bold text-white">Message Transmitted</h3>
            <p class="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out. Your transmission has been recorded, and I will reply to
              your message promptly.
            </p>
            <button type="button" class="btn-primary mt-4" @click="isSuccess = false">
              Send Another Transmission
            </button>
          </div>

          <form v-else class="space-y-5" @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <input
                  id="contact-name"
                  v-model="fullName"
                  name="name"
                  type="text"
                  autocomplete="name"
                  placeholder="Your Name *"
                  required
                  class="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <input
                  id="contact-phone"
                  v-model="phone"
                  name="phone"
                  type="tel"
                  autocomplete="tel"
                  placeholder="Phone Number (Optional)"
                  class="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <input
                  id="contact-email"
                  v-model="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  placeholder="Your Email *"
                  required
                  class="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <input
                  id="contact-subject"
                  v-model="subject"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  class="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <textarea
                id="contact-message"
                v-model="message"
                name="message"
                rows="5"
                placeholder="Your Message *"
                required
                class="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all resize-none"
              ></textarea>
            </div>

            <div
              v-if="errorMessage"
              class="text-xs bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-red-300"
            >
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-primary w-full disabled:opacity-50"
            >
              <span>{{ isSubmitting ? 'Transmitting...' : 'Send Message Now' }}</span>
              <ArrowRight class="size-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
