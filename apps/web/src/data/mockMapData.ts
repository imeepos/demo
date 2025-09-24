import { SentimentEvent } from '../types/map';

/**
 * 模拟地理事件数据
 * 职责：提供舆情事件的地理分布测试数据
 */
export const mockMapEvents: SentimentEvent[] = [
  {
    id: '1',
    title: '北京新技术发布会获得热烈反响',
    content: '某科技公司在北京举办的新产品发布会获得业界广泛关注，用户反馈积极',
    sentiment: 'positive',
    score: 0.85,
    location: { lat: 39.9042, lng: 116.4074 }, // 北京
    address: '北京市朝阳区',
    source: '科技日报',
    timestamp: '2024-01-24 14:30',
    hotness: 8,
    tags: ['科技', '产品发布', '创新'],
  },
  {
    id: '2',
    title: '上海某服务平台系统故障影响用户体验',
    content:
      '上海一家互联网公司的服务平台出现技术故障，导致部分用户无法正常使用',
    sentiment: 'negative',
    score: -0.72,
    location: { lat: 31.2304, lng: 121.4737 }, // 上海
    address: '上海市浦东新区',
    source: '澎湃新闻',
    timestamp: '2024-01-24 13:45',
    hotness: 6,
    tags: ['故障', '用户体验', '技术'],
  },
  {
    id: '3',
    title: '深圳智能制造展览会开幕',
    content: '第十五届深圳国际智能制造展览会正式开幕，展示最新工业4.0技术',
    sentiment: 'neutral',
    score: 0.15,
    location: { lat: 22.3193, lng: 114.1694 }, // 深圳
    address: '深圳市福田区',
    source: '深圳特区报',
    timestamp: '2024-01-24 12:00',
    hotness: 5,
    tags: ['展览会', '智能制造', '工业4.0'],
  },
  {
    id: '4',
    title: '广州美食节引发全民热议',
    content: '广州国际美食节吸引众多市民和游客参与，社交媒体上好评如潮',
    sentiment: 'positive',
    score: 0.78,
    location: { lat: 23.1291, lng: 113.2644 }, // 广州
    address: '广州市天河区',
    source: '南方日报',
    timestamp: '2024-01-24 11:30',
    hotness: 7,
    tags: ['美食节', '文化', '旅游'],
  },
  {
    id: '5',
    title: '杭州网约车价格调整引发争议',
    content: '杭州多家网约车平台宣布价格调整，用户对此反应不一',
    sentiment: 'negative',
    score: -0.45,
    location: { lat: 30.2741, lng: 120.1551 }, // 杭州
    address: '杭州市西湖区',
    source: '钱江晚报',
    timestamp: '2024-01-24 10:15',
    hotness: 4,
    tags: ['网约车', '价格', '争议'],
  },
  {
    id: '6',
    title: '成都文创产业园区项目启动',
    content: '成都高新区文创产业园区正式启动，将打造西南地区文创产业新高地',
    sentiment: 'positive',
    score: 0.62,
    location: { lat: 30.5728, lng: 104.0668 }, // 成都
    address: '成都市高新区',
    source: '成都商报',
    timestamp: '2024-01-24 09:45',
    hotness: 6,
    tags: ['文创', '产业园', '高新区'],
  },
  {
    id: '7',
    title: '西安地铁新线路建设进展',
    content: '西安地铁新线路建设项目取得重要进展，预计明年通车',
    sentiment: 'neutral',
    score: 0.25,
    location: { lat: 34.3416, lng: 108.9398 }, // 西安
    address: '西安市雁塔区',
    source: '西安晚报',
    timestamp: '2024-01-24 08:30',
    hotness: 3,
    tags: ['地铁', '交通', '建设'],
  },
  {
    id: '8',
    title: '武汉大学樱花节筹备工作启动',
    content: '武汉大学2024年樱花节筹备工作正式启动，预计将吸引大量游客',
    sentiment: 'positive',
    score: 0.55,
    location: { lat: 30.5928, lng: 114.3055 }, // 武汉
    address: '武汉市武昌区',
    source: '长江日报',
    timestamp: '2024-01-24 07:20',
    hotness: 5,
    tags: ['樱花节', '旅游', '大学'],
  },
];
