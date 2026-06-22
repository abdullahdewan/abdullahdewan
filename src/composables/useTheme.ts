import { useColorMode } from '@vueuse/core';

export const useTheme = () => {
  const mode = useColorMode({
    emitAuto: true,
    modes: {
      light: 'light',
      dark: 'dark',
    },
  });

  const toggle = () => {
    if (mode.value === 'dark') {
      mode.value = 'light';
    } else if (mode.value === 'light') {
      mode.value = 'dark';
    } else {
      mode.value = 'dark'; // Default transition
    }
  };

  return {
    colorMode: mode,
    toggle,
  };
};
