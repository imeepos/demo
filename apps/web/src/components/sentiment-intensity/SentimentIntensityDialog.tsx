import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@sker/ui';
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <SentimentIntensityForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
