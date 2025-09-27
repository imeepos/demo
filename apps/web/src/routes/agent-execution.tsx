import { createFileRoute } from '@tanstack/react-router';
import { AgentExecutionPage } from '../pages/AgentExecutionPage';

export const Route = createFileRoute('/agent-execution')({
  component: AgentExecutionPage,
});
