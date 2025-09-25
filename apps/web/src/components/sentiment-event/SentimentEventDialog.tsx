import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@sker/ui';
import { Edit3, Sparkles } from 'lucide-react';
import React from 'react';
import type { CreateSentimentEventInput, SentimentEvent } from '../../types/sentiment-event';
import { SentimentEventForm } from './SentimentEventForm';

interface SentimentEventDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSentimentEventInput) => void;
  initialData?: SentimentEvent | null;
  isSubmitting?: boolean;
  title: string;
}

export const SentimentEventDialog: React.FC<SentimentEventDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
  title,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-card">
        <DialogHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {initialData ? (
                <Edit3 className="w-5 h-5 text-primary" />
              ) : (
                <Sparkles className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="flex flex-col">
              <DialogTitle className="text-xl font-bold text-foreground text-left">{title}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {initialData ? '修改舆情事件的详细信息和参数' : '创建新的舆情事件并设置相关参数'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="border-t border-border pt-6">
          <SentimentEventForm
            initialData={initialData || null}
            onSubmit={onSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
