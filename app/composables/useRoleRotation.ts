import type { RotatingRole } from '~/types';

export const useRoleRotation = () => {
  const roles: RotatingRole[] = [
    'Full-Stack Engineer',
    'Backend Systems Architect',
    'Distributed Systems Builder',
    'Database Specialist',
  ];

  const currentRoleIndex = ref(0);
  const currentRole = computed(() => roles[currentRoleIndex.value]);
  let timer: ReturnType<typeof setInterval> | null = null;

  const startRoleTimer = (intervalMs = 4500) => {
    if (typeof window === 'undefined') return;
    stopRoleTimer();
    timer = setInterval(() => {
      currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length;
    }, intervalMs);
  };

  const stopRoleTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  if (typeof getCurrentInstance === 'function' && getCurrentInstance()) {
    onUnmounted(() => {
      stopRoleTimer();
    });
  }

  return {
    roles,
    currentRoleIndex,
    currentRole,
    startRoleTimer,
    stopRoleTimer,
  };
};
