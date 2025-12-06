import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MapPin, Home, Calendar } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const priceByCity = [
  { city: 'Brussels', avgPrice: 567500, count: 1250 },
  { city: 'Antwerp', avgPrice: 450000, count: 980 },
  { city: 'Ghent', avgPrice: 261667, count: 750 },
  { city: 'Bruges', avgPrice: 550000, count: 420 },
  { city: 'Leuven', avgPrice: 250000, count: 650 },
  { city: 'Liège', avgPrice: 165000, count: 890 },
  { city: 'Namur', avgPrice: 275000, count: 340 },
  { city: 'Charleroi', avgPrice: 220000, count: 560 },
];

const priceByType = [
  { type: 'Studio', avgPrice: 180000, avgSize: 35 },
  { type: 'Apartment', avgPrice: 320000, avgSize: 85 },
  { type: 'House', avgPrice: 420000, avgSize: 140 },
  { type: 'Townhouse', avgPrice: 380000, avgSize: 120 },
  { type: 'Villa', avgPrice: 650000, avgSize: 220 },
];

const priceByYear = [
  { year: '1950-1970', avgPrice: 280000, efficiency: 'Low' },
  { year: '1970-1990', avgPrice: 320000, efficiency: 'Medium' },
  { year: '1990-2010', avgPrice: 380000, efficiency: 'Good' },
  { year: '2010-2024', avgPrice: 450000, efficiency: 'High' },
];

export function InsightsPage() {
  const maxPrice = Math.max(...priceByCity.map((item) => item.avgPrice));

  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <div className='flex items-center justify-center gap-2 sm:gap-3 mb-4'>
          <div className='p-2 sm:p-3 bg-purple-600 rounded-xl shadow-lg'>
            <TrendingUp className='h-6 w-6 sm:h-8 sm:w-8 text-white' />
          </div>
          <div className='text-left'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900'>
              Market Insights
            </h1>
            <p className='text-xs sm:text-sm text-gray-600'>
              Belgian real estate market analysis
            </p>
          </div>
        </div>
      </div>

      <Card className='shadow-lg border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <TrendingUp className='h-5 w-5' />
            Market Overview
          </CardTitle>
          <CardDescription>
            Data insights from our training dataset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'>
            <div className='text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm'>
              <div className='text-lg sm:text-2xl font-bold text-blue-600'>
                €385K
              </div>
              <div className='text-xs sm:text-sm text-blue-800 mt-1'>
                Average Price
              </div>
            </div>
            <div className='text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm'>
              <div className='text-lg sm:text-2xl font-bold text-green-600'>
                119m²
              </div>
              <div className='text-xs sm:text-sm text-green-800 mt-1'>
                Average Size
              </div>
            </div>
            <div className='text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm'>
              <div className='text-lg sm:text-2xl font-bold text-purple-600'>
                2,500
              </div>
              <div className='text-xs sm:text-sm text-purple-800 mt-1'>
                Properties Analyzed
              </div>
            </div>
            <div className='text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm'>
              <div className='text-lg sm:text-2xl font-bold text-orange-600'>
                14
              </div>
              <div className='text-xs sm:text-sm text-orange-800 mt-1'>
                Cities Covered
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='shadow-lg'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <MapPin className='h-5 w-5' />
            Average Prices by City
          </CardTitle>
          <CardDescription>
            Property price distribution across major Belgian cities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {priceByCity.map((item, index) => (
              <div
                key={index}
                className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'
              >
                <div className='w-full sm:w-24 text-xs sm:text-sm font-medium text-gray-700'>
                  {item.city}
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 sm:gap-3 mb-1'>
                    <div className='flex-1 bg-gray-200 rounded-full h-7 overflow-hidden'>
                      <div
                        className='bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end pr-2'
                        style={{
                          width: `${(item.avgPrice / maxPrice) * 100}%`,
                        }}
                      >
                        <span className='text-xs font-semibold text-white'>
                          {formatCurrency(item.avgPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='text-xs text-gray-500'>
                    {item.count.toLocaleString()} properties
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Home className='h-5 w-5' />
              Price by Property Type
            </CardTitle>
            <CardDescription>
              Average prices and sizes by property category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {priceByType.map((item, index) => (
                <div
                  key={index}
                  className='p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200'
                >
                  <div className='flex justify-between items-center mb-2'>
                    <span className='font-medium text-gray-900'>
                      {item.type}
                    </span>
                    <Badge variant='outline' className='bg-white font-semibold'>
                      {formatCurrency(item.avgPrice)}
                    </Badge>
                  </div>
                  <div className='text-sm text-gray-600'>
                    Average size: {item.avgSize}m² •{' '}
                    {formatCurrency(Math.round(item.avgPrice / item.avgSize))}
                    /m²
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Calendar className='h-5 w-5' />
              Price by Construction Period
            </CardTitle>
            <CardDescription>
              How construction year affects property value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {priceByYear.map((item, index) => (
                <div
                  key={index}
                  className='p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg border border-gray-200'
                >
                  <div className='flex justify-between items-center mb-2'>
                    <span className='font-medium text-gray-900'>
                      {item.year}
                    </span>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='outline'
                        className={
                          item.efficiency === 'High'
                            ? 'bg-green-50 text-green-700 border-green-300'
                            : item.efficiency === 'Good'
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : item.efficiency === 'Medium'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-300'
                                : 'bg-red-50 text-red-700 border-red-300'
                        }
                      >
                        {item.efficiency} Efficiency
                      </Badge>
                    </div>
                  </div>
                  <div className='text-sm font-semibold text-gray-900'>
                    {formatCurrency(item.avgPrice)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='shadow-lg'>
        <CardHeader>
          <CardTitle>Feature Importance Analysis</CardTitle>
          <CardDescription>
            Which property characteristics have the most impact on price
            prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[
              {
                feature: 'Location (City)',
                importance: 0.35,
                description:
                  'Geographic location is the strongest price predictor',
              },
              {
                feature: 'Surface Area',
                importance: 0.28,
                description: 'Property size directly correlates with value',
              },
              {
                feature: 'Property Type',
                importance: 0.15,
                description: 'House vs apartment significantly affects pricing',
              },
              {
                feature: 'Construction Year',
                importance: 0.12,
                description: 'Newer properties command premium prices',
              },
              {
                feature: 'Number of Rooms',
                importance: 0.08,
                description: 'Room count influences family appeal',
              },
              {
                feature: 'Condition',
                importance: 0.02,
                description: 'Property condition has moderate impact',
              },
            ].map((item, index) => (
              <div key={index} className='flex items-center gap-4'>
                <div className='w-36 text-sm font-medium text-gray-700'>
                  {item.feature}
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-1'>
                    <div className='flex-1 bg-gray-200 rounded-full h-6 overflow-hidden'>
                      <div
                        className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full rounded-full flex items-center justify-end pr-2'
                        style={{ width: `${item.importance * 100}%` }}
                      >
                        <span className='text-xs font-semibold text-white'>
                          {Math.round(item.importance * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='text-xs text-gray-600'>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
