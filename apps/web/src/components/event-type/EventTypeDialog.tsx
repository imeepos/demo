import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@sker/ui';
import { Edit3, Sparkles } from 'lucide-react';
import React from 'react';
import type { EventType, EventTypeCreateInput } from '../../types/event-type';
import { EventTypeForm } from './EventTypeForm';

interface EventTypeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EventTypeCreateInput) => void;
  initialData?: EventType | null;
  isSubmitting?: boolean;
  title: string;
}

export const EventTypeDialog: React.FC<EventTypeDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
  title,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-card">
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
              <DialogTitle className="text-xl font-bold text-foreground text-left">
                {title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {initialData
                  ? '修改事件类型的详细信息和显示设置'
                  : '创建新的事件类型并设置相关参数'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="border-t border-border pt-6">
          <EventTypeForm
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
