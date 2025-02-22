import { describe, test, vi, expect } from 'vitest';
import { sleep } from '../../src/helpers/sleep';

describe('sleep', () => {
  test('resolves after the specified time', async () => {
    vi.useFakeTimers();
    const seconds = 2;
    const promise = sleep(seconds);

    vi.advanceTimersByTime(seconds * 1000);

    await expect(promise).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});
