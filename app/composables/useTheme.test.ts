import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';

const mockMode = ref('light');

vi.mock('@vueuse/core', () => ({
  useColorMode: vi.fn(() => mockMode),
}));

import { useTheme } from './useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    mockMode.value = 'light';
    vi.clearAllMocks();
  });

  it('should initialize with useColorMode', () => {
    const { colorMode } = useTheme();
    expect(colorMode.value).toBe('light');
  });

  it('should toggle from light to dark', () => {
    const { toggle, colorMode } = useTheme();

    expect(colorMode.value).toBe('light');
    toggle();
    expect(colorMode.value).toBe('dark');
  });

  it('should toggle from dark to light', () => {
    const { toggle, colorMode } = useTheme();

    mockMode.value = 'dark';

    expect(colorMode.value).toBe('dark');
    toggle();
    expect(colorMode.value).toBe('light');
  });

  it('should default to dark if value is neither light nor dark', () => {
    const { toggle, colorMode } = useTheme();

    mockMode.value = 'auto'; // or any other value

    expect(colorMode.value).toBe('auto');
    toggle();
    expect(colorMode.value).toBe('dark');
  });
});
