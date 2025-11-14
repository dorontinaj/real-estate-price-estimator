import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Zap } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { NeuralNetworkModel } from '@/lib/neural-network-model';

const belgianCities = [
  'Brussels',
  'Antwerp',
  'Ghent',
  'Bruges',
  'Leuven',
  'Liège',
  'Charleroi',
  'Namur',
];

let modelInstance: NeuralNetworkModel | null = null;

export function NeuralNetworkEstimator() {
  const [surface, setSurface] = useState(100);
  const [rooms, setRooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(1);
  const [constructionYear, setConstructionYear] = useState(2000);
  const [location, setLocation] = useState('Brussels');
  const [hasGarden, setHasGarden] = useState(false);
  const [hasParking, setHasParking] = useState(true);

  const [prediction, setPrediction] = useState<number | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingLoss, setTrainingLoss] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize and train model
  useEffect(() => {
    if (!modelInstance) {
      const trainModel = async () => {
        setIsTraining(true);
        try {
          const model = new NeuralNetworkModel();
          await model.train((epoch, loss) => {
            setTrainingProgress(epoch + 1);
            setTrainingLoss(loss);
          });
          modelInstance = model;
          setIsReady(true);
          console.log('Neural Network ready!');
        } catch (error) {
          console.error('Failed to train neural network:', error);
        } finally {
          setIsTraining(false);
        }
      };
      trainModel();
    } else {
      setIsReady(true);
    }
  }, []);

  // Live prediction update
  const updatePrediction = useCallback(() => {
    if (!isReady || !modelInstance) return;

    try {
      const price = modelInstance.predict({
        surface,
        rooms,
        bathrooms,
        constructionYear,
        location,
        propertyType: 'house',
        condition: 'good',
        hasGarden,
        hasParking,
      });
      setPrediction(price);
    } catch (error) {
      console.error('Prediction error:', error);
    }
  }, [
    surface,
    rooms,
    bathrooms,
    constructionYear,
    location,
    hasGarden,
    hasParking,
    isReady,
  ]);

  // Update prediction whenever inputs change
  useEffect(() => {
    if (isReady) {
      updatePrediction();
    }
  }, [updatePrediction, isReady]);

  if (isTraining) {
    return (
      <div className='space-y-6'>
        <Card className='shadow-lg border-2 border-purple-300 bg-purple-100'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Brain className='h-6 w-6 text-purple-600 animate-pulse' />
              Training Neural Network
            </CardTitle>
            <CardDescription>
              Deep learning model is learning from 2,500+ properties...
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <div className='flex justify-between text-sm mb-2'>
                <span className='text-gray-700'>
                  Epoch {trainingProgress}/30
                </span>
                <span className='text-gray-700'>
                  Loss:{' '}
                  {trainingLoss ? trainingLoss.toFixed(4) : 'Computing...'}
                </span>
              </div>
              <Progress value={(trainingProgress / 30) * 100} className='h-3' />
            </div>
            <div className='p-4 bg-white rounded-lg border border-purple-200'>
              <p className='text-sm text-gray-700'>
                🧠 Building 4-layer neural network with 64 → 32 → 16 → 1 neurons
                <br />
                🔄 Using optimized Adam optimizer (0.003 LR) for faster
                convergence
                <br />
                📊 Training with larger batches (64) for better speed
                <br />⚡ Optimized for 3x faster training without accuracy loss
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <div className='p-3 bg-purple-600 rounded-xl shadow-lg'>
            <Brain className='h-8 w-8 text-white' />
          </div>
          <div className='text-left'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Neural Network Estimator
            </h1>
            <p className='text-sm text-gray-600'>
              Deep learning with TensorFlow.js
            </p>
          </div>
        </div>
        <div className='flex justify-center gap-2 flex-wrap'>
          <Badge
            variant='secondary'
            className='bg-purple-200 text-purple-900 border-2 border-purple-400'
          >
            TensorFlow.js
          </Badge>
          <Badge
            variant='secondary'
            className='bg-pink-200 text-pink-900 border-2 border-pink-400'
          >
            4-Layer Network
          </Badge>
          <Badge
            variant='secondary'
            className='bg-blue-200 text-blue-900 border-2 border-blue-400'
          >
            Live Prediction
          </Badge>
          <Badge
            variant='secondary'
            className='bg-green-200 text-green-900 border-2 border-green-400'
          >
            Optimized Training
          </Badge>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Interactive Sliders */}
        <Card className='shadow-lg border-2 border-purple-200'>
          <CardHeader className='bg-purple-100 border-b-2 border-purple-200'>
            <CardTitle>Property Features</CardTitle>
            <CardDescription>
              Adjust sliders to see live price predictions
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6 pt-6'>
            {/* Surface */}
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Label className='text-sm font-medium text-gray-700'>
                  Surface Area
                </Label>
                <span className='text-sm font-semibold text-purple-600'>
                  {surface} m²
                </span>
              </div>
              <Slider
                value={[surface]}
                onValueChange={(v) => setSurface(v[0])}
                min={30}
                max={400}
                step={5}
                className='cursor-pointer'
              />
            </div>

            {/* Rooms */}
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Label className='text-sm font-medium text-gray-700'>
                  Number of Rooms
                </Label>
                <span className='text-sm font-semibold text-purple-600'>
                  {rooms}
                </span>
              </div>
              <Slider
                value={[rooms]}
                onValueChange={(v) => setRooms(v[0])}
                min={1}
                max={8}
                step={1}
                className='cursor-pointer'
              />
            </div>

            {/* Bathrooms */}
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Label className='text-sm font-medium text-gray-700'>
                  Bathrooms
                </Label>
                <span className='text-sm font-semibold text-purple-600'>
                  {bathrooms}
                </span>
              </div>
              <Slider
                value={[bathrooms]}
                onValueChange={(v) => setBathrooms(v[0])}
                min={1}
                max={5}
                step={1}
                className='cursor-pointer'
              />
            </div>

            {/* Construction Year */}
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Label className='text-sm font-medium text-gray-700'>
                  Construction Year
                </Label>
                <span className='text-sm font-semibold text-purple-600'>
                  {constructionYear}
                </span>
              </div>
              <Slider
                value={[constructionYear]}
                onValueChange={(v) => setConstructionYear(v[0])}
                min={1950}
                max={2025}
                step={1}
                className='cursor-pointer'
              />
            </div>

            {/* Location Buttons */}
            <div className='space-y-2'>
              <Label className='text-sm font-medium text-gray-700'>
                Location
              </Label>
              <div className='grid grid-cols-4 gap-2'>
                {belgianCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setLocation(city)}
                    className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                      location === city
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className='flex gap-4 pt-2'>
              <label className='flex items-center space-x-2 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={hasGarden}
                  onChange={(e) => setHasGarden(e.target.checked)}
                  className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
                />
                <span className='text-sm text-gray-700 group-hover:text-gray-900'>
                  Has Garden
                </span>
              </label>
              <label className='flex items-center space-x-2 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={hasParking}
                  onChange={(e) => setHasParking(e.target.checked)}
                  className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
                />
                <span className='text-sm text-gray-700 group-hover:text-gray-900'>
                  Has Parking
                </span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Live Prediction Display */}
        <div className='space-y-6'>
          <Card className='shadow-lg border-2 border-purple-300 bg-purple-100'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-purple-900'>
                <TrendingUp className='h-5 w-5' />
                Neural Network Prediction
              </CardTitle>
              <CardDescription className='text-purple-800'>
                Live updated as you adjust parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              {prediction && (
                <div className='text-center'>
                  <div className='text-5xl font-bold text-purple-900 mb-3 animate-pulse'>
                    {formatCurrency(prediction)}
                  </div>
                  <div className='flex items-center justify-center gap-2 text-sm text-purple-800'>
                    <Zap className='h-4 w-4' />
                    <span>Real-time deep learning inference</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle className='text-base'>Network Architecture</CardTitle>
              <CardDescription>4-layer deep neural network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-20 text-xs font-medium text-gray-700'>
                    Input
                  </div>
                  <div className='flex-1 bg-blue-500 h-8 rounded flex items-center justify-center text-white text-xs font-semibold shadow-md'>
                    9 features
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-20 text-xs font-medium text-gray-700'>
                    Layer 1
                  </div>
                  <div className='flex-1 bg-purple-500 h-10 rounded flex items-center justify-center text-white text-xs font-semibold shadow-md'>
                    64 neurons + ReLU + Dropout
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-20 text-xs font-medium text-gray-700'>
                    Layer 2
                  </div>
                  <div className='flex-1 bg-pink-500 h-9 rounded flex items-center justify-center text-white text-xs font-semibold shadow-md'>
                    32 neurons + ReLU + Dropout
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-20 text-xs font-medium text-gray-700'>
                    Layer 3
                  </div>
                  <div className='flex-1 bg-orange-500 h-8 rounded flex items-center justify-center text-white text-xs font-semibold shadow-md'>
                    16 neurons + ReLU
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-20 text-xs font-medium text-gray-700'>
                    Output
                  </div>
                  <div className='flex-1 bg-green-500 h-7 rounded flex items-center justify-center text-white text-xs font-semibold shadow-md'>
                    1 neuron (price)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-lg border-2 border-blue-300 bg-blue-100'>
            <CardHeader>
              <CardTitle className='text-base'>Why Neural Networks?</CardTitle>
            </CardHeader>
            <CardContent className='text-sm text-gray-700 space-y-2'>
              <p>
                🧠 <strong>Non-linear patterns:</strong> Captures complex
                relationships between features
              </p>
              <p>
                🎯 <strong>Feature interactions:</strong> Automatically learns
                which combinations matter
              </p>
              <p>
                📊 <strong>Dropout regularization:</strong> Prevents overfitting
                for better generalization
              </p>
              <p>
                ⚡ <strong>Adam optimizer:</strong> Adaptive learning rates for
                faster convergence
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
