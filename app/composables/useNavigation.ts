import type { NavItem } from '~/types';

export const useNavigation = () => {
  const activeSection = useState<string>('navActiveSection', () => 'home');
  const mobileMenuOpen = useState<boolean>('navMobileMenuOpen', () => false);
  const isScrolled = useState<boolean>('navIsScrolled', () => false);
  const showBackToTop = useState<boolean>('navShowBackToTop', () => false);

  const navItems: NavItem[] = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Capabilities', target: 'services' },
    { label: 'Portfolio', target: 'portfolio' },
    { label: 'Experience', target: 'experience' },
    { label: 'Skills', target: 'skills' },
    { label: 'Contact', target: 'contact' },
  ];

  const scrollTo = (id: string) => {
    mobileMenuOpen.value = false;
    activeSection.value = id;

    if (!import.meta.client) return;

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const initNavigationObserver = () => {
    if (!import.meta.client) return;

    let sectionObserver: IntersectionObserver | null = null;

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20;
      showBackToTop.value = window.scrollY > 400;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen.value) {
        mobileMenuOpen.value = false;
      }
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    }, observerOptions);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    handleScroll();

    navItems.forEach((item) => {
      const el = document.getElementById(item.target);
      if (el && sectionObserver) {
        sectionObserver.observe(el);
      }
    });

    const stopBodyLockWatch = watch(mobileMenuOpen, (isOpen) => {
      if (import.meta.client) {
        document.body.style.overflow = isOpen ? 'hidden' : '';
      }
    });

    if (typeof getCurrentInstance === 'function' && getCurrentInstance()) {
      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeyDown);
        stopBodyLockWatch();
        if (sectionObserver) {
          sectionObserver.disconnect();
        }
        if (import.meta.client) {
          document.body.style.overflow = '';
        }
      });
    }
  };

  return {
    activeSection,
    mobileMenuOpen,
    isScrolled,
    showBackToTop,
    navItems,
    scrollTo,
    initNavigationObserver,
  };
};
