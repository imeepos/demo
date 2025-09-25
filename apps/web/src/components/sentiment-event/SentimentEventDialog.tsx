import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@sker/ui';
import React from 'react';
import type { SentimentEvent, CreateSentimentEventInput } from '../../types/sentiment-event';
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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
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