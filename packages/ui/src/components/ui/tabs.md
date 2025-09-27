# Tabs 组件文档

Tabs 组件是基于 Radix UI 的选项卡组件，用于在多个面板之间切换。

## 组件导出

```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
```

## 基本用法

```tsx
<Tabs defaultValue="tab1" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="tab1">选项卡 1</TabsTrigger>
    <TabsTrigger value="tab2">选项卡 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">第一个选项卡的内容</TabsContent>
  <TabsContent value="tab2">第二个选项卡的内容</TabsContent>
</Tabs>
```

## 组件说明

- **Tabs**: 根组件，管理选项卡状态
- **TabsList**: 选项卡按钮的容器
- **TabsTrigger**: 单个选项卡按钮
- **TabsContent**: 选项卡对应的内容面板

## 属性

### Tabs 属性

| 属性           | 类型                       | 默认值       | 描述               |
| -------------- | -------------------------- | ------------ | ------------------ |
| defaultValue   | string                     | -            | 默认激活的选项卡   |
| value          | string                     | -            | 受控模式下的当前值 |
| onValueChange  | (value: string) => void    | -            | 值变化回调         |
| orientation    | "horizontal" \| "vertical" | "horizontal" | 选项卡方向         |
| dir            | "ltr" \| "rtl"             | "ltr"        | 文字方向           |
| activationMode | "automatic" \| "manual"    | "automatic"  | 激活模式           |

### TabsTrigger 属性

| 属性     | 类型    | 描述             |
| -------- | ------- | ---------------- |
| value    | string  | 选项卡的唯一标识 |
| disabled | boolean | 是否禁用         |

## 使用示例

### 基本选项卡

```tsx
function BasicTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">账户</TabsTrigger>
        <TabsTrigger value="password">密码</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <h3 className="text-lg font-medium">账户设置</h3>
        <p className="text-sm text-muted-foreground">
          在这里管理您的账户设置和偏好。
        </p>
      </TabsContent>
      <TabsContent value="password" className="space-y-2">
        <h3 className="text-lg font-medium">密码设置</h3>
        <p className="text-sm text-muted-foreground">
          更改您的密码以保护账户安全。
        </p>
      </TabsContent>
    </Tabs>
  );
}
```

### 受控选项卡

```tsx
function ControlledTabs() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="overview">概览</TabsTrigger>
        <TabsTrigger value="analytics">分析</TabsTrigger>
        <TabsTrigger value="reports">报告</TabsTrigger>
        <TabsTrigger value="notifications">通知</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">系统概览</h3>
          <p>当前选中: {activeTab}</p>
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">数据分析</h3>
          <p>分析报表和图表将在这里显示</p>
        </div>
      </TabsContent>

      <TabsContent value="reports">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">报告中心</h3>
          <p>生成和下载各种报告</p>
        </div>
      </TabsContent>

      <TabsContent value="notifications">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">通知设置</h3>
          <p>管理您的通知偏好</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

### 带表单的选项卡

```tsx
function FormTabs() {
  return (
    <Tabs defaultValue="personal" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">个人信息</TabsTrigger>
        <TabsTrigger value="contact">联系方式</TabsTrigger>
        <TabsTrigger value="preferences">偏好设置</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">姓名</label>
          <input
            type="text"
            placeholder="请输入您的姓名"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">生日</label>
          <input type="date" className="w-full p-2 border rounded-md" />
        </div>
      </TabsContent>

      <TabsContent value="contact" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">邮箱</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">电话</label>
          <input
            type="tel"
            placeholder="+86 138 0000 0000"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </TabsContent>

      <TabsContent value="preferences" className="space-y-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="newsletters" />
          <label htmlFor="newsletters" className="text-sm">
            接收新闻通讯
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="marketing" />
          <label htmlFor="marketing" className="text-sm">
            接收营销信息
          </label>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

### 垂直选项卡

```tsx
function VerticalTabs() {
  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="flex w-[600px] h-[400px]"
    >
      <TabsList className="flex flex-col h-full w-[200px]">
        <TabsTrigger value="general" className="w-full justify-start">
          常规设置
        </TabsTrigger>
        <TabsTrigger value="security" className="w-full justify-start">
          安全设置
        </TabsTrigger>
        <TabsTrigger value="appearance" className="w-full justify-start">
          外观设置
        </TabsTrigger>
        <TabsTrigger value="advanced" className="w-full justify-start">
          高级设置
        </TabsTrigger>
      </TabsList>

      <div className="flex-1 p-4">
        <TabsContent value="general">
          <h3 className="text-lg font-medium mb-4">常规设置</h3>
          <p>配置应用的基本行为和功能。</p>
        </TabsContent>

        <TabsContent value="security">
          <h3 className="text-lg font-medium mb-4">安全设置</h3>
          <p>管理您的账户安全和隐私设置。</p>
        </TabsContent>

        <TabsContent value="appearance">
          <h3 className="text-lg font-medium mb-4">外观设置</h3>
          <p>自定义界面主题和布局选项。</p>
        </TabsContent>

        <TabsContent value="advanced">
          <h3 className="text-lg font-medium mb-4">高级设置</h3>
          <p>面向高级用户的配置选项。</p>
        </TabsContent>
      </div>
    </Tabs>
  );
}
```

### 禁用选项卡

```tsx
function DisabledTabs() {
  return (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="tab1">可用</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          禁用
        </TabsTrigger>
        <TabsTrigger value="tab3">可用</TabsTrigger>
        <TabsTrigger value="tab4" disabled>
          禁用
        </TabsTrigger>
      </TabsList>

      <TabsContent value="tab1">
        <p>这是一个可用的选项卡内容。</p>
      </TabsContent>

      <TabsContent value="tab3">
        <p>这是另一个可用的选项卡内容。</p>
      </TabsContent>
    </Tabs>
  );
}
```

### 动态选项卡

```tsx
function DynamicTabs() {
  const [tabs, setTabs] = React.useState([
    { id: 'tab1', label: '选项卡 1', content: '内容 1' },
    { id: 'tab2', label: '选项卡 2', content: '内容 2' },
  ]);
  const [activeTab, setActiveTab] = React.useState('tab1');

  const addTab = () => {
    const newId = `tab${tabs.length + 1}`;
    setTabs(prev => [
      ...prev,
      {
        id: newId,
        label: `选项卡 ${tabs.length + 1}`,
        content: `内容 ${tabs.length + 1}`,
      },
    ]);
    setActiveTab(newId);
  };

  const removeTab = (tabId: string) => {
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTab === tabId) {
      setActiveTab(tabs[0]?.id || '');
    }
  };

  return (
    <div className="w-[500px]">
      <div className="mb-4">
        <button
          onClick={addTab}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          添加选项卡
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id} className="group">
              {tab.label}
              {tabs.length > 1 && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeTab(tab.id);
                  }}
                  className="ml-2 opacity-50 hover:opacity-100"
                >
                  ×
                </button>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id}>
            <div className="p-4 border rounded-lg">
              <p>{tab.content}</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
```

## 样式自定义

所有组件都支持 `className` 属性进行样式自定义：

```tsx
<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="bg-gray-100">
    <TabsTrigger value="tab1" className="data-[state=active]:bg-blue-500">
      自定义样式
    </TabsTrigger>
  </TabsList>
</Tabs>
```

## 无障碍支持

- 支持键盘导航（方向键切换选项卡）
- 提供适当的 ARIA 属性
- 支持屏幕阅读器
- 焦点管理
