import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Sparkles } from 'lucide-react';
import { usePredictionStore } from '@/stores/prediction';

const belgianCities = [
  { name: 'Brussels', postalCode: '1000' },
  { name: 'Antwerp', postalCode: '2000' },
  { name: 'Ghent', postalCode: '9000' },
  { name: 'Charleroi', postalCode: '6000' },
  { name: 'Liège', postalCode: '4000' },
  { name: 'Bruges', postalCode: '8000' },
  { name: 'Namur', postalCode: '5000' },
  { name: 'Leuven', postalCode: '3000' },
  { name: 'Mons', postalCode: '7000' },
  { name: 'Aalst', postalCode: '9300' },
  { name: 'Mechelen', postalCode: '2800' },
  { name: 'La Louvière', postalCode: '7100' },
  { name: 'Kortrijk', postalCode: '8500' },
  { name: 'Hasselt', postalCode: '3500' },
];

interface PropertyFormProps {
  onPredict: () => void;
  onCompare: () => void;
  isLoading: boolean;
}

export function PropertyForm({
  onPredict,
  onCompare,
  isLoading,
}: PropertyFormProps) {
  const { propertyData, setPropertyData } = usePredictionStore();

  // Validation checks
  const isSurfaceValid =
    propertyData.surface >= 20 && propertyData.surface <= 1000;
  const isRoomsValid = propertyData.rooms >= 1 && propertyData.rooms <= 20;
  const isBathroomsValid =
    propertyData.bathrooms >= 0 && propertyData.bathrooms <= 8;
  const isConstructionYearValid =
    propertyData.constructionYear >= 1800 &&
    propertyData.constructionYear <= new Date().getFullYear();

  const isNumericDataValid =
    isSurfaceValid &&
    isRoomsValid &&
    isBathroomsValid &&
    isConstructionYearValid;

  const canPredict =
    propertyData.location &&
    propertyData.propertyType &&
    propertyData.condition &&
    isNumericDataValid;

  return (
    <Card className='shadow-lg border-border'>
      <CardHeader className='bg-primary/10 dark:bg-primary/20 border-b-2 border-primary/20'>
        <CardTitle>Property Details</CardTitle>
        <CardDescription>
          Enter property characteristics for price estimation
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5 pt-6'>
        <div>
          <Label
            htmlFor='propertyType'
            className='text-sm font-medium text-foreground'
          >
            Property Type <span className='text-red-500 dark:text-red-400'>*</span>
          </Label>
          <Select
            onValueChange={(value) => setPropertyData({ propertyType: value })}
            value={propertyData.propertyType}
          >
            <SelectTrigger className='mt-1.5'>
              <SelectValue placeholder='Select property type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='apartment'>Apartment</SelectItem>
              <SelectItem value='house'>House</SelectItem>
              <SelectItem value='villa'>Villa</SelectItem>
              <SelectItem value='townhouse'>Townhouse</SelectItem>
              <SelectItem value='studio'>Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor='location'
            className='text-sm font-medium text-foreground'
          >
            Location <span className='text-red-500 dark:text-red-400'>*</span>
          </Label>
          <Select
            onValueChange={(value) => setPropertyData({ location: value })}
            value={propertyData.location}
          >
            <SelectTrigger className='mt-1.5'>
              <SelectValue placeholder='Select a Belgian city' />
            </SelectTrigger>
            <SelectContent>
              {belgianCities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  <span className='flex items-center justify-between w-full'>
                    <span>{city.name}</span>
                    <span className='text-xs text-muted-foreground ml-2'>
                      {city.postalCode}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <Label
              htmlFor='surface'
              className='text-sm font-medium text-foreground'
            >
              Surface Area
            </Label>
            <div className='relative mt-1.5'>
              <Input
                id='surface'
                type='number'
                value={propertyData.surface}
                onChange={(e) =>
                  setPropertyData({
                    surface: Number.parseInt(e.target.value) || 0,
                  })
                }
                min='20'
                max='1000'
                className={`pr-10 ${
                  propertyData.surface > 0 && !isSurfaceValid
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : ''
                }`}
              />
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none'>
                m²
              </span>
            </div>
            {propertyData.surface > 0 && !isSurfaceValid && (
              <p className='text-xs text-red-600 dark:text-red-400 mt-1'>
                Surface area must be between 20 and 1,000 m²
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor='constructionYear'
              className='text-sm font-medium text-foreground'
            >
              Construction Year
            </Label>
            <Input
              id='constructionYear'
              type='number'
              value={propertyData.constructionYear}
              onChange={(e) =>
                setPropertyData({
                  constructionYear: Number.parseInt(e.target.value) || 0,
                })
              }
              min='1800'
              max={new Date().getFullYear()}
              className={`mt-1.5 ${
                propertyData.constructionYear > 0 && !isConstructionYearValid
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : ''
              }`}
            />
            {propertyData.constructionYear > 0 && !isConstructionYearValid && (
              <p className='text-xs text-red-600 dark:text-red-400 mt-1'>
                Year must be between 1800 and {new Date().getFullYear()}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor='rooms'
              className='text-sm font-medium text-gray-700'
            >
              Number of Rooms
            </Label>
            <Input
              id='rooms'
              type='number'
              value={propertyData.rooms}
              onChange={(e) =>
                setPropertyData({ rooms: Number.parseInt(e.target.value) || 0 })
              }
              min='1'
              max='20'
              className={`mt-1.5 ${
                propertyData.rooms > 0 && !isRoomsValid
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : ''
              }`}
            />
            {propertyData.rooms > 0 && !isRoomsValid && (
              <p className='text-xs text-red-600 mt-1'>
                Rooms must be between 1 and 20
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor='bathrooms'
              className='text-sm font-medium text-gray-700'
            >
              Bathrooms
            </Label>
            <Input
              id='bathrooms'
              type='number'
              value={propertyData.bathrooms}
              onChange={(e) =>
                setPropertyData({
                  bathrooms: Number.parseInt(e.target.value) || 0,
                })
              }
              min='0'
              max='8'
              className={`mt-1.5 ${
                !isBathroomsValid
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : ''
              }`}
            />
            {!isBathroomsValid && (
              <p className='text-xs text-red-600 mt-1'>
                Bathrooms must be between 0 and 8
              </p>
            )}
          </div>
        </div>
        <div>
          <Label
            htmlFor='condition'
            className='text-sm font-medium text-gray-700'
          >
            Condition <span className='text-red-500'>*</span>
          </Label>
          <Select
            onValueChange={(value) => setPropertyData({ condition: value })}
            value={propertyData.condition}
          >
            <SelectTrigger className='mt-1.5'>
              <SelectValue placeholder='Select condition' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='excellent'>Excellent</SelectItem>
              <SelectItem value='good'>Good</SelectItem>
              <SelectItem value='fair'>Fair</SelectItem>
              <SelectItem value='needs_renovation'>Needs Renovation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional fields based on property type */}
        {propertyData.propertyType === 'apartment' ||
        propertyData.propertyType === 'studio' ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <Label
                  htmlFor='floor'
                  className='text-sm font-medium text-gray-700'
                >
                  Floor Number
                </Label>
                <Input
                  id='floor'
                  type='number'
                  value={propertyData.floor || 0}
                  onChange={(e) =>
                    setPropertyData({
                      floor: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  min='0'
                  max='50'
                  className='mt-1.5'
                />
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2'>
              <label className='flex items-center space-x-2 cursor-pointer group px-3 py-2 rounded-md hover:bg-blue-50 transition-colors'>
                <input
                  type='checkbox'
                  checked={propertyData.hasTerrace || false}
                  onChange={(e) =>
                    setPropertyData({ hasTerrace: e.target.checked })
                  }
                  className='rounded border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2 w-4 h-4 accent-indigo-600'
                />
                <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                  Has Terrace
                </span>
              </label>
              <label className='flex items-center space-x-2 cursor-pointer group px-3 py-2 rounded-md hover:bg-blue-50 transition-colors'>
                <input
                  type='checkbox'
                  checked={propertyData.hasParking}
                  onChange={(e) =>
                    setPropertyData({ hasParking: e.target.checked })
                  }
                  className='rounded border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2 w-4 h-4 accent-indigo-600'
                />
                <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                  Has Parking
                </span>
              </label>
            </div>
          </>
        ) : propertyData.propertyType === 'house' ||
          propertyData.propertyType === 'villa' ||
          propertyData.propertyType === 'townhouse' ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <Label
                  htmlFor='floors'
                  className='text-sm font-medium text-gray-700'
                >
                  Number of Floors
                </Label>
                <Input
                  id='floors'
                  type='number'
                  value={propertyData.floors || 1}
                  onChange={(e) =>
                    setPropertyData({
                      floors: Number.parseInt(e.target.value) || 1,
                    })
                  }
                  min='1'
                  max='10'
                  className='mt-1.5'
                />
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2'>
              <label className='flex items-center space-x-2 cursor-pointer group px-3 py-2 rounded-md hover:bg-blue-50 transition-colors'>
                <input
                  type='checkbox'
                  checked={propertyData.hasGarden}
                  onChange={(e) =>
                    setPropertyData({ hasGarden: e.target.checked })
                  }
                  className='rounded border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2 w-4 h-4 accent-indigo-600'
                />
                <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                  Has Garden
                </span>
              </label>
              <label className='flex items-center space-x-2 cursor-pointer group px-3 py-2 rounded-md hover:bg-blue-50 transition-colors'>
                <input
                  type='checkbox'
                  checked={propertyData.hasGarage || false}
                  onChange={(e) =>
                    setPropertyData({ hasGarage: e.target.checked })
                  }
                  className='rounded border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2 w-4 h-4 accent-indigo-600'
                />
                <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                  Has Garage
                </span>
              </label>
              <label className='flex items-center space-x-2 cursor-pointer group px-3 py-2 rounded-md hover:bg-blue-50 transition-colors'>
                <input
                  type='checkbox'
                  checked={propertyData.hasParking}
                  onChange={(e) =>
                    setPropertyData({ hasParking: e.target.checked })
                  }
                  className='rounded border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2 w-4 h-4 accent-indigo-600'
                />
                <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                  Has Parking
                </span>
              </label>
            </div>
          </>
        ) : null}

        {!canPredict && (
          <Alert className='border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50'>
            <Info className='h-4 w-4 text-blue-600 dark:text-blue-400' />
            <AlertDescription className='text-sm text-foreground'>
              <span className='font-semibold text-blue-900 dark:text-blue-300'>
                Fill in all required fields to enable Quick Estimate
              </span>
              <br />
              Please select: <span className='font-medium'>Location</span>,{' '}
              <span className='font-medium'>Property Type</span>, and{' '}
              <span className='font-medium'>Condition</span> to continue.
            </AlertDescription>
          </Alert>
        )}

        {canPredict && !isLoading && (
          <Alert className='border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-950/50 dark:to-emerald-950/50'>
            <Sparkles className='h-4 w-4 text-green-600 dark:text-green-400' />
            <AlertDescription className='text-sm text-foreground'>
              <span className='font-semibold text-green-900 dark:text-green-300'>
                Ready to estimate!
              </span>{' '}
              Click <span className='font-semibold'>Quick Estimate</span> to see
              your property's estimated value, or{' '}
              <span className='font-semibold'>Compare Algorithms</span> to
              analyze predictions from multiple ML models.
            </AlertDescription>
          </Alert>
        )}

        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-gray-200 mt-6'>
          <Button
            onClick={onPredict}
            disabled={isLoading || !canPredict}
            size='lg'
            className='flex-1 font-semibold text-sm sm:text-base bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            {isLoading ? 'Calculating...' : '✨ Quick Estimate'}
          </Button>
          <Button
            onClick={onCompare}
            disabled={isLoading || !canPredict}
            variant='outline'
            size='lg'
            className='flex-1 font-semibold text-sm sm:text-base border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            {isLoading ? 'Processing...' : '🔬 Compare Algorithms'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
