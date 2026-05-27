export interface WordItem {
  id: string;
  word: string;
  translation: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'GEPT' | 'TOEIC' | 'TOEFL' | 'Business' | 'General';
  example: string;
}

export const defaultWordList: WordItem[] = [
  { id: '1', word: 'apple', translation: '蘋果', level: 'beginner', category: 'General', example: 'She ate a red apple.' },
  { id: '2', word: 'book', translation: '書本', level: 'beginner', category: 'General', example: 'He is reading a book.' },
  { id: '3', word: 'negotiate', translation: '談判', level: 'advanced', category: 'Business', example: 'We need to negotiate a better deal.' },
  { id: '4', word: 'revenue', translation: '營收', level: 'intermediate', category: 'Business', example: 'The company reported a massive increase in revenue.' },
  { id: '5', word: 'abundant', translation: '豐富的', level: 'intermediate', category: 'TOEFL', example: 'There is an abundant supply of water.' },
  { id: '6', word: 'collaborate', translation: '合作', level: 'intermediate', category: 'TOEIC', example: 'The two teams will collaborate on the new project.' },
  { id: '7', word: 'meticulous', translation: '一絲不苟的', level: 'advanced', category: 'TOEFL', example: 'He is very meticulous about his work.' },
  { id: '8', word: 'strategy', translation: '策略', level: 'intermediate', category: 'Business', example: 'We need a new marketing strategy.' },
  { id: '9', word: 'ubiquitous', translation: '無所不在的', level: 'advanced', category: 'TOEFL', example: 'Smartphones have become ubiquitous.' },
  { id: '10', word: 'environment', translation: '環境', level: 'beginner', category: 'GEPT', example: 'We must protect the environment.' },
  { id: '11', word: 'experience', translation: '經驗', level: 'intermediate', category: 'GEPT', example: 'She has a lot of experience in teaching.' },
  { id: '12', word: 'resilience', translation: '韌性', level: 'advanced', category: 'General', example: 'He showed great resilience in the face of adversity.' },
  { id: '13', word: 'allocate', translation: '分配', level: 'advanced', category: 'TOEIC', example: 'The manager will allocate tasks to the team.' },
  { id: '14', word: 'commence', translation: '開始', level: 'intermediate', category: 'TOEIC', example: 'The meeting will commence at 10 AM.' },
  { id: '15', word: 'evaluate', translation: '評估', level: 'intermediate', category: 'TOEFL', example: 'We need to evaluate the results of the experiment.' },
  { id: '16', word: 'fluctuate', translation: '波動', level: 'advanced', category: 'Business', example: 'Stock prices fluctuate every day.' }
];
