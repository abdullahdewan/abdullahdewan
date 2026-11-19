import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref } from 'vue';
import { useNavigation } from './useNavigation';

const stateMap = new Map<string, ReturnType<typeof ref>>();

vi.stubGlobal('useState', (key: string, init?: () => unknown) => {
  if (!stateMap.has(key)) {
    stateMap.set(key, ref(init ? init() : undefined));
  }
  return stateMap.get(key);
});

describe('useNavigation', () => {
  beforeEach(() => {
    stateMap.clear();
    vi.clearAllMocks();
  });

  it('should initialize navigation state with defaults', () => {
    const { activeSection, mobileMenuOpen, isScrolled, showBackToTop, navItems } = useNavigation();

    expect(activeSection.value).toBe('home');
    expect(mobileMenuOpen.value).toBe(false);
    expect(isScrolled.value).toBe(false);
    expect(showBackToTop.value).toBe(false);
    expect(navItems.length).toBe(7);
  });

  it('should update activeSection and close mobile menu on scrollTo', () => {
    const { activeSection, mobileMenuOpen, scrollTo } = useNavigation();

    mobileMenuOpen.value = true;
    scrollTo('services');

    expect(activeSection.value).toBe('services');
    expect(mobileMenuOpen.value).toBe(false);
  });
});
