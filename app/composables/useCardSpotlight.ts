export const useCardSpotlight = () => {
  const initCardSpotlight = () => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement)?.closest<HTMLElement>('.card-spotlight');
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    if (typeof getCurrentInstance === 'function' && getCurrentInstance()) {
      onUnmounted(() => {
        document.removeEventListener('mousemove', handleMouseMove);
      });
    }
  };

  return {
    initCardSpotlight,
  };
};
