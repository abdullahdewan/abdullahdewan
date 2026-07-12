import { ref } from 'vue';

const isMuted = ref(true);

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!sharedCtx) {
    const Ctor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctor) sharedCtx = new Ctor();
  }
  return sharedCtx!;
}

export const useAudio = () => {
  const playBeep = (freq = 1000, duration = 0.08, type: OscillatorType = 'sine', volume = 0.03) => {
    if (isMuted.value) return;
    try {
      const audioCtx = getCtx();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Fails silently
    }
  };

  const toggleMute = () => {
    isMuted.value = !isMuted.value;
    if (!isMuted.value) {
      playBeep(600, 0.05, 'sine', 0.04);
      setTimeout(() => playBeep(900, 0.05, 'sine', 0.04), 60);
      setTimeout(() => playBeep(1200, 0.12, 'sine', 0.05), 120);
    }
  };

  const playClick = () => playBeep(1100, 0.06, 'sine', 0.04);
  const playTick = () => playBeep(2200, 0.015, 'triangle', 0.015);
  const playScan = () => playBeep(400, 0.25, 'triangle', 0.015);

  const playSuccessLog = () => {
    playBeep(880, 0.06, 'sine', 0.03);
    setTimeout(() => playBeep(1320, 0.12, 'sine', 0.03), 80);
  };

  const playErrorLog = () => {
    playBeep(220, 0.15, 'sawtooth', 0.03);
    setTimeout(() => playBeep(180, 0.2, 'sawtooth', 0.03), 100);
  };

  return {
    isMuted,
    toggleMute,
    playBeep,
    playClick,
    playTick,
    playScan,
    playSuccessLog,
    playErrorLog,
  };
};
