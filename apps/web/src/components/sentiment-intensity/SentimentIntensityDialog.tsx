import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@sker/ui';
import { Settings, Sparkles } from 'lucide-react';
import React from 'react';
import type {
  CreateSentimentIntensityInput,
  SentimentIntensityItem,
} from '../../types/sentiment-intensity';
import { SentimentIntensityForm } from './SentimentIntensityForm';

interface SentimentIntensityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSentimentIntensityInput) => void;
  initialData?: SentimentIntensityItem | null;
  isSubmitting?: boolean;
  title?: string;
}

export const SentimentIntensityDialog: React.FC<SentimentIntensityDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
  title,
}) => {
  const dialogTitle = title || (initialData ? '编辑情感强度' : '新建情感强度');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border-0 shadow-2xl bg-card">
        <DialogHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {initialData ? <Settings className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">{dialogTitle}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {initialData ? '修改情感强度参数设置' : '创建新的情感强度配置'}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="border-t border-border pt-6">
          <SentimentIntensityForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
