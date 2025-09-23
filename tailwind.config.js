/** @type {import('tailwindcss').Config} */
export default {
  // v4 支持自动内容检测，但也可以保留显式配置
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // v4 主要通过 CSS @theme 配置，这里可以保留向后兼容性
  theme: {
    extend: {
      // 如果需要 JavaScript 配置，可以在这里扩展
    },
  },
  plugins: [],
  darkMode: 'class',
};
