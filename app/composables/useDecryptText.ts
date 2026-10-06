import { ref, onMounted, onUnmounted } from 'vue';

export function useDecryptText(finalText: string, duration = 800) {
  const displayText = ref('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=~<>[]{}|;:,./';
  let animationFrameId: number | null = null;

  const trigger = () => {
    const startTime = performance.now();
    const length = finalText.length;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const solvedLength = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (i < solvedLength) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      displayText.value = result;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        displayText.value = finalText;
      }
    };

    animationFrameId = requestAnimationFrame(animate);
  };

  onMounted(() => {
    trigger();
  });

  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  return {
    displayText,
    trigger,
  };
}
