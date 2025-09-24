interface SentimentData {
  id: string;
  title: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  time: string;
}

interface SentimentTableProps {
  data: SentimentData[];
  maxRows?: number;
}

/**
 * 舆情数据表格组件
 * 职责：展示舆情数据列表
 */
export function SentimentTable({ data, maxRows = 10 }: SentimentTableProps) {
  const getSentimentText = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '正面';
      case 'negative':
        return '负面';
      case 'neutral':
        return '中性';
      default:
        return '未知';
    }
  };

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

  const displayData = data.slice(0, maxRows);

  return (
    <div className="overflow-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>标题</th>
            <th>来源</th>
            <th>情感</th>
            <th>分值</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map(item => (
            <tr key={item.id}>
              <td className="truncate max-w-48">{item.title}</td>
              <td>{item.source}</td>
              <td>
                <span className={getSentimentClass(item.sentiment)}>
                  {getSentimentText(item.sentiment)}
                </span>
              </td>
              <td>{item.score.toFixed(2)}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
