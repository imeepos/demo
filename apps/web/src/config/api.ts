import { client } from '@sker/sdk';

// API配置
const API_CONFIG = {
  // 从环境变量获取API地址，提供默认值作为后备
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3011',
  // 请求超时时间
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
  // 是否启用Mock数据
  enableMock: import.meta.env.VITE_ENABLE_MOCK === 'true',
};

// 配置SDK客户端
export const configureApiClient = () => {
  client.setConfig({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 开发环境下输出配置信息
  if (import.meta.env.DEV) {
    console.log('API配置已初始化:', {
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      enableMock: API_CONFIG.enableMock,
    });
  }
};

// 导出配置对象供其他地方使用
export { API_CONFIG };
export default API_CONFIG;
