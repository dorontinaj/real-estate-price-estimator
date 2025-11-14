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
import { usePredictionStore } from '@/stores/prediction';

const belgianCities = [
  'Brussels',
  'Antwerp',
  'Ghent',
  'Charleroi',
  'Liège',
  'Bruges',
  'Namur',
  'Leuven',
  'Mons',
  'Aalst',
  'Mechelen',
  'La Louvière',
  'Kortrijk',
  'Hasselt',
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

  const canPredict =
    propertyData.location &&
    propertyData.propertyType &&
    propertyData.condition;

  return (
    <Card className='shadow-lg border-gray-200'>
      <CardHeader className='bg-blue-100 border-b-2 border-blue-200'>
        <CardTitle>Property Details</CardTitle>
        <CardDescription>
          Enter property characteristics for price estimation
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5 pt-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label
              htmlFor='surface'
              className='text-sm font-medium text-gray-700'
            >
              Surface Area (m²)
            </Label>
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
              className='mt-1.5'
            />
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
              className='mt-1.5'
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
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
              min='1'
              max='10'
              className='mt-1.5'
            />
          </div>
          <div>
            <Label
              htmlFor='constructionYear'
              className='text-sm font-medium text-gray-700'
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
              max='2025'
              className='mt-1.5'
            />
          </div>
        </div>

        <div>
          <Label
            htmlFor='location'
            className='text-sm font-medium text-gray-700'
          >
            Location
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
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor='propertyType'
            className='text-sm font-medium text-gray-700'
          >
            Property Type
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
            htmlFor='condition'
            className='text-sm font-medium text-gray-700'
          >
            Condition
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

        <div className='flex gap-4 pt-2'>
          <label className='flex items-center space-x-2 cursor-pointer group px-3 py-2 rounded-md hover:bg-blue-50 transition-colors'>
            <input
              type='checkbox'
              checked={propertyData.hasGarden}
              onChange={(e) => setPropertyData({ hasGarden: e.target.checked })}
              className='rounded border-2 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-2 w-4 h-4'
            />
            <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
              Has Garden
            </span>
          </label>
          <label className='flex items-center space-x-2 cursor-pointer group px-3 py-2 rounded-md hover:bg-blue-50 transition-colors'>
            <input
              type='checkbox'
              checked={propertyData.hasParking}
              onChange={(e) =>
                setPropertyData({ hasParking: e.target.checked })
              }
              className='rounded border-2 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-2 w-4 h-4'
            />
            <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
              Has Parking
            </span>
          </label>
        </div>

        <div className='flex gap-4 pt-6 border-t border-gray-200 mt-6'>
          <Button
            onClick={onPredict}
            disabled={isLoading || !canPredict}
            size='lg'
            className='flex-1 font-semibold text-base bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]'
          >
            {isLoading ? 'Calculating...' : '✨ Quick Estimate'}
          </Button>
          <Button
            onClick={onCompare}
            disabled={isLoading || !canPredict}
            variant='outline'
            size='lg'
            className='flex-1 font-semibold text-base border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]'
          >
            {isLoading ? 'Processing...' : '🔬 Compare Algorithms'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
