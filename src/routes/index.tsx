import { createFileRoute } from '@tanstack/react-router';
import { EstimatorPage } from '@/features/estimator/EstimatorPage';

export const Route = createFileRoute('/')({
  component: EstimatorPage,
});
