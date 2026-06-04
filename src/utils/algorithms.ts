import { type WordItem } from '../data/wordList';

/**
 * Fisher-Yates Shuffle Algorithm
 * O(N) time complexity. Fast and unbiased way to shuffle an array.
 * This solves the UI delay caused by `sort(() => 0.5 - Math.random())` for millions of users.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/**
 * Weighted Random Picker for Spaced Repetition Lite
 * O(N) prefix sum array build, O(log N) binary search query.
 * 
 * We give weights based on the word's proficiency score:
 * - 0 proficiency (unlearned or just failed): 15x weight (highest priority)
 * - 1 proficiency (familiar): 8x weight
 * - 2 proficiency (improving): 4x weight
 * - >= 3 proficiency (mastered): 1x weight (still queried occasionally)
 */
export function pickRandomWordWeighted(words: WordItem[], wordProficiency: Record<string, number>): WordItem {
  if (words.length === 0) throw new Error("Word list is empty");
  
  // Assign weights based on proficiency levels
  const weights = words.map(w => {
    const prof = wordProficiency[w.id] || 0;
    if (prof === 0) return 15;
    if (prof === 1) return 8;
    if (prof === 2) return 4;
    return 1; // Mastered (>= 3)
  });
  
  // Create prefix sum array
  const prefixSums: number[] = [];
  let currentSum = 0;
  for (const w of weights) {
    currentSum += w;
    prefixSums.push(currentSum);
  }
  
  // Random number between 0 and total sum
  const totalWeight = prefixSums[prefixSums.length - 1];
  const randomVal = Math.random() * totalWeight;
  
  // Binary search for the correct interval (O(log N))
  let left = 0;
  let right = prefixSums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (randomVal > prefixSums[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return words[left];
}
