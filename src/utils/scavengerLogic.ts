/**
 * Pure functions for scavenger hunt game logic
 */

export interface ScavengerProgress {
  count: number;
  total: number;
  percent: number;
  done: boolean;
}

/**
 * Remove all instances of FREE_SPACE token from questions array
 * Returns a new array without mutation
 */
export function filterScavengerItems(questions: string[], freeSpace: string): string[] {
  return questions.filter(q => q !== freeSpace);
}

/**
 * Create an initial checked state array filled with false
 * Returns a new array of the specified length
 */
export function createCheckedState(length: number): boolean[] {
  return Array(length).fill(false);
}

/**
 * Toggle the boolean value at the specified index
 * Returns a new array without mutation
 * Throws RangeError if index is out of bounds
 */
export function toggleIndex(checkedState: boolean[], index: number): boolean[] {
  if (index < 0 || index >= checkedState.length) {
    throw new RangeError(`Index ${index} is out of bounds for array of length ${checkedState.length}`);
  }
  
  const newState = [...checkedState];
  newState[index] = !newState[index];
  return newState;
}

/**
 * Calculate progress metrics for the scavenger hunt
 * Returns count, total, percent (floored), and done status
 */
export function getProgress(checkedState: boolean[]): ScavengerProgress {
  const total = checkedState.length;
  const count = checkedState.filter(Boolean).length;
  
  if (total === 0) {
    return { count: 0, total: 0, percent: 0, done: false };
  }
  
  const percent = Math.floor((count / total) * 100);
  const done = count === total;
  
  return { count, total, percent, done };
}
