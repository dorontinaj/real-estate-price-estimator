import { createFileRoute } from '@tanstack/react-router';
import { NeuralNetworkEstimator } from '@/features/neural-network/NeuralNetworkEstimator';

export const Route = createFileRoute('/neural-network')({
  component: NeuralNetworkEstimator,
});
