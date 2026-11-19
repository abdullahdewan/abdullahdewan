<script setup lang="ts">
import { ArrowRight } from '@lucide/vue';

const { activeSection, mobileMenuOpen, navItems, scrollTo } = useNavigation();
</script>

<template>
  <Transition name="fade">
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-6 pt-28"
    >
      <div class="space-y-2">
        <button
          v-for="item in navItems"
          :key="item.label"
          type="button"
          :class="[
            'w-full text-left py-3.5 px-4 text-lg font-bold rounded-xl transition-all flex items-center justify-between cursor-pointer',
            activeSection === item.target
              ? 'bg-brand text-white shadow-lg shadow-black/40'
              : 'text-zinc-300 hover:text-white hover:bg-white/5',
          ]"
          @click="scrollTo(item.target)"
        >
          <span>{{ item.label }}</span>
          <ArrowRight v-if="activeSection === item.target" class="size-4 text-white" />
        </button>
      </div>

      <div class="pt-6 border-t border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <a
            href="https://github.com/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon w-10 h-10"
            aria-label="GitHub Profile"
          >
            <IconGithub class="size-4" />
          </a>
          <a
            href="https://linkedin.com/in/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon w-10 h-10"
            aria-label="LinkedIn Profile"
          >
            <IconLinkedin class="size-4" />
          </a>
          <a
            href="https://x.com/xabdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon w-10 h-10"
            aria-label="X Profile"
          >
            <IconX class="size-4" />
          </a>
        </div>

        <button type="button" class="btn-primary px-6 py-2.5 text-xs" @click="scrollTo('contact')">
          Let's Talk
        </button>
      </div>
    </div>
  </Transition>
</template>
