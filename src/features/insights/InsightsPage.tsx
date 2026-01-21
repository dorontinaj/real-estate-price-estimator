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
          <div className='p-2 sm:p-3 bg-purple-600 dark:bg-purple-500 rounded-xl shadow-lg'>
            <TrendingUp className='h-6 w-6 sm:h-8 sm:w-8 text-white' />
          </div>
          <div className='text-left'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-foreground'>
              Market Insights
            </h1>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              Belgian real estate market analysis
            </p>
          </div>
        </div>
      </div>

      <Card className='shadow-lg border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5'>
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
            <div className='text-center p-3 sm:p-4 bg-background dark:bg-card rounded-lg shadow-sm'>
              <div className='text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400'>
                €385K
              </div>
              <div className='text-xs sm:text-sm text-blue-800 dark:text-blue-300 mt-1'>
                Average Price
              </div>
            </div>
            <div className='text-center p-3 sm:p-4 bg-background dark:bg-card rounded-lg shadow-sm'>
              <div className='text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400'>
                119m²
              </div>
              <div className='text-xs sm:text-sm text-green-800 dark:text-green-300 mt-1'>
                Average Size
              </div>
            </div>
            <div className='text-center p-3 sm:p-4 bg-background dark:bg-card rounded-lg shadow-sm'>
              <div className='text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400'>
                2,500
              </div>
              <div className='text-xs sm:text-sm text-purple-800 dark:text-purple-300 mt-1'>
                Properties Analyzed
              </div>
            </div>
            <div className='text-center p-3 sm:p-4 bg-background dark:bg-card rounded-lg shadow-sm'>
              <div className='text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400'>
                14
              </div>
              <div className='text-xs sm:text-sm text-orange-800 dark:text-orange-300 mt-1'>
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
                <div className='w-full sm:w-24 text-xs sm:text-sm font-medium text-foreground'>
                  {item.city}
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 sm:gap-3 mb-1'>
                    <div className='flex-1 bg-muted rounded-full h-7 overflow-hidden'>
                      <div
                        className='bg-gradient-to-r from-primary to-primary/80 h-full rounded-full flex items-center justify-end pr-2'
                        style={{
                          width: `${(item.avgPrice / maxPrice) * 100}%`,
                        }}
                      >
                        <span className='text-xs font-semibold text-primary-foreground'>
                          {formatCurrency(item.avgPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='text-xs text-muted-foreground'>
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
                  className='p-4 bg-gradient-to-r from-muted/50 to-primary/5 dark:from-muted/30 dark:to-primary/10 rounded-lg border border-border'
                >
                  <div className='flex justify-between items-center mb-2'>
                    <span className='font-medium text-foreground'>
                      {item.type}
                    </span>
                    <Badge variant='outline' className='bg-background font-semibold'>
                      {formatCurrency(item.avgPrice)}
                    </Badge>
                  </div>
                  <div className='text-sm text-muted-foreground'>
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
                  className='p-4 bg-gradient-to-r from-muted/50 to-green-50/50 dark:from-muted/30 dark:to-green-950/30 rounded-lg border border-border'
                >
                  <div className='flex justify-between items-center mb-2'>
                    <span className='font-medium text-foreground'>
                      {item.year}
                    </span>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='outline'
                        className={
                          item.efficiency === 'High'
                            ? 'bg-green-50 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-700'
                            : item.efficiency === 'Good'
                              ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-700'
                              : item.efficiency === 'Medium'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-700'
                                : 'bg-red-50 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-300 dark:border-red-700'
                        }
                      >
                        {item.efficiency} Efficiency
                      </Badge>
                    </div>
                  </div>
                  <div className='text-sm font-semibold text-foreground'>
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
            {[{
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
                <div className='w-36 text-sm font-medium text-foreground'>
                  {item.feature}
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-1'>
                    <div className='flex-1 bg-muted rounded-full h-6 overflow-hidden'>
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
                  <div className='text-xs text-muted-foreground'>
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
