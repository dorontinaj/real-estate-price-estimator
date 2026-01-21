import { usePredictionStore } from '@/stores/prediction';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Clock, Zap, Target } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const algorithmInfo = {
  'Linear Regression': {
    complexity: 'O(n)',
    accuracy: 'Medium',
    speed: 'Fast',
    description: 'Simple linear relationship modeling',
    color: 'bg-blue-500',
  },
  'Decision Tree': {
    complexity: 'O(n log n)',
    accuracy: 'High',
    speed: 'Medium',
    description: 'Rule-based decision making',
    color: 'bg-green-500',
  },
  'k-NN': {
    complexity: 'O(n²)',
    accuracy: 'Medium-High',
    speed: 'Slow',
    description: 'Similarity-based prediction',
    color: 'bg-purple-500',
  },
  'Random Forest': {
    complexity: 'O(n log n)',
    accuracy: 'Very High',
    speed: 'Medium',
    description: 'Ensemble of decision trees',
    color: 'bg-orange-500',
  },
};

export function AlgorithmsPage() {
  const { predictions } = usePredictionStore();

  if (predictions.length === 0) {
    return (
      <div className='space-y-6'>
        <div className='text-center'>
          <div className='flex items-center justify-center gap-2 sm:gap-3 mb-4'>
            <div className='p-2 sm:p-3 bg-green-600 dark:bg-green-500 rounded-xl shadow-lg'>
              <BarChart3 className='h-6 w-6 sm:h-8 sm:w-8 text-white' />
            </div>
            <div className='text-left'>
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-foreground'>
                Algorithm Comparison
              </h1>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Performance analysis of ML models
              </p>
            </div>
          </div>
        </div>{' '}
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BarChart3 className='h-5 w-5' />
              Algorithm Comparison
            </CardTitle>
            <CardDescription>
              Run predictions to see algorithm performance comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-center py-12 text-muted-foreground'>
              <BarChart3 className='h-16 w-16 mx-auto mb-4 opacity-30' />
              <p className='text-lg font-medium'>
                No predictions available yet
              </p>
              <p className='text-sm mt-2'>
                Use the "Compare Algorithms" button in the Estimator page
              </p>
            </div>
          </CardContent>
        </Card>
        <AlgorithmCharacteristics />
      </div>
    );
  }

  const avgPrice =
    predictions.reduce((sum, p) => sum + p.price, 0) / predictions.length;
  const avgProcessingTime =
    predictions.reduce((sum, p) => sum + p.processingTime, 0) /
    predictions.length;

  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <div className='p-3 bg-green-600 dark:bg-green-500 rounded-xl shadow-lg'>
            <BarChart3 className='h-8 w-8 text-white' />
          </div>
          <div className='text-left'>
            <h1 className='text-3xl font-bold text-foreground'>
              Algorithm Comparison
            </h1>
            <p className='text-sm text-muted-foreground'>
              Performance analysis of {predictions.length} ML models
            </p>
          </div>
        </div>
      </div>

      <Card className='shadow-lg border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <BarChart3 className='h-5 w-5' />
            Performance Overview
          </CardTitle>
          <CardDescription>
            Comparison of {predictions.length} machine learning algorithms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='text-center p-3 sm:p-4 bg-background dark:bg-card rounded-lg shadow-sm'>
              <div className='text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400'>
                {formatCurrency(Math.round(avgPrice))}
              </div>
              <div className='text-sm text-blue-800 dark:text-blue-300 mt-1'>
                Average Prediction
              </div>
            </div>
            <div className='text-center p-4 bg-background dark:bg-card rounded-lg shadow-sm'>
              <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                {avgProcessingTime.toFixed(2)}ms
              </div>
              <div className='text-sm text-green-800 dark:text-green-300 mt-1'>
                Average Processing Time
              </div>
            </div>
            <div className='text-center p-4 bg-background dark:bg-card rounded-lg shadow-sm'>
              <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                {Math.round(
                  (predictions.reduce((sum, p) => sum + p.confidence, 0) /
                    predictions.length) *
                    100
                )}
                %
              </div>
              <div className='text-sm text-purple-800 dark:text-purple-300 mt-1'>
                Average Confidence
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {predictions.map((prediction, index) => {
          const info =
            algorithmInfo[prediction.algorithm as keyof typeof algorithmInfo];
          const priceDeviation =
            ((prediction.price - avgPrice) / avgPrice) * 100;

          return (
            <Card
              key={index}
              className='shadow-lg hover:shadow-xl transition-shadow'
            >
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-lg'>
                    {prediction.algorithm}
                  </CardTitle>
                  <Badge
                    variant='outline'
                    className={`text-white ${info?.color || 'bg-gray-500'}`}
                  >
                    {info?.accuracy || 'Unknown'}
                  </Badge>
                </div>
                <CardDescription>
                  {info?.description || 'Advanced ML algorithm'}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <div className='text-3xl font-bold text-foreground'>
                      {formatCurrency(prediction.price)}
                    </div>
                    <div className='text-sm text-muted-foreground mt-1'>
                      {priceDeviation > 0 ? '+' : ''}
                      {priceDeviation.toFixed(1)}% from average
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='text-2xl font-semibold text-foreground'>
                      {Math.round(prediction.confidence * 100)}%
                    </div>
                    <div className='text-sm text-muted-foreground mt-1'>Confidence</div>
                  </div>
                </div>

                <div>
                  <div className='flex justify-between text-sm mb-2'>
                    <span className='text-muted-foreground'>Confidence Level</span>
                    <span className='font-medium'>
                      {Math.round(prediction.confidence * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={prediction.confidence * 100}
                    className='h-2'
                  />
                </div>

                <div className='grid grid-cols-3 gap-3 text-xs pt-2'>
                  <div className='flex items-center gap-2 p-2 bg-muted rounded'>
                    <Zap className='h-4 w-4 text-yellow-600 dark:text-yellow-400' />
                    <span className='text-muted-foreground'>
                      {info?.complexity || 'O(n)'}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 p-2 bg-muted rounded'>
                    <Clock className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                    <span className='text-muted-foreground'>
                      {prediction.processingTime.toFixed(2)}ms
                    </span>
                  </div>
                  <div className='flex items-center gap-2 p-2 bg-muted rounded'>
                    <Target className='h-4 w-4 text-green-600 dark:text-green-400' />
                    <span className='text-muted-foreground'>
                      {info?.speed || 'Medium'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AlgorithmCharacteristics />
    </div>
  );
}

function AlgorithmCharacteristics() {
  return (
    <Card className='shadow-lg'>
      <CardHeader>
        <CardTitle>Algorithm Characteristics</CardTitle>
        <CardDescription>
          Understanding the strengths and trade-offs of each approach
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='text-left p-3 font-semibold text-foreground'>
                  Algorithm
                </th>
                <th className='text-left p-3 font-semibold text-foreground'>
                  Time Complexity
                </th>
                <th className='text-left p-3 font-semibold text-foreground'>
                  Accuracy
                </th>
                <th className='text-left p-3 font-semibold text-foreground'>
                  Speed
                </th>
                <th className='text-left p-3 font-semibold text-foreground'>
                  Interpretability
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(algorithmInfo).map(([name, info]) => (
                <tr key={name} className='border-b hover:bg-muted/50 transition-colors'>
                  <td className='p-3 font-medium text-foreground'>{name}</td>
                  <td className='p-3 font-mono text-xs text-muted-foreground'>
                    {info.complexity}
                  </td>
                  <td className='p-3'>
                    <Badge variant='outline' className='text-xs'>
                      {info.accuracy}
                    </Badge>
                  </td>
                  <td className='p-3'>
                    <Badge variant='outline' className='text-xs'>
                      {info.speed}
                    </Badge>
                  </td>
                  <td className='p-3 text-xs text-muted-foreground'>
                    {name === 'Linear Regression'
                      ? 'High'
                      : name === 'Decision Tree'
                        ? 'High'
                        : name === 'k-NN'
                          ? 'Medium'
                          : 'Low'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
