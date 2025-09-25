## 项目背景：

这是一个舆情监控分析系统

## 需求说明：

- 使用@sker/sdk提供的接口
- 后端接口文件：apps\api\src\sentiment-intensity\sentiment-intensity.controller.ts
- 开发SentimentIntensity情感定义的管理页面
- 第一步：开发业务组件，列表页面/form表单/检索组件
- 第二步：组装业务组件开发页面组件
- 第三步：添加到路由配置
- 第四步：检查构建问题
- 第五步：首页添加入口，apps\web\src\pages\HomePage.tsx

## 编码规范：

- 使用@tanstack/react-query管理服务端状态
- 使用Zustand做状态管理
- 使用zod做参数校验
- 页面存放目录：apps\web\src\pages
- 组件存放目录：apps\web\src\components
- 大屏幕挂件存放目录：apps\web\src\widgets 要求零入参，请求数据和展示数据以替换，拿来即用
- ui组件库@sker/ui基础组件，与业务无关的通用组件，如按钮，输入框，时间选择等
