import { createFileRoute } from '@tanstack/react-router';
import { DataVisualizationPage } from '../pages/DataVisualizationPage';

export const Route = createFileRoute('/data-visualization')({
  component: DataVisualizationPage,
});
