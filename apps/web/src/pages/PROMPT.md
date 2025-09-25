## 项目背景：

这是一个舆情监控分析系统

## 编码规范：

- 使用@tanstack/react-query管理服务端状态
- 使用Zustand做状态管理
- 使用zod做参数校验
- 页面存放目录：apps\web\src\pages
- 组件存放目录：apps\web\src\components
- 大屏幕挂件存放目录：apps\web\src\widgets 要求零入参，请求数据和展示数据以替换，拿来即用
- ui组件库@sker/ui基础组件，与业务无关的通用组件，如按钮，输入框，时间选择等
- 类型系统要尽量统一，避免做无畏的类型转换

## 需求说明：

分析并修复一下错误：

pnpm run --filter=@sker/web build

> @sker/web@1.0.0 build C:\Users\imeep\Desktop\demos\apps\web
> tsc --noEmit && vite build

vite v7.1.7 building for production...
✓ 1740 modules transformed.
✗ Build failed in 3.91s
error during build:
[vite]: Rollup failed to resolve import "zod/v4/core" from "C:/Users/imeep/Desktop/demos/node*modules/.pnpm/@hookform+resolvers@5.2.2_r_689534688a1105c810693ea6bb27fb9e/node_modules/@hookform/resolvers/zod/dist/zod.mjs".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
`build.rollupOptions.external`
at viteLog (file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/vite@7.1.7*@types+node@24.5_b03b1777b223f07d72cec3dc0a0e302d/node*modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33954:57)
at file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/vite@7.1.7*@types+node@24.5_b03b1777b223f07d72cec3dc0a0e302d/node*modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33990:73
at onwarn (file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/@vitejs+plugin-react@5.0.3__f329b7172d9a45cd1781b317ab6d5c21/node_modules/@vitejs/plugin-react/dist/index.js:55:7)  
 at file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/vite@7.1.7*@types+node@24.5_b03b1777b223f07d72cec3dc0a0e302d/node*modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33990:28
at onRollupLog (file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/vite@7.1.7*@types+node@24.5_b03b1777b223f07d72cec3dc0a0e302d/node*modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33985:63)
at onLog (file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/vite@7.1.7*@types+node@24.5_b03b1777b223f07d72cec3dc0a0e302d/node_modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33786:4)  
 at file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/rollup@4.52.2/node_modules/rollup/dist/es/shared/node-entry.js:20936:32
at Object.logger [as onLog] (file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/rollup@4.52.2/node_modules/rollup/dist/es/shared/node-entry.js:22822:9)
at ModuleLoader.handleInvalidResolvedId (file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/rollup@4.52.2/node_modules/rollup/dist/es/shared/node-entry.js:21566:26)
at file:///C:/Users/imeep/Desktop/demos/node_modules/.pnpm/rollup@4.52.2/node_modules/rollup/dist/es/shared/node-entry.js:21524:26
C:\Users\imeep\Desktop\demos\apps\web:
 ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  @sker/web@1.0.0 build: `tsc --noEmit && vite build`
Exit status 1

- 使用@sker/sdk提供的接口
- 后端接口文件：apps\api\src\sentiment-event\sentiment-event.controller.ts
- 开发sentiment-event舆情事件相关的管理页面
- 第一步：开发业务组件，列表页面/form表单/检索组件
- 第二步：组装业务组件开发页面组件
- 第三步：添加到路由配置
- 第四步：检查构建问题
- 第五步：首页添加入口，apps\web\src\pages\HomePage.tsx
