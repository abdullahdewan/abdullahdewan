<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '#imports';
import { Menu, X, Twitter, Github, Linkedin, ArrowDown, Zap, CheckCircle2 } from 'lucide-vue-next';

import AboutSection from '~/components/AboutSection.vue';
import ProjectsSection from '~/components/ProjectsSection.vue';
import SkillsSection from '~/components/SkillsSection.vue';
import ContactSection from '~/components/ContactSection.vue';

useHead({
  title: 'Abdullah Dewan — Full-Stack Engineer & Architect',
  htmlAttrs: { lang: 'en' },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#111112' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: 'https://abdullahdewan.com' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Abdullah Dewan',
        url: 'https://abdullahdewan.com',
        jobTitle: 'Full-Stack Software Engineer & Backend Systems Architect',
        sameAs: [
          'https://github.com/abdullahdewan',
          'https://linkedin.com/in/abdullahdewan',
          'https://x.com/abdullahdewan',
        ],
        knowsAbout: [
          'Vue.js',
          'Nuxt',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'PostgreSQL',
          'MySQL',
          'Docker',
          'Tailwind CSS',
        ],
      }),
    },
  ],
});

useSeoMeta({
  title: 'Abdullah Dewan — Full-Stack Engineer & Architect',
  description:
    'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect specializing in Vue, Nuxt, TypeScript, and modern scalable systems.',
  ogTitle: 'Abdullah Dewan — Full-Stack Engineer & Architect',
  ogDescription:
    'Full-Stack Engineer and Backend Systems Architect specializing in Vue, Nuxt, TypeScript, and modern scalable systems.',
  ogType: 'website',
  ogUrl: 'https://abdullahdewan.com',
  ogLocale: 'en_US',
  ogSiteName: 'Abdullah Dewan Portfolio',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Abdullah Dewan — Full-Stack Engineer & Architect',
  twitterDescription:
    'Full-Stack Engineer and Backend Systems Architect specializing in Vue, Nuxt, TypeScript, and high-performance applications.',
});

const mobileMenuOpen = ref(false);

const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Works', target: 'works' },
  { label: 'Skills', target: 'skills' },
  { label: 'Resume', url: '/resume' },
  { label: 'Contact', target: 'contact' },
];

const scrollTo = (id: string) => {
  mobileMenuOpen.value = false;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-[#111112] text-foreground font-sans relative overflow-x-hidden p-3 sm:p-6 lg:p-10 flex justify-center items-center"
  >
    <!-- Floating Background Cubes outside the canvas for depth -->
    <div class="isometric-cube -top-4 -left-4 sm:top-6 sm:left-6 opacity-75 hidden md:block"></div>
    <div
      class="isometric-cube isometric-cube-dark top-1/4 -right-6 opacity-60 hidden md:block"
    ></div>
    <div class="isometric-cube top-3/4 -left-6 sm:left-4 opacity-70 hidden md:block"></div>
    <div
      class="isometric-cube isometric-cube-sm -bottom-4 right-1/4 opacity-80 hidden md:block"
    ></div>

    <!-- MAIN FLOATING CANVAS FRAME -->
    <div
      class="blackorange-canvas w-full max-w-7xl mx-auto min-h-[92vh] flex flex-col relative z-10 p-6 sm:p-10 lg:p-14 overflow-hidden"
    >
      <!-- Gradient rim highlight -->
      <div class="canvas-rim"></div>

      <!-- HEADER NAVIGATION -->
      <header class="flex items-center justify-between relative z-30 mb-8 sm:mb-12">
        <!-- Minimal Hamburger / Nav Trigger -->
        <button
          type="button"
          aria-label="Toggle navigation menu"
          class="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Menu v-if="!mobileMenuOpen" class="size-6" />
          <X v-else class="size-6" />
        </button>

        <!-- Brand Mark: BlackOrange -->
        <div class="text-lg sm:text-xl font-bold tracking-tight select-none">
          <span class="text-white">Abdullah</span> <span class="text-primary">Dewan</span>
        </div>

        <!-- Desktop Quick Nav Links -->
        <nav class="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-medium">
          <template v-for="item in navItems" :key="item.label">
            <a v-if="item.url" :href="item.url" class="hover:text-primary transition-colors">
              {{ item.label }}
            </a>
            <button
              v-else
              class="hover:text-primary transition-colors cursor-pointer"
              @click="scrollTo(item.target!)"
            >
              {{ item.label }}
            </button>
          </template>
        </nav>

        <!-- Top Right Actions -->
        <div class="flex items-center gap-3">
          <a
            href="/resume"
            class="text-xs font-semibold bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white px-3.5 py-2 rounded-full border border-white/10 transition-all"
          >
            Resume
          </a>
          <button
            class="text-xs font-bold bg-primary hover:bg-orange-400 text-zinc-950 px-4 py-2 rounded-full shadow-sm hover:shadow-orange-500/20 transition-all cursor-pointer"
            @click="scrollTo('contact')"
          >
            Let's talk
          </button>
        </div>
      </header>

      <!-- Mobile Dropdown Nav Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden absolute top-20 left-6 right-6 bg-[#1b1b1d] border border-white/10 rounded-2xl p-5 shadow-2xl z-40 space-y-3"
      >
        <template v-for="item in navItems" :key="item.label">
          <a
            v-if="item.url"
            :href="item.url"
            class="block w-full text-left py-2 px-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            {{ item.label }}
          </a>
          <button
            v-else
            class="block w-full text-left py-2 px-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            @click="scrollTo(item.target!)"
          >
            {{ item.label }}
          </button>
        </template>
      </div>

      <!-- MAIN CONTENT WRAPPER WITH LEFT VERTICAL SIDEBAR -->
      <div class="flex-1 flex relative">
        <!-- LEFT VERTICAL SIDEBAR: Socials & Scroll Indicator -->
        <aside
          class="hidden sm:flex flex-col justify-between items-center w-12 shrink-0 py-4 mr-6 select-none relative z-20"
        >
          <!-- Social Icons list -->
          <div class="flex flex-col gap-6 text-zinc-400">
            <a
              href="https://github.com/abdullahdewan"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github class="size-4" />
            </a>
            <a
              href="https://linkedin.com/in/abdullahdewan"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin class="size-4" />
            </a>
            <a
              href="https://x.com/xabdullahdewan"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter class="size-4" />
            </a>
          </div>

          <!-- Vertical "scroll down" indicator -->
          <div
            class="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-400 rotate-180 hover:text-white transition-colors cursor-pointer [writing-mode:vertical-rl]"
            @click="scrollTo('about')"
          >
            <span>scroll down</span>
            <ArrowDown class="size-3" />
          </div>
        </aside>

        <!-- SECTIONS CONTAINER -->
        <main class="flex-1 space-y-24 sm:space-y-32">
          <!-- HERO SECTION -->
          <section id="hero" class="relative min-h-125 lg:min-h-145 flex items-center">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
              <!-- Left Hero Text -->
              <div class="lg:col-span-7 space-y-5">
                <div class="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <span class="w-4 h-[1.5px] bg-zinc-500 inline-block"></span>
                  <span>Hello</span>
                </div>

                <h1
                  class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
                >
                  I'm <span class="text-white">Abdullah </span>
                  <span class="text-primary">Dewan</span>
                </h1>

                <p class="text-zinc-400 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
                  A full-stack software engineer & backend systems architect crafting resilient,
                  high-speed digital experiences.
                </p>

                <div class="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    class="bg-primary hover:bg-orange-400 text-zinc-950 text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition-all cursor-pointer"
                    @click="scrollTo('about')"
                  >
                    Learn more
                  </button>

                  <button
                    class="bg-white/5 hover:bg-white/10 text-zinc-300 text-xs sm:text-sm font-medium px-6 py-3 rounded-full border border-white/10 transition-all cursor-pointer"
                    @click="scrollTo('works')"
                  >
                    View works
                  </button>

                  <a
                    href="/resume"
                    class="bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-full border border-white/10 transition-all"
                  >
                    Resume
                  </a>
                </div>
              </div>

              <!-- Right Hero: Code & Engine Architecture Card with Floating 3D Cubes -->
              <div class="lg:col-span-5 relative flex justify-center items-center">
                <!-- Floating 3D Cubes around the card -->
                <div class="isometric-cube isometric-cube-sm -top-6 right-6 opacity-90"></div>
                <div class="isometric-cube isometric-cube-sm -bottom-4 -left-4 opacity-80"></div>

                <!-- Code Terminal & Live Engine Preview Card -->
                <div
                  class="relative w-full max-w-sm sm:max-w-md bg-[#161618] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4"
                >
                  <!-- Header bar -->
                  <div class="flex items-center justify-between pb-3 border-b border-white/5">
                    <div class="flex items-center gap-2">
                      <div class="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
                    </div>
                    <span class="text-[11px] font-mono text-zinc-400">dewan.server.ts</span>
                  </div>

                  <!-- Code lines preview -->
                  <div
                    class="font-mono text-xs text-zinc-300 space-y-2 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5"
                  >
                    <p>
                      <span class="text-orange-400">const</span> engineer =
                      <span class="text-amber-300">{</span>
                    </p>
                    <p class="pl-4">
                      name: <span class="text-emerald-400">'Abdullah Dewan'</span>,
                    </p>
                    <p class="pl-4">
                      role: <span class="text-emerald-400">'Full-Stack Architect'</span>,
                    </p>
                    <p class="pl-4">
                      stack: <span class="text-zinc-400">['Vue', 'Nuxt', 'TS', 'Node', 'PG']</span>,
                    </p>
                    <p class="pl-4">
                      status: <span class="text-orange-400">'Ready for Impact'</span>
                    </p>
                    <p><span class="text-amber-300">}</span>;</p>
                  </div>

                  <!-- Quick Stats Grid in Hero Card -->
                  <div class="grid grid-cols-2 gap-2.5 pt-1">
                    <div class="p-2.5 rounded-xl bg-white/2 border border-white/5">
                      <div class="text-[10px] text-zinc-400 font-mono">LATENCY</div>
                      <div
                        class="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5"
                      >
                        <Zap class="size-3" />
                        <span>&lt; 20ms Edge</span>
                      </div>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white/2 border border-white/5">
                      <div class="text-[10px] text-zinc-400 font-mono">CODE QUALITY</div>
                      <div class="text-xs font-bold text-orange-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 class="size-3" />
                        <span>Type-Strict</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ABOUT SECTION -->
          <section id="about">
            <AboutSection />
          </section>

          <!-- FEATURED WORKS SECTION -->
          <section id="works">
            <ProjectsSection />
          </section>

          <!-- MY SKILLS SECTION -->
          <section id="skills">
            <SkillsSection />
          </section>

          <!-- GET A QUOTE / CONTACT SECTION -->
          <section id="contact">
            <ContactSection />
          </section>
        </main>
      </div>

      <!-- FOOTER -->
      <footer
        class="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4"
      >
        <div>© {{ new Date().getFullYear() }} Abdullah Dewan. All Rights Reserved.</div>
        <div class="flex items-center gap-6">
          <button
            class="hover:text-white transition-colors cursor-pointer"
            @click="scrollTo('hero')"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
