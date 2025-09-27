import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Bot, Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Textarea,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@sker/ui';
import { cn } from '@sker/ui';
import {
  useMutationAgentCreate,
  useMutationAgentUpdate,
} from '../../hooks/agent';

interface AgentFormProps {
  mode: 'create' | 'edit';
  agent?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AgentFormData {
  name: string;
  code: string;
  description?: string;
  systemPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export function AgentForm({ mode, agent, open, onOpenChange }: AgentFormProps) {
  const createAgent = useMutationAgentCreate();
  const updateAgent = useMutationAgentUpdate();

  const form = useForm<AgentFormData>({
    defaultValues: {
      name: '',
      code: '',
      description: '',
      systemPrompt: '',
      temperature: 0.7,
      maxTokens: 2048,
    },
  });

  useEffect(() => {
    if (agent && mode === 'edit') {
      form.reset({
        name: agent.name || '',
        code: agent.code || '',
        description: agent.description || '',
        systemPrompt: agent.systemPrompt || '',
        temperature: agent.temperature || 0.7,
        maxTokens: agent.maxTokens || 2048,
      });
    } else if (mode === 'create') {
      form.reset({
        name: '',
        code: '',
        description: '',
        systemPrompt: '',
        temperature: 0.7,
        maxTokens: 2048,
      });
    }
  }, [agent, mode, form]);

  const onSubmit = async (data: AgentFormData) => {
    try {
      await (mode === 'create'
        ? createAgent.mutateAsync({
            url: '/api/agents',
            body: data,
          })
        : updateAgent.mutateAsync({
            url: '/api/agents/{id}',
            path: { id: agent.id },
            body: data,
          }));
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Error saving agent:', error);
    }
  };

  const isLoading = createAgent.isPending || updateAgent.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            {mode === 'create' ? '新建智能体' : '编辑智能体'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: '请输入智能体名称' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名称 *</FormLabel>
                    <FormControl>
                      <Input placeholder="输入智能体名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                rules={{
                  required: '请输入智能体代码',
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message: '代码只能包含字母、数字、下划线和横线',
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>代码 *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="输入智能体代码"
                        {...field}
                        disabled={mode === 'edit'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="输入智能体描述..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="systemPrompt"
              rules={{ required: '请输入系统提示词' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>系统提示词 *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="输入系统提示词..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>温度值</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="2"
                        placeholder="0.7"
                        {...field}
                        onChange={e =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxTokens"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>最大Token数</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="32768"
                        placeholder="2048"
                        {...field}
                        onChange={e =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                取消
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {mode === 'create' ? '创建' : '保存'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
