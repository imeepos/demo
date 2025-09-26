import { createFileRoute } from '@tanstack/react-router';
import { EnhancedDashboardPage } from '../pages/EnhancedDashboardPage';

export const Route = createFileRoute('/enhanced-dashboard')({
  component: EnhancedDashboardPage,
});
