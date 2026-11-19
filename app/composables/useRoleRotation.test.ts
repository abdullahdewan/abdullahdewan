import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { ref, computed } from 'vue';
import { useRoleRotation } from './useRoleRotation';

beforeAll(() => {
  vi.stubGlobal('ref', ref);
  vi.stubGlobal('computed', computed);
});

describe('useRoleRotation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with first role', () => {
    const { currentRoleIndex, currentRole, roles } = useRoleRotation();
    expect(currentRoleIndex.value).toBe(0);
    expect(currentRole.value).toBe(roles[0]);
  });

  it('should cycle through roles on timer tick', () => {
    const { currentRoleIndex, currentRole, roles, startRoleTimer, stopRoleTimer } =
      useRoleRotation();

    startRoleTimer(1000);
    expect(currentRoleIndex.value).toBe(0);

    vi.advanceTimersByTime(1000);
    expect(currentRoleIndex.value).toBe(1);
    expect(currentRole.value).toBe(roles[1]);

    vi.advanceTimersByTime(1000);
    expect(currentRoleIndex.value).toBe(2);

    stopRoleTimer();
    vi.advanceTimersByTime(2000);
    expect(currentRoleIndex.value).toBe(2);
  });
});
