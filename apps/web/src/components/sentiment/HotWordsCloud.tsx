interface HotWord {
  word: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface HotWordsCloudProps {
  words: HotWord[];
}

/**
 * 热点词云组件
 * 职责：展示舆情热点词汇
 */
export function HotWordsCloud({ words }: HotWordsCloudProps) {
  const getSentimentClass = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'sentiment-positive';
      case 'negative':
        return 'sentiment-negative';
      case 'neutral':
        return 'sentiment-neutral';
      default:
        return '';
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2">
        {words.map((word, index) => (
          <span
            key={index}
            className={`wordcloud-tag ${getSentimentClass(word.sentiment)}`}
            style={{
              fontSize: `${Math.max(0.75, Math.min(1.5, word.count / 100))}rem`,
            }}
          >
            {word.word} ({word.count})
          </span>
        ))}
      </div>
    </div>
  );
}
