export type WordCategory = 
  | 'GEPT-Beginner' 
  | 'GEPT-Intermediate' 
  | 'GEPT-Advanced' 
  | 'TOEIC' 
  | 'TOEFL' 
  | 'Business' 
  | 'General';

export interface WordItem {
  id: string;
  word: string;
  translation: string;
  category: WordCategory;
  example: string;
  exampleTranslation: string;
}

export const defaultWordList: WordItem[] = [
  // GEPT Beginner (英檢初級)
  { id: 'g1', word: 'abandon', translation: '放棄', category: 'GEPT-Beginner', example: 'Do not abandon your dreams.', exampleTranslation: '不要放棄你的夢想。' },
  { id: 'g2', word: 'ability', translation: '能力', category: 'GEPT-Beginner', example: 'She has the ability to learn quickly.', exampleTranslation: '她有快速學習的能力。' },
  { id: 'g3', word: 'abroad', translation: '在國外', category: 'GEPT-Beginner', example: 'He went abroad for further study.', exampleTranslation: '他出國深造了。' },
  { id: 'g4', word: 'absence', translation: '缺席', category: 'GEPT-Beginner', example: 'Her absence from the meeting was noticed.', exampleTranslation: '她缺席會議引起了注意。' },
  { id: 'g5', word: 'absolute', translation: '絕對的', category: 'GEPT-Beginner', example: 'I have absolute confidence in him.', exampleTranslation: '我對他有絕對的信心。' },
  { id: 'g6', word: 'accept', translation: '接受', category: 'GEPT-Beginner', example: 'Please accept my apology.', exampleTranslation: '請接受我的道歉。' },
  { id: 'g7', word: 'accident', translation: '意外', category: 'GEPT-Beginner', example: 'He was injured in a car accident.', exampleTranslation: '他在一場車禍中受傷。' },
  { id: 'g8', word: 'achieve', translation: '達成', category: 'GEPT-Beginner', example: 'You can achieve anything if you try hard.', exampleTranslation: '只要努力，你可以達成任何事。' },
  { id: 'g9', word: 'active', translation: '活躍的', category: 'GEPT-Beginner', example: 'My grandmother is very active.', exampleTranslation: '我奶奶非常活躍。' },
  { id: 'g10', word: 'actually', translation: '實際上', category: 'GEPT-Beginner', example: 'Actually, I think it is a good idea.', exampleTranslation: '實際上，我認為這是個好主意。' },

  // GEPT Intermediate (英檢中級)
  { id: 'i1', word: 'accommodate', translation: '容納', category: 'GEPT-Intermediate', example: 'The hotel can accommodate 500 guests.', exampleTranslation: '這間飯店能容納500位客人。' },
  { id: 'i2', word: 'accomplish', translation: '完成', category: 'GEPT-Intermediate', example: 'We have accomplished a lot today.', exampleTranslation: '我們今天完成了很多事。' },
  { id: 'i3', word: 'accurate', translation: '準確的', category: 'GEPT-Intermediate', example: 'The weather forecast was accurate.', exampleTranslation: '天氣預報很準確。' },
  { id: 'i4', word: 'adequate', translation: '足夠的', category: 'GEPT-Intermediate', example: 'Make sure you have adequate water.', exampleTranslation: '確保你有足夠的水。' },
  { id: 'i5', word: 'analyze', translation: '分析', category: 'GEPT-Intermediate', example: 'We need to analyze the data carefully.', exampleTranslation: '我們需要仔細分析這些數據。' },
  { id: 'i6', word: 'anticipate', translation: '預期', category: 'GEPT-Intermediate', example: 'We anticipate a large crowd tonight.', exampleTranslation: '我們預期今晚會有很多人。' },
  { id: 'i7', word: 'apparent', translation: '明顯的', category: 'GEPT-Intermediate', example: 'It was apparent that she was lying.', exampleTranslation: '很明顯她在說謊。' },
  { id: 'i8', word: 'approach', translation: '接近；方法', category: 'GEPT-Intermediate', example: 'We need a new approach to this problem.', exampleTranslation: '我們需要一個新方法來解決這個問題。' },
  { id: 'i9', word: 'appropriate', translation: '適當的', category: 'GEPT-Intermediate', example: 'Jeans are not appropriate for a wedding.', exampleTranslation: '牛仔褲不適合參加婚禮。' },
  { id: 'i10', word: 'attitude', translation: '態度', category: 'GEPT-Intermediate', example: 'He has a positive attitude towards life.', exampleTranslation: '他對生活有積極的態度。' },

  // GEPT Advanced (英檢高級)
  { id: 'a1', word: 'ambiguous', translation: '模稜兩可的', category: 'GEPT-Advanced', example: 'His instructions were ambiguous.', exampleTranslation: '他的指示模稜兩可。' },
  { id: 'a2', word: 'anomaly', translation: '異常', category: 'GEPT-Advanced', example: 'There is an anomaly in your blood test.', exampleTranslation: '你的血液檢查有異常。' },
  { id: 'a3', word: 'arbitrary', translation: '武斷的', category: 'GEPT-Advanced', example: 'The decision seemed completely arbitrary.', exampleTranslation: '這個決定似乎完全是武斷的。' },
  { id: 'a4', word: 'articulate', translation: '善於表達的', category: 'GEPT-Advanced', example: 'She is a highly articulate speaker.', exampleTranslation: '她是一位非常有口才的講者。' },
  { id: 'a5', word: 'authentic', translation: '真實的', category: 'GEPT-Advanced', example: 'The restaurant serves authentic Italian food.', exampleTranslation: '這家餐廳提供道地的義大利美食。' },
  { id: 'a6', word: 'autonomous', translation: '自治的', category: 'GEPT-Advanced', example: 'The region is highly autonomous.', exampleTranslation: '該地區擁有高度自治權。' },
  { id: 'a7', word: 'benevolent', translation: '仁慈的', category: 'GEPT-Advanced', example: 'He was a benevolent leader.', exampleTranslation: '他是一位仁慈的領導者。' },
  { id: 'a8', word: 'capricious', translation: '善變的', category: 'GEPT-Advanced', example: 'The weather here is very capricious.', exampleTranslation: '這裡的天氣非常善變。' },
  { id: 'a9', word: 'cognitive', translation: '認知的', category: 'GEPT-Advanced', example: 'Puzzle solving improves cognitive skills.', exampleTranslation: '解謎能提升認知能力。' },
  { id: 'a10', word: 'comprehensive', translation: '全面的', category: 'GEPT-Advanced', example: 'They offer a comprehensive training program.', exampleTranslation: '他們提供全面的培訓課程。' },

  // TOEIC (多益)
  { id: 't1', word: 'agenda', translation: '議程', category: 'TOEIC', example: 'What is on the agenda for today?', exampleTranslation: '今天的議程有什麼？' },
  { id: 't2', word: 'allocate', translation: '分配', category: 'TOEIC', example: 'We need to allocate resources efficiently.', exampleTranslation: '我們需要有效率地分配資源。' },
  { id: 't3', word: 'appraise', translation: '評估', category: 'TOEIC', example: 'The manager will appraise your performance.', exampleTranslation: '經理將評估你的績效。' },
  { id: 't4', word: 'authorization', translation: '授權', category: 'TOEIC', example: 'You need authorization to enter this room.', exampleTranslation: '你需要授權才能進入這個房間。' },
  { id: 't5', word: 'brochure', translation: '小冊子', category: 'TOEIC', example: 'Please refer to our travel brochure.', exampleTranslation: '請參考我們的旅遊手冊。' },
  { id: 't6', word: 'collaborate', translation: '合作', category: 'TOEIC', example: 'Our teams will collaborate on the project.', exampleTranslation: '我們的團隊將在這個專案上合作。' },
  { id: 't7', word: 'commence', translation: '開始', category: 'TOEIC', example: 'The construction will commence next month.', exampleTranslation: '工程將於下個月開始。' },
  { id: 't8', word: 'compensation', translation: '補償；薪酬', category: 'TOEIC', example: 'He received fair compensation for his work.', exampleTranslation: '他獲得了合理的薪酬。' },
  { id: 't9', word: 'complimentary', translation: '免費贈送的', category: 'TOEIC', example: 'Guests receive a complimentary breakfast.', exampleTranslation: '房客可獲得免費早餐。' },
  { id: 't10', word: 'comply', translation: '遵守', category: 'TOEIC', example: 'We must comply with the new regulations.', exampleTranslation: '我們必須遵守新規定。' },

  // TOEFL (托福)
  { id: 'tf1', word: 'abundant', translation: '豐富的', category: 'TOEFL', example: 'The region has abundant natural resources.', exampleTranslation: '該地區有豐富的自然資源。' },
  { id: 'tf2', word: 'advocate', translation: '提倡；擁護者', category: 'TOEFL', example: 'He is a strong advocate for human rights.', exampleTranslation: '他是人權的強烈擁護者。' },
  { id: 'tf3', word: 'alleviate', translation: '減輕', category: 'TOEFL', example: 'This medicine will alleviate your pain.', exampleTranslation: '這種藥能減輕你的疼痛。' },
  { id: 'tf4', word: 'ambivalent', translation: '矛盾的', category: 'TOEFL', example: 'She felt ambivalent about her new job.', exampleTranslation: '她對新工作感到矛盾。' },
  { id: 'tf5', word: 'chronological', translation: '按年代順序的', category: 'TOEFL', example: 'The events are listed in chronological order.', exampleTranslation: '事件按年代順序排列。' },
  { id: 'tf6', word: 'consensus', translation: '共識', category: 'TOEFL', example: 'We have reached a consensus on this issue.', exampleTranslation: '我們已經在這個問題上達成共識。' },
  { id: 'tf7', word: 'derive', translation: '源自', category: 'TOEFL', example: 'Many English words derive from Latin.', exampleTranslation: '許多英文單字源自拉丁語。' },
  { id: 'tf8', word: 'empirical', translation: '經驗主義的；實證的', category: 'TOEFL', example: 'There is no empirical evidence to support this.', exampleTranslation: '沒有實證證據支持這一點。' },
  { id: 'tf9', word: 'fluctuate', translation: '波動', category: 'TOEFL', example: 'Temperatures fluctuate wildly in the desert.', exampleTranslation: '沙漠裡的溫度波動劇烈。' },
  { id: 'tf10', word: 'indigenous', translation: '本土的', category: 'TOEFL', example: 'Kangaroos are indigenous to Australia.', exampleTranslation: '袋鼠是澳洲本土的動物。' },

  // Business (商用英文)
  { id: 'b1', word: 'acquisition', translation: '收購', category: 'Business', example: 'The merger and acquisition was successful.', exampleTranslation: '這次的併購很成功。' },
  { id: 'b2', word: 'benchmark', translation: '基準', category: 'Business', example: 'Apple set a new benchmark for smartphones.', exampleTranslation: '蘋果為智慧型手機設定了新基準。' },
  { id: 'b3', word: 'consolidate', translation: '合併；鞏固', category: 'Business', example: 'They decided to consolidate their operations.', exampleTranslation: '他們決定合併業務。' },
  { id: 'b4', word: 'deficit', translation: '赤字', category: 'Business', example: 'The country is facing a huge budget deficit.', exampleTranslation: '該國正面臨巨大的預算赤字。' },
  { id: 'b5', word: 'entrepreneur', translation: '企業家', category: 'Business', example: 'He is a successful tech entrepreneur.', exampleTranslation: '他是一位成功的科技企業家。' },
  { id: 'b6', word: 'franchise', translation: '經銷權；加盟', category: 'Business', example: 'She opened a fast-food franchise.', exampleTranslation: '她開了一家速食加盟店。' },
  { id: 'b7', word: 'inflation', translation: '通貨膨脹', category: 'Business', example: 'Inflation has caused prices to rise.', exampleTranslation: '通貨膨脹導致物價上漲。' },
  { id: 'b8', word: 'monopoly', translation: '壟斷', category: 'Business', example: 'The company has a monopoly in the market.', exampleTranslation: '這家公司壟斷了市場。' },
  { id: 'b9', word: 'portfolio', translation: '投資組合', category: 'Business', example: 'You should diversify your investment portfolio.', exampleTranslation: '你應該分散你的投資組合。' },
  { id: 'b10', word: 'revenue', translation: '營收', category: 'Business', example: 'Our revenue increased by 20% this quarter.', exampleTranslation: '我們這季的營收增加了20%。' },
];
