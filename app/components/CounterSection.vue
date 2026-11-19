<script setup lang="ts">
interface CounterItem {
  count: string;
  label: string;
}

const counters: CounterItem[] = [
  { count: '3+', label: 'Years Commercial Operations' },
  { count: '20+', label: 'Production Deployments' },
  { count: '99.9%', label: 'Systems Reliability Benchmark' },
  { count: '100%', label: 'Lighthouse & A11y Standards' },
];
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
    <div
      v-for="item in counters"
      :key="item.label"
      class="card-spotlight p-4 sm:p-6 lg:p-8 text-center space-y-2 group"
    >
      <div
        class="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white font-mono group-hover:text-zinc-200 transition-colors"
      >
        {{ item.count }}
      </div>
      <p class="text-xs sm:text-sm text-zinc-400 font-medium">
        {{ item.label }}
      </p>
    </div>
  </div>
</template>
