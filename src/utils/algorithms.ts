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
 * Weighted Random Picker (Concept similar to Weighted Binary Search Tree)
 * O(N) to build, O(log N) to search if using a real BST, but O(N) prefix sum array is practically 
 * instant for client-side vocabulary sizes up to 100k words.
 * 
 * We give higher weight to words that haven't been learned yet, or those with lower accuracy.
 */
export function pickRandomWordWeighted(words: WordItem[], learnedIds: string[]): WordItem {
  if (words.length === 0) throw new Error("Word list is empty");
  
  // Assign weights: unlearned = 10, learned = 1
  const weights = words.map(w => learnedIds.includes(w.id) ? 1 : 10);
  
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
