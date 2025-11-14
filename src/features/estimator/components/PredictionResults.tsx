import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, Target } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { PredictionResult } from '@/stores/prediction';

interface PredictionResultsProps {
  predictions: PredictionResult[];
  isLoading: boolean;
}

export function PredictionResults({
  predictions,
  isLoading,
}: PredictionResultsProps) {
  if (isLoading) {
    return (
      <Card className='shadow-lg border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-green-50 to-emerald-50'>
          <CardTitle>Processing...</CardTitle>
          <CardDescription>Running machine learning algorithms</CardDescription>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='space-y-4'>
            <div className='animate-pulse'>
              <div className='h-10 bg-gray-200 rounded-lg mb-4'></div>
              <div className='h-4 bg-gray-200 rounded mb-2'></div>
              <div className='h-4 bg-gray-200 rounded w-3/4'></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (predictions.length === 0) {
    return (
      <Card className='shadow-lg border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-green-50 to-emerald-50'>
          <CardTitle>Price Estimation</CardTitle>
          <CardDescription>
            Results will appear here after running the prediction
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='text-center py-12 text-gray-500'>
            <TrendingUp className='h-16 w-16 mx-auto mb-4 opacity-30' />
            <p className='text-lg font-medium'>Enter property details</p>
            <p className='text-sm mt-2'>
              Click "Quick Estimate" to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const mainPrediction = predictions[0];
  const avgPrice =
    predictions.length > 1
      ? Math.round(
          predictions.reduce((sum, p) => sum + p.price, 0) / predictions.length
        )
      : mainPrediction.price;

  return (
    <div className='space-y-4'>
      <Card className='shadow-lg border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-green-800'>
            <TrendingUp className='h-5 w-5' />
            Estimated Price
          </CardTitle>
          <CardDescription className='text-green-700'>
            {predictions.length > 1
              ? 'Average of all algorithms'
              : `Using ${mainPrediction.algorithm}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-center'>
            <div className='text-5xl font-bold text-green-700 mb-3'>
              {formatCurrency(avgPrice)}
            </div>
            <div className='flex items-center justify-center gap-6 text-sm text-green-700'>
              <div className='flex items-center gap-2'>
                <Target className='h-4 w-4' />
                <span>
                  Confidence: {Math.round(mainPrediction.confidence * 100)}%
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4' />
                <span>{mainPrediction.processingTime.toFixed(2)}ms</span>
              </div>
            </div>
            <Progress
              value={mainPrediction.confidence * 100}
              className='mt-4 h-2'
            />
          </div>
        </CardContent>
      </Card>

      {predictions.length > 1 && (
        <Card className='shadow-lg border-gray-200'>
          <CardHeader>
            <CardTitle className='text-base'>Algorithm Comparison</CardTitle>
            <CardDescription>
              Results from different machine learning models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {predictions.map((prediction, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow'
                >
                  <div className='flex items-center gap-3'>
                    <Badge variant='outline' className='bg-white font-medium'>
                      {prediction.algorithm}
                    </Badge>
                    <span className='font-semibold text-gray-900'>
                      {formatCurrency(prediction.price)}
                    </span>
                  </div>
                  <div className='text-sm text-gray-600'>
                    {Math.round(prediction.confidence * 100)}% confidence
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200'>
              <div className='text-sm text-blue-900'>
                <strong>Price Range:</strong>{' '}
                {formatCurrency(Math.min(...predictions.map((p) => p.price)))} -{' '}
                {formatCurrency(Math.max(...predictions.map((p) => p.price)))}
              </div>
              <div className='text-sm text-blue-700 mt-1'>
                <strong>Standard Deviation:</strong>{' '}
                {formatCurrency(
                  Math.round(
                    Math.sqrt(
                      predictions.reduce(
                        (sum, p) => sum + Math.pow(p.price - avgPrice, 2),
                        0
                      ) / predictions.length
                    )
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
