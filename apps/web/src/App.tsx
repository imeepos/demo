import { useLocalStorage } from '@/hooks';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@sker/ui';
import { useState } from 'react';
function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <div className="min-h-screen bg-background transition-colors">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome to Sker
              </h1>
              <Badge variant="secondary">基于 shadcn/ui 的现代化模板</Badge>
            </div>
          </div>
          <p className="text-muted-foreground">
            一个现代化的前端项目模板，集成了 TailwindCSS v4 和 shadcn/ui 组件
          </p>
        </header>

        <main className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>计数器示例</CardTitle>
              <CardDescription>
                使用 shadcn/ui Button 组件的计数器演示
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button
                  variant="destructive"
                  onClick={() => setCount(count - 1)}
                >
                  -
                </Button>
                <span className="text-2xl font-mono text-foreground min-w-[3rem] text-center">
                  {count}
                </span>
                <Button onClick={() => setCount(count + 1)}>+</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>主题切换</CardTitle>
              <CardDescription>测试深色/浅色主题切换功能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                >
                  ☀️ 明亮模式
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                >
                  🌙 暗黑模式
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>组件展示</CardTitle>
              <CardDescription>
                shadcn/ui 组件库中的一些基础组件
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge>默认</Badge>
                  <Badge variant="secondary">次要</Badge>
                  <Badge variant="destructive">危险</Badge>
                  <Badge variant="outline">轮廓</Badge>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button size="sm">小按钮</Button>
                  <Button>默认按钮</Button>
                  <Button size="lg">大按钮</Button>
                  <Button variant="ghost">幽灵按钮</Button>
                  <Button variant="link">链接按钮</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default App;
