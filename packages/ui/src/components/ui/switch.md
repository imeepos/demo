# Switch 组件文档

Switch 组件是基于 Radix UI 的开关组件，用于切换布尔状态。

## 组件导出

```typescript
import { Switch } from '@/components/ui/switch';
```

## 基本用法

```tsx
<Switch />
```

## 组件说明

Switch 组件基于 Radix UI 的 Switch 组件构建，提供了一致的样式和无障碍支持。

## 属性

继承所有 `SwitchPrimitives.Root` 的属性：

| 属性            | 类型                       | 默认值 | 描述         |
| --------------- | -------------------------- | ------ | ------------ |
| checked         | boolean                    | -      | 受控状态     |
| defaultChecked  | boolean                    | -      | 默认状态     |
| onCheckedChange | (checked: boolean) => void | -      | 状态变化回调 |
| disabled        | boolean                    | false  | 是否禁用     |
| required        | boolean                    | false  | 是否必选     |
| name            | string                     | -      | 表单字段名   |
| value           | string                     | -      | 表单值       |

## 使用示例

### 基本开关

```tsx
function BasicSwitch() {
  const [checked, setChecked] = React.useState(false);

  return <Switch checked={checked} onCheckedChange={setChecked} />;
}
```

### 带标签的开关

```tsx
function LabeledSwitch() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label
        htmlFor="airplane-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        飞行模式
      </label>
    </div>
  );
}
```

### 禁用状态

```tsx
<div className="space-y-4">
  <div className="flex items-center space-x-2">
    <Switch disabled checked />
    <label className="text-sm text-muted-foreground">已启用（禁用）</label>
  </div>
  <div className="flex items-center space-x-2">
    <Switch disabled />
    <label className="text-sm text-muted-foreground">已禁用（禁用）</label>
  </div>
</div>
```

### 设置项列表

```tsx
function SettingsPanel() {
  const [settings, setSettings] = React.useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    soundEffects: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">设置</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">通知推送</label>
            <p className="text-xs text-muted-foreground">
              接收重要消息和更新通知
            </p>
          </div>
          <Switch
            checked={settings.notifications}
            onCheckedChange={checked => updateSetting('notifications', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">深色模式</label>
            <p className="text-xs text-muted-foreground">切换到深色主题</p>
          </div>
          <Switch
            checked={settings.darkMode}
            onCheckedChange={checked => updateSetting('darkMode', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">自动保存</label>
            <p className="text-xs text-muted-foreground">自动保存您的更改</p>
          </div>
          <Switch
            checked={settings.autoSave}
            onCheckedChange={checked => updateSetting('autoSave', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">音效</label>
            <p className="text-xs text-muted-foreground">启用按钮点击音效</p>
          </div>
          <Switch
            checked={settings.soundEffects}
            onCheckedChange={checked => updateSetting('soundEffects', checked)}
          />
        </div>
      </div>
    </div>
  );
}
```

### 表单集成

```tsx
function ProfileForm() {
  const [formData, setFormData] = React.useState({
    emailNotifications: true,
    marketingEmails: false,
    profileVisible: true,
  });

  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">隐私设置</h3>

        <div className="flex items-center justify-between">
          <label htmlFor="email-notifications" className="text-sm font-medium">
            邮件通知
          </label>
          <Switch
            id="email-notifications"
            name="emailNotifications"
            checked={formData.emailNotifications}
            onCheckedChange={checked =>
              setFormData(prev => ({ ...prev, emailNotifications: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="marketing-emails" className="text-sm font-medium">
            营销邮件
          </label>
          <Switch
            id="marketing-emails"
            name="marketingEmails"
            checked={formData.marketingEmails}
            onCheckedChange={checked =>
              setFormData(prev => ({ ...prev, marketingEmails: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="profile-visible" className="text-sm font-medium">
            公开个人资料
          </label>
          <Switch
            id="profile-visible"
            name="profileVisible"
            checked={formData.profileVisible}
            onCheckedChange={checked =>
              setFormData(prev => ({ ...prev, profileVisible: checked }))
            }
          />
        </div>
      </div>

      <button type="submit" className="w-full">
        保存设置
      </button>
    </form>
  );
}
```

## 样式自定义

Switch 组件支持通过 `className` 属性自定义样式：

```tsx
<Switch className="data-[state=checked]:bg-green-500" />
```

## 无障碍支持

- 支持键盘导航（Space 键切换状态）
- 支持屏幕阅读器
- 提供适当的 ARIA 属性
- 支持焦点管理
