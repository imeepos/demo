# API地址配置指南

## 概述

本项目使用环境变量方式配置服务端API地址，支持不同环境的灵活配置。

## 配置方法

### 1. 通过环境变量文件配置

#### 开发环境配置

编辑 `.env.development` 文件：

```env
VITE_API_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000
```

#### 生产环境配置

编辑 `.env.production` 文件：

```env
VITE_API_URL=https://your-production-api.com/api
VITE_API_TIMEOUT=15000
```

#### 本地个性化配置

创建 `.env.local` 文件（该文件会被git忽略）：

```env
# 本地开发时使用的API地址
VITE_API_URL=http://192.168.1.100:3001/api
VITE_API_TIMEOUT=8000
```

### 2. 环境变量说明

| 变量名             | 说明               | 默认值                      | 必需 |
| ------------------ | ------------------ | --------------------------- | ---- |
| `VITE_API_URL`     | API服务器地址      | `http://localhost:3001/api` | 是   |
| `VITE_API_TIMEOUT` | 请求超时时间(毫秒) | `10000`                     | 否   |

### 3. 配置优先级

1. `.env.local` (最高优先级，仅本地有效)
2. `.env.development` / `.env.production` (环境特定)
3. `.env` (全局默认)
4. 代码中的默认值 (最低优先级)

## 使用示例

### 常见配置场景

#### 1. 本地开发连接本地API

```env
VITE_API_URL=http://localhost:3001/api
```

#### 2. 本地开发连接远程测试API

```env
VITE_API_URL=https://test-api.your-domain.com/api
```

#### 3. 生产环境配置

```env
VITE_API_URL=https://api.your-domain.com/api
VITE_API_TIMEOUT=15000
```

#### 4. 使用不同端口的API

```env
VITE_API_URL=http://localhost:8080/api
```

## 验证配置

### 1. 查看配置是否生效

打开浏览器开发者工具的Console，启动应用后会看到：

```
API配置已初始化: {
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
  enableMock: true
}
```

### 2. 检查网络请求

在浏览器开发者工具的Network标签页中，可以看到API请求是否使用了正确的地址。

## 注意事项

1. **重启开发服务器**: 修改环境变量后需要重启开发服务器才能生效
2. **VITE\_前缀**: 只有以`VITE_`开头的环境变量才能在前端代码中访问
3. **安全性**: 不要在前端环境变量中存储敏感信息（如API密钥）
4. **缓存清理**: 如果配置未生效，尝试清除浏览器缓存或使用无痕模式

## 故障排除

### 配置未生效

1. 确认环境变量以`VITE_`开头
2. 重启开发服务器 (`pnpm run dev`)
3. 检查拼写是否正确
4. 查看浏览器console是否有配置信息输出

### API请求失败

1. 确认API服务器是否正在运行
2. 检查API地址是否可访问
3. 验证端口号是否正确
4. 检查防火墙或代理设置

## 高级配置

如需更复杂的配置（如不同的认证方式、请求头等），可以修改 `src/config/api.ts` 文件。
