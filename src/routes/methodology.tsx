import { createFileRoute } from '@tanstack/react-router';
import { MethodologyPage } from '@/features/methodology/MethodologyPage';

export const Route = createFileRoute('/methodology')({
  component: MethodologyPage,
});
