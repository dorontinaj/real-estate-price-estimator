import { createFileRoute } from '@tanstack/react-router';
import { AlgorithmsPage } from '@/features/algorithms/AlgorithmsPage';

export const Route = createFileRoute('/algorithms')({
  component: AlgorithmsPage,
});
