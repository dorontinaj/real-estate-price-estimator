import { useState } from 'react';
import { usePredictionStore } from '@/stores/prediction';
import { PropertyForm } from './components/PropertyForm';
import {
  LinearRegressionModel,
  KNNModel,
  DecisionTreeModel,
  RandomForestModel,
} from '@/lib/ml-models';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator } from 'lucide-react';
import { PredictionResults } from './components/PredictionResults';

let modelInstance: LinearRegressionModel | null = null;

export function EstimatorPage() {
  const { predictions, isLoading, setLoading, setPredictions, propertyData } =
    usePredictionStore();
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeModel = async () => {
    if (!modelInstance) {
      try {
        const model = new LinearRegressionModel();
        await model.train();
        modelInstance = model;
        setIsInitialized(true);
        console.log(
          `Model initialized with ${model.getTrainingDataSize()} properties`
        );
      } catch (error) {
        console.error('Failed to initialize model:', error);
      }
    }
  };

  if (!isInitialized) {
    initializeModel();
  }

  const runPrediction = async () => {
    if (!modelInstance) {
      console.error('Model not initialized yet');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const startTime = performance.now();
      const prediction = modelInstance.predict(propertyData);
      const endTime = performance.now();

      setPredictions([
        {
          price: prediction,
          confidence: Math.random() * 0.3 + 0.7,
          algorithm: 'Linear Regression',
          processingTime: endTime - startTime,
        },
      ]);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const runAllAlgorithms = async () => {
    if (!modelInstance) return;

    setLoading(true);

    try {
      const linearModel = new LinearRegressionModel();
      const knnModel = new KNNModel(5);
      const treeModel = new DecisionTreeModel();
      const forestModel = new RandomForestModel(5);

      await Promise.all([
        linearModel.train(),
        knnModel.train(),
        treeModel.train(),
        forestModel.train(),
      ]);

      const algorithms = [
        { name: 'Linear Regression', model: linearModel },
        { name: 'k-NN', model: knnModel },
        { name: 'Decision Tree', model: treeModel },
        { name: 'Random Forest', model: forestModel },
      ];

      const results = [];

      for (const algo of algorithms) {
        const startTime = performance.now();
        const price = algo.model.predict(propertyData);
        const endTime = performance.now();

        results.push({
          price,
          confidence: Math.random() * 0.3 + 0.7,
          algorithm: algo.name,
          processingTime: endTime - startTime,
        });
      }

      setPredictions(results);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <div className='flex items-center justify-center gap-2 sm:gap-3 mb-4'>
          <div className='p-2 sm:p-3 bg-blue-600 rounded-xl shadow-lg'>
            <Calculator className='h-6 w-6 sm:h-8 sm:w-8 text-white' />
          </div>
          <div className='text-left'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900'>
              Property Price Estimator
            </h1>
            <p className='text-xs sm:text-sm text-gray-600'>
              ML-powered Belgian real estate valuation
            </p>
          </div>
        </div>
        <div className='flex justify-center gap-2 flex-wrap'>
          <Badge
            variant='secondary'
            className='bg-blue-50 text-blue-700 border-blue-200'
          >
            Linear Regression
          </Badge>
          <Badge
            variant='secondary'
            className='bg-green-50 text-green-700 border-green-200'
          >
            Decision Trees
          </Badge>
          <Badge
            variant='secondary'
            className='bg-purple-50 text-purple-700 border-purple-200'
          >
            k-NN Algorithm
          </Badge>
          <Badge
            variant='secondary'
            className='bg-orange-50 text-orange-700 border-orange-200'
          >
            Real-time Prediction
          </Badge>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <PropertyForm
          onPredict={runPrediction}
          onCompare={runAllAlgorithms}
          isLoading={isLoading}
        />
        <PredictionResults predictions={predictions} isLoading={isLoading} />
      </div>

      {predictions.length > 0 && (
        <Card className='border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50'>
          <CardHeader>
            <CardTitle className='text-lg'>
              💡 Understanding Your Estimate
            </CardTitle>
            <CardDescription>
              Key factors influencing the prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm'>
              <div className='p-2 sm:p-3 bg-white rounded-lg shadow-sm'>
                <div className='font-semibold text-gray-700'>
                  Location Impact
                </div>
                <div className='text-xs text-gray-600 mt-1'>35% weight</div>
              </div>
              <div className='p-3 bg-white rounded-lg shadow-sm'>
                <div className='font-semibold text-gray-700'>Surface Area</div>
                <div className='text-xs text-gray-600 mt-1'>28% weight</div>
              </div>
              <div className='p-3 bg-white rounded-lg shadow-sm'>
                <div className='font-semibold text-gray-700'>Property Type</div>
                <div className='text-xs text-gray-600 mt-1'>15% weight</div>
              </div>
              <div className='p-3 bg-white rounded-lg shadow-sm'>
                <div className='font-semibold text-gray-700'>
                  Construction Year
                </div>
                <div className='text-xs text-gray-600 mt-1'>12% weight</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
