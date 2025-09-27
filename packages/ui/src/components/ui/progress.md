# Progress 组件

基于 Radix UI 构建的进度条组件，用于显示任务或操作的完成进度。

## 组件概述

### Progress

```tsx
import { Progress } from '@/components/ui/progress';
```

进度条组件，显示从 0% 到 100% 的进度值。

**Props:**

- `className?`: 额外的 CSS 类名
- `value?`: 进度值 (0-100)
- 继承自 `@radix-ui/react-progress` Root 组件的所有属性

**默认样式:**

- 高度: 16px (h-4)
- 宽度: 100% (w-full)
- 背景: 次要背景色 (bg-secondary)
- 圆角: 完全圆角 (rounded-full)
- 溢出: 隐藏 (overflow-hidden)
- 相对定位

**指示器样式:**

- 高度: 100% (h-full)
- 宽度: 100% (w-full)
- 背景: 主要颜色 (bg-primary)
- 过渡: 平滑的变换动画 (transition-all)
- 变换: 根据进度值水平移动

## 基础用法

```tsx
import { Progress } from '@/components/ui/progress';

export function ProgressDemo() {
  return <Progress value={33} />;
}
```

## 动态进度条

```tsx
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export function DynamicProgress() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
}
```

## 文件上传进度

```tsx
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export function FileUploadProgress() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>上传进度</span>
          <span>{uploadProgress}%</span>
        </div>
        <Progress value={uploadProgress} />
      </div>
      <Button
        onClick={simulateUpload}
        disabled={isUploading}
        className="w-full"
      >
        {isUploading ? '上传中...' : '开始上传'}
      </Button>
    </div>
  );
}
```

## 下载进度

```tsx
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle } from 'lucide-react';

export function DownloadProgress() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startDownload = () => {
    setIsDownloading(true);
    setIsComplete(false);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setIsComplete(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-2">
            <span>app-installer.exe</span>
            <span>{Math.round(downloadProgress)}%</span>
          </div>
          <Progress value={downloadProgress} />
        </div>
        {isComplete && <CheckCircle className="h-5 w-5 text-green-500" />}
      </div>
      <Button
        onClick={startDownload}
        disabled={isDownloading}
        className="w-full"
      >
        <Download className="mr-2 h-4 w-4" />
        {isDownloading ? '下载中...' : '下载文件'}
      </Button>
    </div>
  );
}
```

## 多步骤进度

```tsx
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export function MultiStepProgress() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = ['个人信息', '联系方式', '验证信息', '完成'];

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            步骤 {currentStep} / {totalSteps}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{steps[currentStep - 1]}</h3>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            上一步
          </Button>
          <Button
            onClick={() =>
              setCurrentStep(Math.min(totalSteps, currentStep + 1))
            }
            disabled={currentStep === totalSteps}
            className="flex-1"
          >
            {currentStep === totalSteps ? '完成' : '下一步'}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## 技能熟练度

```tsx
import { Progress } from '@/components/ui/progress';

export function SkillProgress() {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 60 },
    { name: 'Docker', level: 45 },
  ];

  return (
    <div className="w-full max-w-md space-y-4">
      <h3 className="text-lg font-medium">技能水平</h3>
      {skills.map(skill => (
        <div key={skill.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{skill.name}</span>
            <span>{skill.level}%</span>
          </div>
          <Progress value={skill.level} />
        </div>
      ))}
    </div>
  );
}
```

## 自定义颜色和尺寸

```tsx
import { Progress } from '@/components/ui/progress';

export function CustomProgress() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* 小尺寸 */}
      <div className="space-y-2">
        <span className="text-sm">小尺寸</span>
        <Progress value={75} className="h-2" />
      </div>

      {/* 默认尺寸 */}
      <div className="space-y-2">
        <span className="text-sm">默认尺寸</span>
        <Progress value={60} />
      </div>

      {/* 大尺寸 */}
      <div className="space-y-2">
        <span className="text-sm">大尺寸</span>
        <Progress value={40} className="h-6" />
      </div>

      {/* 自定义颜色 */}
      <div className="space-y-2">
        <span className="text-sm">成功状态</span>
        <Progress value={85} className="h-3 [&>div]:bg-green-500" />
      </div>

      <div className="space-y-2">
        <span className="text-sm">警告状态</span>
        <Progress value={45} className="h-3 [&>div]:bg-yellow-500" />
      </div>

      <div className="space-y-2">
        <span className="text-sm">危险状态</span>
        <Progress value={20} className="h-3 [&>div]:bg-red-500" />
      </div>
    </div>
  );
}
```

## 带动画的进度条

```tsx
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export function AnimatedProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0; // 重新开始
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex justify-between text-sm">
        <span>动画进度条</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-3 transition-all duration-150" />
    </div>
  );
}
```

## 分段进度条

```tsx
import { Progress } from '@/components/ui/progress';

export function SegmentedProgress() {
  const segments = [
    { label: '已完成', value: 40, color: 'bg-green-500' },
    { label: '进行中', value: 25, color: 'bg-blue-500' },
    { label: '待处理', value: 35, color: 'bg-gray-300' },
  ];

  return (
    <div className="w-full max-w-md space-y-4">
      <h3 className="text-sm font-medium">项目进度</h3>

      <div className="relative h-4 rounded-full overflow-hidden bg-gray-200">
        {segments.reduce((acc, segment, index) => {
          const left = acc;
          acc += segment.value;
          return [
            ...acc,
            <div
              key={index}
              className={`absolute top-0 h-full ${segment.color}`}
              style={{
                left: `${left}%`,
                width: `${segment.value}%`,
              }}
            />,
          ];
        }, [] as JSX.Element[])}
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full ${segment.color}`} />
            <span>{segment.label}</span>
            <span className="text-muted-foreground">({segment.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 实时数据进度

```tsx
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RealTimeProgress() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.random() * 100);
      setMemoryUsage(Math.random() * 100);
      setDiskUsage(Math.random() * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>系统监控</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>CPU 使用率</span>
            <span>{Math.round(cpuUsage)}%</span>
          </div>
          <Progress value={cpuUsage} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>内存使用率</span>
            <span>{Math.round(memoryUsage)}%</span>
          </div>
          <Progress value={memoryUsage} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>磁盘使用率</span>
            <span>{Math.round(diskUsage)}%</span>
          </div>
          <Progress value={diskUsage} />
        </div>
      </CardContent>
    </Card>
  );
}
```

## 特性

- **平滑动画**: 内置过渡动画，进度变化平滑
- **无障碍访问**: 基于 Radix UI 的完整无障碍访问支持
- **灵活样式**: 支持自定义尺寸、颜色和样式
- **类型安全**: 完整的 TypeScript 支持
- **响应式**: 自适应容器宽度
- **语义化**: 正确的 ARIA 属性和角色

## 依赖项

- `@radix-ui/react-progress`: Progress 原语组件
- `../../lib/utils`: 工具函数 (cn)
