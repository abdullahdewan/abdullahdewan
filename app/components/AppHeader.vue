<script setup lang="ts">
import { Menu, X } from '@lucide/vue';

const { activeSection, mobileMenuOpen, isScrolled, navItems, scrollTo } = useNavigation();
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-canvas/85 backdrop-blur-xl border-b border-line shadow-xl shadow-black/50 py-3 sm:py-4'
        : 'bg-transparent border-b border-transparent py-5 sm:py-6',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <!-- Brand Logo with Stylish Monogram -->
      <a href="/" class="flex items-center gap-3 select-none group min-w-0">
        <div class="brand-monogram shrink-0">AD</div>
        <div
          class="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-heading whitespace-nowrap"
        >
          Abdullah Dewan
        </div>
      </a>

      <!-- Desktop Navigation Capsule with Active Pill Indicator -->
      <nav
        class="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md shadow-inner"
      >
        <button
          v-for="item in navItems"
          :key="item.label"
          type="button"
          :class="[
            'px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer',
            activeSection === item.target
              ? 'bg-brand text-white shadow-md shadow-black/40'
              : 'text-zinc-400 hover:text-white hover:bg-white/5',
          ]"
          @click="scrollTo(item.target)"
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- Right Header Actions (Social Links + Let's Talk CTA + Mobile Toggle) -->
      <div class="flex items-center gap-3 sm:gap-4">
        <!-- Social Link Icons (Desktop) -->
        <div class="hidden sm:flex items-center gap-2">
          <a
            href="https://github.com/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-full bg-white/5 hover:bg-brand text-zinc-300 hover:text-white flex items-center justify-center transition-all"
            aria-label="GitHub Profile"
          >
            <IconGithub class="size-4" />
          </a>
          <a
            href="https://linkedin.com/in/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-full bg-white/5 hover:bg-brand text-zinc-300 hover:text-white flex items-center justify-center transition-all"
            aria-label="LinkedIn Profile"
          >
            <IconLinkedin class="size-4" />
          </a>
          <a
            href="https://x.com/xabdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-full bg-white/5 hover:bg-brand text-zinc-300 hover:text-white flex items-center justify-center transition-all"
            aria-label="X Profile"
          >
            <IconX class="size-4" />
          </a>
        </div>

        <div class="hidden sm:block">
          <button
            type="button"
            class="btn-primary px-5 py-2.5 text-xs"
            @click="scrollTo('contact')"
          >
            Let's Talk
          </button>
        </div>

        <!-- Mobile Hamburger Menu Button -->
        <button
          type="button"
          aria-label="Toggle navigation"
          class="lg:hidden p-2.5 rounded-xl bg-white/5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Menu v-if="!mobileMenuOpen" class="size-6" />
          <X v-else class="size-6" />
        </button>
      </div>
    </div>
  </header>
</template>
