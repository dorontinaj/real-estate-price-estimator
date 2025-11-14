import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Info, Code, BookOpen, Lightbulb, Brain } from 'lucide-react';

export function MethodologyPage() {
  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <div className='p-3 bg-indigo-600 rounded-xl shadow-lg'>
            <Info className='h-8 w-8 text-white' />
          </div>
          <div className='text-left'>
            <h1 className='text-3xl font-bold text-gray-900'>Methodology</h1>
            <p className='text-sm text-gray-600'>
              Understanding our ML approach
            </p>
          </div>
        </div>
      </div>

      <Card className='shadow-lg border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Lightbulb className='h-5 w-5' />
            About This Application
          </CardTitle>
          <CardDescription>
            Advanced machine learning for real estate valuation
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-gray-700 leading-relaxed'>
            This application demonstrates advanced client-side machine learning
            for Belgian real estate price prediction. From traditional
            statistical methods to deep learning with TensorFlow.js, we provide
            accurate property valuations based on historical market data and key
            property characteristics.
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            <div className='p-3 bg-white rounded-lg shadow-sm'>
              <div className='text-xl font-bold text-blue-600'>2,500+</div>
              <div className='text-xs text-gray-600'>Training Samples</div>
            </div>
            <div className='p-3 bg-white rounded-lg shadow-sm'>
              <div className='text-xl font-bold text-green-600'>5</div>
              <div className='text-xs text-gray-600'>ML Algorithms</div>
            </div>
            <div className='p-3 bg-white rounded-lg shadow-sm'>
              <div className='text-xl font-bold text-purple-600'>14</div>
              <div className='text-xs text-gray-600'>Belgian Cities</div>
            </div>
            <div className='p-3 bg-white rounded-lg shadow-sm'>
              <div className='text-xl font-bold text-orange-600'>9</div>
              <div className='text-xs text-gray-600'>Features</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <Code className='h-5 w-5' />
              Linear Regression
            </CardTitle>
            <CardDescription>Fundamental statistical modeling</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-sm text-gray-700'>
              A fundamental algorithm that models the relationship between
              property features and price using a linear equation.
            </p>
            <div className='p-3 bg-gray-100 rounded-lg font-mono text-sm overflow-x-auto'>
              Price = β₀ + β₁×Surface + β₂×Rooms + β₃×Year + ... + ε
            </div>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold'>•</span>
                <span>Fast training and prediction time</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold'>•</span>
                <span>Highly interpretable coefficients</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold'>•</span>
                <span>Works well with linearly separable data</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <Code className='h-5 w-5' />
              Decision Trees
            </CardTitle>
            <CardDescription>Rule-based prediction</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-sm text-gray-700'>
              Creates a tree-like model of decisions based on property features,
              providing interpretable rules for price prediction.
            </p>
            <div className='p-3 bg-gray-100 rounded-lg text-sm'>
              Splits data into branches based on feature thresholds, creating a
              hierarchy of decision rules.
            </div>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li className='flex items-start gap-2'>
                <span className='text-green-600 font-bold'>•</span>
                <span>Handles non-linear relationships</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-600 font-bold'>•</span>
                <span>Easy to visualize and understand</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-600 font-bold'>•</span>
                <span>No feature scaling required</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <Code className='h-5 w-5' />
              k-Nearest Neighbors
            </CardTitle>
            <CardDescription>Instance-based learning</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-sm text-gray-700'>
              Predicts price based on the average of k most similar properties
              in the feature space.
            </p>
            <div className='p-3 bg-gray-100 rounded-lg text-sm'>
              Finds k properties with the most similar characteristics and
              averages their prices.
            </div>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li className='flex items-start gap-2'>
                <span className='text-purple-600 font-bold'>•</span>
                <span>No explicit training phase</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-purple-600 font-bold'>•</span>
                <span>Adapts to local patterns in data</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-purple-600 font-bold'>•</span>
                <span>Effective for complex boundaries</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <Code className='h-5 w-5' />
              Random Forest
            </CardTitle>
            <CardDescription>Ensemble method</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-sm text-gray-700'>
              Combines multiple decision trees to improve prediction accuracy
              and reduce overfitting.
            </p>
            <div className='p-3 bg-gray-100 rounded-lg text-sm'>
              Averages predictions from multiple trees trained on different
              subsets of data.
            </div>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li className='flex items-start gap-2'>
                <span className='text-orange-600 font-bold'>•</span>
                <span>Higher accuracy than single trees</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-600 font-bold'>•</span>
                <span>Reduces overfitting risk</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-600 font-bold'>•</span>
                <span>Provides feature importance scores</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className='shadow-lg border-pink-200 bg-linear-to-br from-pink-50 to-rose-50'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <Brain className='h-5 w-5' />
              Neural Network (TensorFlow.js)
            </CardTitle>
            <CardDescription>Deep learning with TensorFlow</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-sm text-gray-700'>
              A deep neural network powered by TensorFlow.js that learns complex
              non-linear patterns in the data through multiple hidden layers.
            </p>
            <div className='p-3 bg-linear-to-r from-pink-100 to-rose-100 rounded-lg text-sm font-mono'>
              Input(9) → Dense(64) → Dense(32) → Dense(16) → Output(1)
            </div>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li className='flex items-start gap-2'>
                <span className='text-pink-600 font-bold'>•</span>
                <span>Captures complex non-linear relationships</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-pink-600 font-bold'>•</span>
                <span>Dropout regularization prevents overfitting</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-pink-600 font-bold'>•</span>
                <span>Real-time training visualization with live updates</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-pink-600 font-bold'>•</span>
                <span>Z-score normalization for optimal convergence</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className='shadow-lg border-green-200 bg-linear-to-br from-green-50 to-emerald-50'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <BookOpen className='h-5 w-5' />
            Implementation Details
          </CardTitle>
          <CardDescription>Technical architecture and features</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className='space-y-3 text-sm text-gray-700'>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 font-bold text-lg'>✓</span>
              <div>
                <strong>Client-Side ML:</strong> All algorithms run entirely in
                the browser - both custom TypeScript implementations and
                TensorFlow.js
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 font-bold text-lg'>✓</span>
              <div>
                <strong>Deep Learning with TensorFlow.js:</strong> 4-layer
                neural network with 64, 32, and 16 neurons trained with Adam
                optimizer and dropout regularization
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 font-bold text-lg'>✓</span>
              <div>
                <strong>Real-Time Predictions:</strong> Instant results with
                performance metrics, interactive sliders, and live training
                visualization
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 font-bold text-lg'>✓</span>
              <div>
                <strong>Feature Engineering:</strong> Location encoding,
                property age calculation, categorical transformations, and
                Z-score normalization
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 font-bold text-lg'>✓</span>
              <div>
                <strong>Data-Driven:</strong> Trained on 2,500+ Belgian real
                estate transactions from 2020-2024 across 14 cities
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 font-bold text-lg'>✓</span>
              <div>
                <strong>Modern Stack:</strong> Built with React 19, TypeScript,
                TanStack Router & Query, Zustand, TensorFlow.js, and TailwindCSS
                4
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
