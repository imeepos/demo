/**
 * 基础组件展示区域
 * 职责：展示所有shadcn/ui基础组件的功能和使用方法
 */

import { useState } from 'react';
import {
  Button,
  Input,
  Label,
  Textarea,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Progress,
  Separator,
  Alert,
  AlertDescription,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Skeleton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@sker/ui';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Settings,
  User,
  Mail,
  Lock,
  Search,
  Filter,
  Download,
} from 'lucide-react';

export function BasicComponentsSection() {
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(65);
  const [sliderValue, setSliderValue] = useState([50]);
  const [isChecked, setIsChecked] = useState<boolean | 'indeterminate'>(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <div className="space-y-8">
      {/* 表单控件区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            表单控件
          </CardTitle>
          <CardDescription>输入框、按钮、选择器等基础表单组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 按钮组 */}
          <div>
            <Label className="text-sm font-medium">按钮组件</Label>
            <div className="flex flex-wrap gap-3 mt-2">
              <Button>默认按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="destructive">危险按钮</Button>
              <Button variant="outline">边框按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
              <Button variant="link">链接按钮</Button>
            </div>
          </div>

          <Separator />

          {/* 输入控件 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">搜索关键词</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="输入搜索关键词..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="select">数据源选择</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="选择数据源" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weibo">微博</SelectItem>
                    <SelectItem value="wechat">微信</SelectItem>
                    <SelectItem value="news">新闻</SelectItem>
                    <SelectItem value="forum">论坛</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="textarea">内容描述</Label>
                <Textarea
                  id="textarea"
                  placeholder="请输入详细描述..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>情感倾向</Label>
                <RadioGroup
                  value={radioValue}
                  onValueChange={setRadioValue}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="positive" id="positive" />
                    <Label htmlFor="positive">正面</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="negative" id="negative" />
                    <Label htmlFor="negative">负面</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="neutral" id="neutral" />
                    <Label htmlFor="neutral">中性</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={isChecked}
                    onCheckedChange={setIsChecked}
                  />
                  <Label htmlFor="urgent">紧急事件标记</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="realtime"
                    checked={switchValue}
                    onCheckedChange={setSwitchValue}
                  />
                  <Label htmlFor="realtime">实时监控</Label>
                </div>
              </div>

              <div>
                <Label>重要性权重: {sliderValue[0]}%</Label>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 数据展示区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            数据展示
          </CardTitle>
          <CardDescription>头像、徽章、进度条等数据展示组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 用户信息展示 */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium">舆情分析员</p>
              <div className="flex gap-2">
                <Badge variant="default">高级用户</Badge>
                <Badge variant="secondary">在线</Badge>
                <Badge variant="outline">管理员</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* 进度展示 */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>数据处理进度</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-muted-foreground">正面情感</div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-red-600">10%</div>
                <div className="text-sm text-muted-foreground">负面情感</div>
                <Progress value={10} className="h-2" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-gray-600">5%</div>
                <div className="text-sm text-muted-foreground">中性情感</div>
                <Progress value={5} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 反馈提示区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            反馈提示
          </CardTitle>
          <CardDescription>警告、对话框、工具提示等反馈组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>系统提示</AlertTitle>
            <AlertDescription>
              舆情监控系统正在正常运行，当前监控 1,234 个数据源。
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>异常警告</AlertTitle>
            <AlertDescription>
              检测到异常情感波动，建议立即查看详细数据。
            </AlertDescription>
          </Alert>

          <div className="flex gap-4 flex-wrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  系统设置
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>系统设置</DialogTitle>
                  <DialogDescription>
                    配置舆情监控系统的基本参数和监控规则。
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      监控频率
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="选择频率" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1min">每分钟</SelectItem>
                        <SelectItem value="5min">每5分钟</SelectItem>
                        <SelectItem value="15min">每15分钟</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>高级筛选</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>导出数据</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      {/* 数据表格区域 */}
      <Card>
        <CardHeader>
          <CardTitle>数据表格</CardTitle>
          <CardDescription>舆情数据列表展示</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>最近的舆情监控数据</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>时间</TableHead>
                <TableHead>来源</TableHead>
                <TableHead>内容</TableHead>
                <TableHead>情感</TableHead>
                <TableHead className="text-right">评分</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>10:30</TableCell>
                <TableCell>微博</TableCell>
                <TableCell>产品体验很棒</TableCell>
                <TableCell>
                  <Badge variant="default">正面</Badge>
                </TableCell>
                <TableCell className="text-right">8.5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10:25</TableCell>
                <TableCell>论坛</TableCell>
                <TableCell>功能需要改进</TableCell>
                <TableCell>
                  <Badge variant="destructive">负面</Badge>
                </TableCell>
                <TableCell className="text-right">3.2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10:20</TableCell>
                <TableCell>新闻</TableCell>
                <TableCell>中性报道内容</TableCell>
                <TableCell>
                  <Badge variant="secondary">中性</Badge>
                </TableCell>
                <TableCell className="text-right">5.0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 折叠面板区域 */}
      <Card>
        <CardHeader>
          <CardTitle>帮助文档</CardTitle>
          <CardDescription>常见问题和使用指南</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>如何设置监控关键词？</AccordionTrigger>
              <AccordionContent>
                在搜索设置页面输入要监控的关键词，支持正则表达式和精确匹配两种模式。
                每个项目最多可以设置100个关键词。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>情感分析的准确率如何？</AccordionTrigger>
              <AccordionContent>
                我们的情感分析模型在中文文本上的准确率达到90%以上，
                支持细粒度的情感分类和强度评估。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>数据更新频率是多少？</AccordionTrigger>
              <AccordionContent>
                默认每5分钟更新一次数据，高级版用户可以设置为实时更新。
                历史数据保存180天，支持导出Excel和PDF格式。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* 加载状态展示 */}
      <Card>
        <CardHeader>
          <CardTitle>加载状态</CardTitle>
          <CardDescription>骨架屏加载效果</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
