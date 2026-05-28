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
  // 100 New Words Expanded
  { id: 'g11', word: 'benefit', translation: '利益', category: 'GEPT-Beginner', example: 'There are many benefits to regular exercise.', exampleTranslation: '規律運動有許多好處。' },
  { id: 'g12', word: 'capable', translation: '有能力的', category: 'GEPT-Beginner', example: 'She is capable of handling the project.', exampleTranslation: '她有能力處理這個專案。' },
  { id: 'g13', word: 'capacity', translation: '容量', category: 'GEPT-Beginner', example: 'The stadium has a seating capacity of 50,000.', exampleTranslation: '這座體育場可容納五萬人。' },
  { id: 'g14', word: 'category', translation: '類別', category: 'GEPT-Beginner', example: 'This item falls into a different category.', exampleTranslation: '這個項目屬於不同的類別。' },
  { id: 'g15', word: 'cease', translation: '停止', category: 'GEPT-Beginner', example: 'The rain ceased early in the morning.', exampleTranslation: '雨在清晨時停了。' },
  { id: 'g16', word: 'challenge', translation: '挑戰', category: 'GEPT-Beginner', example: 'I am ready for a new challenge.', exampleTranslation: '我準備好迎接新挑戰了。' },
  { id: 'g17', word: 'character', translation: '性格', category: 'GEPT-Beginner', example: 'He has a very strong character.', exampleTranslation: '他的性格非常堅強。' },
  { id: 'g18', word: 'chemical', translation: '化學的', category: 'GEPT-Beginner', example: 'The factory produces chemical products.', exampleTranslation: '這間工廠生產化學產品。' },
  { id: 'g19', word: 'circumstance', translation: '情況', category: 'GEPT-Beginner', example: 'Under no circumstances should you leave.', exampleTranslation: '在任何情況下你都不該離開。' },
  { id: 'g20', word: 'citizen', translation: '公民', category: 'GEPT-Beginner', example: 'Every citizen has the right to vote.', exampleTranslation: '每個公民都有投票權。' },

  { id: 'i11', word: 'collapse', translation: '倒塌', category: 'GEPT-Intermediate', example: 'The old bridge collapsed during the storm.', exampleTranslation: '那座老橋在暴風雨中倒塌了。' },
  { id: 'i12', word: 'colleague', translation: '同事', category: 'GEPT-Intermediate', example: 'He is a highly respected colleague.', exampleTranslation: '他是一位備受尊敬的同事。' },
  { id: 'i13', word: 'combination', translation: '結合', category: 'GEPT-Intermediate', example: 'This flavor is a combination of sweet and sour.', exampleTranslation: '這個口味是酸甜的結合。' },
  { id: 'i14', word: 'commercial', translation: '商業的', category: 'GEPT-Intermediate', example: 'They are building a new commercial center.', exampleTranslation: '他們正在建造一個新的商業中心。' },
  { id: 'i15', word: 'commit', translation: '承諾', category: 'GEPT-Intermediate', example: 'We must commit to finishing the work.', exampleTranslation: '我們必須承諾完成這項工作。' },
  { id: 'i16', word: 'committee', translation: '委員會', category: 'GEPT-Intermediate', example: 'The committee approved the new plan.', exampleTranslation: '委員會批准了新計畫。' },
  { id: 'i17', word: 'communicate', translation: '溝通', category: 'GEPT-Intermediate', example: 'We communicate mostly by email.', exampleTranslation: '我們主要透過電子郵件溝通。' },
  { id: 'i18', word: 'compare', translation: '比較', category: 'GEPT-Intermediate', example: 'You cannot compare apples with oranges.', exampleTranslation: '你不能把蘋果跟橘子相比較。' },
  { id: 'i19', word: 'compete', translation: '競爭', category: 'GEPT-Intermediate', example: 'Ten teams will compete for the prize.', exampleTranslation: '十支隊伍將角逐這個獎項。' },
  { id: 'i20', word: 'complex', translation: '複雜的', category: 'GEPT-Intermediate', example: 'The human brain is a very complex organ.', exampleTranslation: '人類大腦是非常複雜的器官。' },

  { id: 'a11', word: 'concede', translation: '讓步', category: 'GEPT-Advanced', example: 'He was forced to concede defeat.', exampleTranslation: '他被迫承認失敗。' },
  { id: 'a12', word: 'conceive', translation: '構想', category: 'GEPT-Advanced', example: 'He conceived the idea while traveling.', exampleTranslation: '他在旅行時構想出這個點子。' },
  { id: 'a13', word: 'concurrent', translation: '同時發生的', category: 'GEPT-Advanced', example: 'He is serving two concurrent prison sentences.', exampleTranslation: '他正在同時服兩項刑期。' },
  { id: 'a14', word: 'conducive', translation: '有助於的', category: 'GEPT-Advanced', example: 'A quiet room is conducive to studying.', exampleTranslation: '安靜的房間有助於學習。' },
  { id: 'a15', word: 'confine', translation: '限制', category: 'GEPT-Advanced', example: 'Please confine your remarks to the topic.', exampleTranslation: '請將您的發言限制在該主題內。' },
  { id: 'a16', word: 'conform', translation: '遵從', category: 'GEPT-Advanced', example: 'We must conform to the safety rules.', exampleTranslation: '我們必須遵守安全規定。' },
  { id: 'a17', word: 'consensus', translation: '共識', category: 'GEPT-Advanced', example: 'The board reached a consensus on the issue.', exampleTranslation: '董事會對該問題達成了共識。' },
  { id: 'a18', word: 'consequent', translation: '隨之發生的', category: 'GEPT-Advanced', example: 'The rise in prices and the consequent drop in sales.', exampleTranslation: '物價上漲以及隨之而來的銷量下降。' },
  { id: 'a19', word: 'constitute', translation: '構成', category: 'GEPT-Advanced', example: 'Twelve months constitute a year.', exampleTranslation: '十二個月構成一年。' },
  { id: 'a20', word: 'constraint', translation: '限制', category: 'GEPT-Advanced', example: 'Time constraint is our biggest problem.', exampleTranslation: '時間限制是我們最大的問題。' },

  { id: 't11', word: 'comprehensive', translation: '全面的', category: 'TOEIC', example: 'We offer comprehensive health insurance.', exampleTranslation: '我們提供全面的健康保險。' },
  { id: 't12', word: 'confidential', translation: '機密的', category: 'TOEIC', example: 'This information is strictly confidential.', exampleTranslation: '這份資訊是絕對機密的。' },
  { id: 't13', word: 'consecutive', translation: '連續的', category: 'TOEIC', example: 'It rained for three consecutive days.', exampleTranslation: '連續下了三天的雨。' },
  { id: 't14', word: 'consultant', translation: '顧問', category: 'TOEIC', example: 'We hired a financial consultant.', exampleTranslation: '我們聘請了一位財務顧問。' },
  { id: 't15', word: 'contract', translation: '合約', category: 'TOEIC', example: 'Please sign the contract by Friday.', exampleTranslation: '請在星期五前簽署合約。' },
  { id: 't16', word: 'convenient', translation: '方便的', category: 'TOEIC', example: 'The hotel is in a convenient location.', exampleTranslation: '這間飯店的地理位置很方便。' },
  { id: 't17', word: 'corporate', translation: '公司的', category: 'TOEIC', example: 'Our corporate headquarters is in Tokyo.', exampleTranslation: '我們的公司總部在東京。' },
  { id: 't18', word: 'crucial', translation: '關鍵的', category: 'TOEIC', example: 'It is crucial that you arrive on time.', exampleTranslation: '你準時到達是非常關鍵的。' },
  { id: 't19', word: 'deadline', translation: '截止日期', category: 'TOEIC', example: 'The deadline for the report is Monday.', exampleTranslation: '報告的截止日期是星期一。' },
  { id: 't20', word: 'delegate', translation: '委派', category: 'TOEIC', example: 'A good manager knows how to delegate tasks.', exampleTranslation: '一位好主管知道如何委派任務。' },

  { id: 'tf11', word: 'diminish', translation: '減少', category: 'TOEFL', example: 'The pain will gradually diminish.', exampleTranslation: '疼痛會逐漸減少。' },
  { id: 'tf12', word: 'discrete', translation: '離散的', category: 'TOEFL', example: 'These are two discrete issues.', exampleTranslation: '這是兩個獨立的問題。' },
  { id: 'tf13', word: 'displace', translation: '取代', category: 'TOEFL', example: 'Coal has been displaced by natural gas.', exampleTranslation: '煤炭已被天然氣取代。' },
  { id: 'tf14', word: 'distort', translation: '扭曲', category: 'TOEFL', example: 'The media distorted the truth.', exampleTranslation: '媒體扭曲了事實。' },
  { id: 'tf15', word: 'duration', translation: '持續時間', category: 'TOEFL', example: 'You must stay for the duration of the exam.', exampleTranslation: '在考試期間你必須留下來。' },
  { id: 'tf16', word: 'emerge', translation: '浮現', category: 'TOEFL', example: 'New evidence emerged during the trial.', exampleTranslation: '審判期間浮現了新證據。' },
  { id: 'tf17', word: 'empirical', translation: '經驗主義的', category: 'TOEFL', example: 'We have empirical data to prove it.', exampleTranslation: '我們有經驗數據來證明這一點。' },
  { id: 'tf18', word: 'enhance', translation: '增強', category: 'TOEFL', example: 'This will enhance your reputation.', exampleTranslation: '這將增強你的聲譽。' },
  { id: 'tf19', word: 'equivalent', translation: '相等的', category: 'TOEFL', example: 'One mile is equivalent to 1.6 kilometers.', exampleTranslation: '一英里等於 1.6 公里。' },
  { id: 'tf20', word: 'erode', translation: '侵蝕', category: 'TOEFL', example: 'The cliffs are being eroded by the sea.', exampleTranslation: '懸崖正被海水侵蝕。' },

  { id: 'b11', word: 'estimate', translation: '估計', category: 'Business', example: 'We estimate the cost to be $10,000.', exampleTranslation: '我們估計成本為一萬美元。' },
  { id: 'b12', word: 'evaluate', translation: '評估', category: 'Business', example: 'We need to evaluate the risks carefully.', exampleTranslation: '我們需要仔細評估風險。' },
  { id: 'b13', word: 'exclusive', translation: '獨家的', category: 'Business', example: 'We have an exclusive interview with the CEO.', exampleTranslation: '我們有一則執行長的獨家專訪。' },
  { id: 'b14', word: 'executive', translation: '高階主管', category: 'Business', example: 'She is a senior executive at a bank.', exampleTranslation: '她是一間銀行的高階主管。' },
  { id: 'b15', word: 'expertise', translation: '專業知識', category: 'Business', example: 'We need someone with financial expertise.', exampleTranslation: '我們需要一位有財務專業知識的人。' },
  { id: 'b16', word: 'facilitate', translation: '促進', category: 'Business', example: 'The new software will facilitate our work.', exampleTranslation: '新軟體將促進我們的工作。' },
  { id: 'b17', word: 'feasible', translation: '可行的', category: 'Business', example: 'Is it feasible to finish by Friday?', exampleTranslation: '星期五前完成可行嗎？' },
  { id: 'b18', word: 'fluctuate', translation: '波動', category: 'Business', example: 'Currency exchange rates fluctuate daily.', exampleTranslation: '貨幣匯率每天都在波動。' },
  { id: 'b19', word: 'forecast', translation: '預測', category: 'Business', example: 'The sales forecast for next year is positive.', exampleTranslation: '明年的銷售預測是樂觀的。' },
  { id: 'b20', word: 'framework', translation: '框架', category: 'Business', example: 'We are establishing a legal framework.', exampleTranslation: '我們正在建立一個法律框架。' },
  
  { id: 'g21', word: 'generate', translation: '產生', category: 'GEPT-Beginner', example: 'The wind turbines generate electricity.', exampleTranslation: '風力發電機產生電力。' },
  { id: 'g22', word: 'guarantee', translation: '保證', category: 'GEPT-Beginner', example: 'I guarantee you will love this book.', exampleTranslation: '我保證你會喜歡這本書。' },
  { id: 'g23', word: 'hierarchy', translation: '階層', category: 'GEPT-Beginner', example: 'There is a strict hierarchy in the company.', exampleTranslation: '公司裡有嚴格的階層制度。' },
  { id: 'g24', word: 'highlight', translation: '強調', category: 'GEPT-Beginner', example: 'Please highlight the important words.', exampleTranslation: '請強調這些重要的字。' },
  { id: 'g25', word: 'identical', translation: '完全相同的', category: 'GEPT-Beginner', example: 'The two dresses are identical.', exampleTranslation: '這兩件洋裝完全相同。' },
  { id: 'g26', word: 'identify', translation: '識別', category: 'GEPT-Beginner', example: 'Can you identify the suspect?', exampleTranslation: '你能認出嫌犯嗎？' },
  { id: 'g27', word: 'ideology', translation: '意識形態', category: 'GEPT-Beginner', example: 'Their political ideology is very different.', exampleTranslation: '他們的政治意識形態非常不同。' },
  { id: 'g28', word: 'illustrate', translation: '說明', category: 'GEPT-Beginner', example: 'Let me illustrate this point with an example.', exampleTranslation: '讓我用個例子來說明這一點。' },
  { id: 'g29', word: 'implement', translation: '實施', category: 'GEPT-Beginner', example: 'We will implement the new policy next month.', exampleTranslation: '我們將於下個月實施新政策。' },
  { id: 'g30', word: 'implicate', translation: '牽連', category: 'GEPT-Beginner', example: 'The evidence implicates him in the crime.', exampleTranslation: '證據顯示他牽連了這起犯罪。' },

  { id: 'i21', word: 'implicit', translation: '含蓄的', category: 'GEPT-Intermediate', example: 'There was an implicit threat in his voice.', exampleTranslation: '他的聲音中帶有含蓄的威脅。' },
  { id: 'i22', word: 'incentive', translation: '動機', category: 'GEPT-Intermediate', example: 'Bonus payments provide an incentive to work harder.', exampleTranslation: '獎金提供了更努力工作的動機。' },
  { id: 'i23', word: 'incidence', translation: '發生率', category: 'GEPT-Intermediate', example: 'There is a high incidence of malaria here.', exampleTranslation: '這裡瘧疾的發生率很高。' },
  { id: 'i24', word: 'incline', translation: '傾向', category: 'GEPT-Intermediate', example: 'I incline to the view that he is innocent.', exampleTranslation: '我傾向於認為他是無辜的。' },
  { id: 'i25', word: 'incorporate', translation: '納入', category: 'GEPT-Intermediate', example: 'We will incorporate your suggestions.', exampleTranslation: '我們將納入你的建議。' },
  { id: 'i26', word: 'index', translation: '索引', category: 'GEPT-Intermediate', example: 'Look it up in the index at the back of the book.', exampleTranslation: '在書後面的索引中查一下。' },
  { id: 'i27', word: 'indicate', translation: '指出', category: 'GEPT-Intermediate', example: 'Recent polls indicate a change in public opinion.', exampleTranslation: '最近的民意調查指出公眾意見有所改變。' },
  { id: 'i28', word: 'induce', translation: '引起', category: 'GEPT-Intermediate', example: 'Certain drugs can induce sleep.', exampleTranslation: '某些藥物能引起睡眠。' },
  { id: 'i29', word: 'inevitable', translation: '不可避免的', category: 'GEPT-Intermediate', example: 'It was an inevitable consequence.', exampleTranslation: '這是一個不可避免的後果。' },
  { id: 'i30', word: 'infer', translation: '推論', category: 'GEPT-Intermediate', example: 'What can we infer from this data?', exampleTranslation: '我們可以從這些數據推論出什麼？' },

  { id: 'a21', word: 'infrastructure', translation: '基礎建設', category: 'GEPT-Advanced', example: 'The country needs to improve its infrastructure.', exampleTranslation: '這個國家需要改善其基礎建設。' },
  { id: 'a22', word: 'inherent', translation: '固有的', category: 'GEPT-Advanced', example: 'There are inherent risks in this business.', exampleTranslation: '這個行業有固有的風險。' },
  { id: 'a23', word: 'inhibit', translation: '抑制', category: 'GEPT-Advanced', example: 'Fear can inhibit people from expressing their opinions.', exampleTranslation: '恐懼會抑制人們表達意見。' },
  { id: 'a24', word: 'initial', translation: '最初的', category: 'GEPT-Advanced', example: 'My initial reaction was to say no.', exampleTranslation: '我最初的反應是拒絕。' },
  { id: 'a25', word: 'initiate', translation: '發起', category: 'GEPT-Advanced', example: 'The government will initiate a new program.', exampleTranslation: '政府將發起一項新計畫。' },
  { id: 'a26', word: 'innovate', translation: '創新', category: 'GEPT-Advanced', example: 'Companies must innovate to survive.', exampleTranslation: '公司必須創新才能生存。' },
  { id: 'a27', word: 'insight', translation: '洞察力', category: 'GEPT-Advanced', example: 'The book provides a fascinating insight into his life.', exampleTranslation: '這本書對他的生活提供了迷人的洞察。' },
  { id: 'a28', word: 'inspect', translation: '檢查', category: 'GEPT-Advanced', example: 'The officials will inspect the factory tomorrow.', exampleTranslation: '官員明天將檢查工廠。' },
  { id: 'a29', word: 'instance', translation: '實例', category: 'GEPT-Advanced', example: 'There is not a single instance of this happening before.', exampleTranslation: '以前從未發生過這種實例。' },
  { id: 'a30', word: 'institute', translation: '機構', category: 'GEPT-Advanced', example: 'He works at a research institute.', exampleTranslation: '他在一家研究機構工作。' },

  { id: 't21', word: 'instruct', translation: '指導', category: 'TOEIC', example: 'The teacher instructed the students to remain quiet.', exampleTranslation: '老師指導學生保持安靜。' },
  { id: 't22', word: 'integral', translation: '不可或缺的', category: 'TOEIC', example: 'Trust is an integral part of a good relationship.', exampleTranslation: '信任是良好關係不可或缺的一部分。' },
  { id: 't23', word: 'integrate', translation: '整合', category: 'TOEIC', example: 'We plan to integrate the two systems.', exampleTranslation: '我們計畫整合這兩個系統。' },
  { id: 't24', word: 'interact', translation: '互動', category: 'TOEIC', example: 'He does not interact well with the other children.', exampleTranslation: '他不擅長與其他孩子互動。' },
  { id: 't25', word: 'internal', translation: '內部的', category: 'TOEIC', example: 'This is an internal company document.', exampleTranslation: '這是公司內部的文件。' },
  { id: 't26', word: 'interpret', translation: '解釋', category: 'TOEIC', example: 'How do you interpret this poem?', exampleTranslation: '你如何解釋這首詩？' },
  { id: 't27', word: 'interval', translation: '間隔', category: 'TOEIC', example: 'The trains run at 15-minute intervals.', exampleTranslation: '火車每 15 分鐘一班。' },
  { id: 't28', word: 'intervene', translation: '干預', category: 'TOEIC', example: 'The police had to intervene to stop the fight.', exampleTranslation: '警察不得不干預以阻止打架。' },
  { id: 't29', word: 'intrinsic', translation: '本質的', category: 'TOEIC', example: 'Math has no intrinsic value for him.', exampleTranslation: '數學對他來說沒有本質的價值。' },
  { id: 't30', word: 'investigate', translation: '調查', category: 'TOEIC', example: 'The police are investigating the murder.', exampleTranslation: '警方正在調查這起謀殺案。' }
];
