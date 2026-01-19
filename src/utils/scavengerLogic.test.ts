import { describe, it, expect } from 'vitest';
import {
  filterScavengerItems,
  createCheckedState,
  toggleIndex,
  getProgress,
} from './scavengerLogic';

describe('scavengerLogic', () => {
  describe('filterScavengerItems', () => {
    it('removes FREE_SPACE token and preserves original order', () => {
      const FREE = 'FREE';
      const questions = ['Q1', FREE, 'Q2', 'Q3', FREE, 'Q4'];
      const originalCopy = [...questions];

      const result = filterScavengerItems(questions, FREE);

      expect(result).toEqual(['Q1', 'Q2', 'Q3', 'Q4']);
      expect(questions).toEqual(originalCopy); // input not mutated
    });

    it('no-ops (returns same contents) when FREE_SPACE not present', () => {
      const FREE = 'FREE';
      const questions = ['A', 'B', 'C'];
      const originalCopy = [...questions];

      const result = filterScavengerItems(questions, FREE);

      expect(result).toEqual(['A', 'B', 'C']);
      expect(questions).toEqual(originalCopy); // still not mutated
    });
  });

  describe('createCheckedState', () => {
    it('returns a false-filled array of the given length', () => {
      const arr = createCheckedState(5);
      expect(arr).toHaveLength(5);
      expect(arr.every((v: boolean) => v === false)).toBe(true);
    });

    it('returns independent arrays on separate calls (no shared reference)', () => {
      const a = createCheckedState(3);
      const b = createCheckedState(3);
      expect(a).not.toBe(b);
      // Mutate one and ensure the other is unaffected
      a[1] = true;
      expect(b[1]).toBe(false);
    });
  });

  describe('toggleIndex', () => {
    it('toggles only the specified index and returns a new array', () => {
      const input = [false, false, true, false];
      const copy = [...input];

      const out1 = toggleIndex(input, 1);
      expect(out1).not.toBe(input); // new array
      expect(out1).toEqual([false, true, true, false]);
      expect(input).toEqual(copy); // not mutated

      const out2 = toggleIndex(out1, 2);
      expect(out2).toEqual([false, true, false, false]);
      expect(out1).toEqual([false, true, true, false]); // prior result unchanged
    });

    it('throws RangeError for out-of-bounds indices', () => {
      const input = [false, false, false];
      expect(() => toggleIndex(input, -1)).toThrow(RangeError);
      expect(() => toggleIndex(input, 3)).toThrow(RangeError);
      expect(() => toggleIndex(input, 999)).toThrow(RangeError);
    });
  });

  describe('getProgress', () => {
    it('handles empty array', () => {
      const res = getProgress([]);
      expect(res).toEqual({ count: 0, total: 0, percent: 0, done: false });
    });

    it('handles partial progress with percent flooring', () => {
      const res1 = getProgress([true, false, false]); // 1/3 → 33%
      expect(res1.count).toBe(1);
      expect(res1.total).toBe(3);
      expect(res1.percent).toBe(33);
      expect(res1.done).toBe(false);

      const res2 = getProgress([true, true, false]); // 2/3 → 66%
      expect(res2.count).toBe(2);
      expect(res2.total).toBe(3);
      expect(res2.percent).toBe(66);
      expect(res2.done).toBe(false);
    });

    it('handles complete progress (done=true when total > 0)', () => {
      const res = getProgress([true, true, true]);
      expect(res).toEqual({ count: 3, total: 3, percent: 100, done: true });
    });
  });
});
