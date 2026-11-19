<script setup lang="ts">
import { ArrowRight, Zap, CheckCircle2 } from '@lucide/vue';

const { roles, currentRoleIndex, startRoleTimer } = useRoleRotation();
const { scrollTo } = useNavigation();

onMounted(() => {
  startRoleTimer(4500);
});
</script>

<template>
  <section
    id="home"
    class="pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 lg:pb-36 relative overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left Column: Typography, Animated Role, Bio, Social, CTA Buttons -->
        <div class="lg:col-span-7 space-y-7">
          <div class="space-y-4">
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 select-none"
            >
              <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Dhaka, Bangladesh • Available Globally (Remote)</span>
            </div>

            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              I'm Abdullah Dewan <br />
              <span class="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-400">A&nbsp;</span>
              <span class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand">
                <Transition name="fade" mode="out-in">
                  <span :key="currentRoleIndex">{{ roles[currentRoleIndex] }}</span>
                </Transition>
              </span>
            </h1>
          </div>

          <p class="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
            A personal portfolio and systems showcase highlighting commercial engineering
            achievements, low-latency database architectures, secure API microservices, and modern
            Vue 3 / Nuxt 4 web applications.
          </p>

          <!-- Find Me On Area -->
          <div class="space-y-3 pt-2">
            <div class="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">
              Find me on
            </div>
            <div class="flex items-center gap-3">
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

          <!-- Hero Action Buttons -->
          <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              class="btn-primary w-full sm:w-auto justify-center"
              @click="scrollTo('portfolio')"
            >
              <span>View Projects</span>
              <ArrowRight class="size-4" />
            </button>

            <button
              type="button"
              class="btn-outline w-full sm:w-auto justify-center"
              @click="scrollTo('contact')"
            >
              <span>Let's Talk</span>
            </button>
          </div>
        </div>

        <!-- Right Column: Interactive Visual Card -->
        <div class="lg:col-span-5 flex justify-center">
          <div class="card-spotlight w-full max-w-md p-5 sm:p-7 space-y-6">
            <!-- Window Topbar -->
            <div class="flex items-center justify-between pb-4 border-b border-white/5">
              <div class="flex items-center gap-2">
                <span class="size-2.5 rounded-full bg-emerald-400"></span>
                <span class="text-xs font-mono font-semibold text-zinc-300"
                  >dewan.telemetry.ts</span
                >
              </div>
              <span
                class="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium"
              >
                LIVE // EDGE NODE
              </span>
            </div>

            <!-- Live Code Block -->
            <div
              class="font-mono text-xs sm:text-sm text-zinc-300 space-y-2 leading-relaxed bg-black/60 p-4 rounded-xl border border-white/5 overflow-x-auto"
            >
              <p>
                <span class="text-zinc-400 font-bold">const</span> architect =
                <span class="text-amber-300">{</span>
              </p>
              <p class="pl-4">name: <span class="text-emerald-400">'Abdullah Dewan'</span>,</p>
              <p class="pl-4">
                role: <span class="text-emerald-400">'Full-Stack Systems Architect'</span>,
              </p>
              <p class="pl-4">
                stack:
                <span class="text-zinc-300"
                  >['Vue 3', 'Nuxt 4', 'Node.js', 'PostgreSQL', 'Docker']</span
                >,
              </p>
              <p class="pl-4">
                status: <span class="text-white font-bold">'ACTIVE_FOR_HIRE'</span>,
              </p>
              <p class="pl-4">
                uptime: <span class="text-zinc-300">'Commercial Ops Since 2021'</span>
              </p>
              <p><span class="text-amber-300">}</span>;</p>
            </div>

            <!-- Quick Metric Cards Grid -->
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div class="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div class="text-xs text-zinc-400 font-mono uppercase font-semibold">
                  Edge Latency
                </div>
                <div
                  class="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1 font-mono"
                >
                  <Zap class="size-4" />
                  <span>&lt; 20ms Edge</span>
                </div>
              </div>
              <div class="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div class="text-xs text-zinc-400 font-mono uppercase font-semibold">
                  Code Quality
                </div>
                <div class="text-sm font-bold text-white flex items-center gap-1.5 mt-1 font-mono">
                  <CheckCircle2 class="size-4 text-emerald-400" />
                  <span>Type-Strict AA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
