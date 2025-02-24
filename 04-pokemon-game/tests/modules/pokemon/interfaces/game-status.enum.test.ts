import { GameStatus } from '@/modules/pokemon/interfaces';
import { describe, it, expect } from 'vitest';

describe('GameStatus enums', () => {
  it('should have a value of "playing"', () => {
    expect(GameStatus.PLAYING).toBe('playing');
    expect(GameStatus.WON).toBe('won');
    expect(GameStatus.LOST).toBe('lost');
  });
});
