import { createFileRoute } from '@tanstack/react-router';
import { EventTypePage } from '../pages/EventTypePage';

export const Route = createFileRoute('/event-type')({
  component: EventTypePage,
});
