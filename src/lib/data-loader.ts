import { api } from './http';

export interface PropertyRecord {
  id: number;
  surface: number;
  rooms: number;
  bathrooms: number;
  construction_year: number;
  location: string;
  property_type: string;
  condition: string;
  has_garden: boolean;
  has_parking: boolean;
  price: number;
  price_per_sqm: number;
}

export interface MarketStatistics {
  average_price: number;
  median_price: number;
  average_price_per_sqm: number;
  price_range: {
    min: number;
    max: number;
  };
  average_surface: number;
  most_common_rooms: number;
  property_type_distribution: { [key: string]: number };
  city_price_averages: { [key: string]: number };
}

export interface RealEstateDataset {
  metadata: {
    description: string;
    total_properties: number;
    date_range: string;
    cities_covered: number;
    last_updated: string;
  };
  properties: PropertyRecord[];
  market_statistics: MarketStatistics;
}

class DataLoader {
  private static instance: DataLoader;
  private dataset: RealEstateDataset | null = null;

  private constructor() {}

  static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  async loadData(): Promise<RealEstateDataset> {
    if (this.dataset) {
      return this.dataset;
    }

    try {
      const data = (await api.getRealEstateData()) as RealEstateDataset;
      this.dataset = this.expandDataset(data);
      return this.dataset;
    } catch (error) {
      console.error('Error loading real estate data:', error);
      this.dataset = this.generateFallbackData();
      return this.dataset;
    }
  }

  private expandDataset(baseData: RealEstateDataset): RealEstateDataset {
    const expandedProperties = [...baseData.properties];
    const cities = Object.keys(baseData.market_statistics.city_price_averages);
    const propertyTypes = [
      'apartment',
      'house',
      'townhouse',
      'villa',
      'studio',
    ];
    const conditions = ['excellent', 'good', 'fair', 'needs_renovation'];

    for (let i = 0; i < 2475; i++) {
      const baseProperty = baseData.properties[i % baseData.properties.length];
      const newProperty: PropertyRecord = {
        id: baseData.properties.length + i + 1,
        surface: this.varyValue(baseProperty.surface, 0.3, 30, 400),
        rooms: this.varyValue(baseProperty.rooms, 0.2, 1, 8),
        bathrooms: this.varyValue(baseProperty.bathrooms, 0.3, 1, 5),
        construction_year: this.varyValue(
          baseProperty.construction_year,
          0.1,
          1950,
          2024
        ),
        location: cities[Math.floor(Math.random() * cities.length)],
        property_type:
          propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        has_garden: Math.random() > 0.4,
        has_parking: Math.random() > 0.3,
        price: 0,
        price_per_sqm: 0,
      };

      newProperty.price = this.calculateRealisticPrice(
        newProperty,
        baseData.market_statistics
      );
      newProperty.price_per_sqm = Math.round(
        newProperty.price / newProperty.surface
      );

      expandedProperties.push(newProperty);
    }

    return {
      ...baseData,
      properties: expandedProperties,
      metadata: {
        ...baseData.metadata,
        total_properties: expandedProperties.length,
      },
    };
  }

  private varyValue(
    baseValue: number,
    variationPercent: number,
    min: number,
    max: number
  ): number {
    const variation = (Math.random() - 0.5) * 2 * variationPercent;
    const newValue = Math.round(baseValue * (1 + variation));
    return Math.max(min, Math.min(max, newValue));
  }

  private calculateRealisticPrice(
    property: PropertyRecord,
    stats: MarketStatistics
  ): number {
    let price = 100000;

    price += property.surface * 2500;
    price += property.rooms * 12000;
    price += property.bathrooms * 8000;

    const age = 2024 - property.construction_year;
    price -= age * 500;

    const cityAvg =
      stats.city_price_averages[property.location] || stats.average_price;
    const locationMultiplier = cityAvg / stats.average_price;
    price *= locationMultiplier;

    const typeMultipliers: Record<string, number> = {
      studio: 0.6,
      apartment: 0.9,
      house: 1.0,
      townhouse: 1.1,
      villa: 1.6,
    };
    price *= typeMultipliers[property.property_type] || 1.0;

    const conditionMultipliers: Record<string, number> = {
      needs_renovation: 0.75,
      fair: 0.9,
      good: 1.0,
      excellent: 1.15,
    };
    price *= conditionMultipliers[property.condition] || 1.0;

    if (property.has_garden) price += 20000;
    if (property.has_parking) price += 15000;

    const variance = (Math.random() - 0.5) * 0.1;
    price *= 1 + variance;

    return Math.max(50000, Math.round(price / 1000) * 1000);
  }

  private generateFallbackData(): RealEstateDataset {
    const cities = [
      'Brussels',
      'Antwerp',
      'Ghent',
      'Bruges',
      'Leuven',
      'Liège',
      'Charleroi',
      'Namur',
    ];
    const properties: PropertyRecord[] = [];

    for (let i = 1; i <= 1000; i++) {
      const surface = Math.floor(Math.random() * 200) + 40;
      const price = Math.floor(Math.random() * 500000) + 150000;

      properties.push({
        id: i,
        surface,
        rooms: Math.floor(Math.random() * 6) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        construction_year: Math.floor(Math.random() * 70) + 1950,
        location: cities[Math.floor(Math.random() * cities.length)],
        property_type: ['apartment', 'house', 'townhouse', 'villa', 'studio'][
          Math.floor(Math.random() * 5)
        ],
        condition: ['excellent', 'good', 'fair', 'needs_renovation'][
          Math.floor(Math.random() * 4)
        ],
        has_garden: Math.random() > 0.5,
        has_parking: Math.random() > 0.3,
        price,
        price_per_sqm: Math.round(price / surface),
      });
    }

    return {
      metadata: {
        description: 'Fallback Belgian Real Estate Dataset',
        total_properties: properties.length,
        date_range: '2020-2024',
        cities_covered: cities.length,
        last_updated: new Date().toISOString().split('T')[0],
      },
      properties,
      market_statistics: {
        average_price: 350000,
        median_price: 320000,
        average_price_per_sqm: 3200,
        price_range: { min: 150000, max: 650000 },
        average_surface: 120,
        most_common_rooms: 3,
        property_type_distribution: {
          apartment: 0.35,
          house: 0.35,
          townhouse: 0.15,
          villa: 0.1,
          studio: 0.05,
        },
        city_price_averages: {
          Brussels: 450000,
          Antwerp: 380000,
          Ghent: 320000,
          Bruges: 410000,
          Leuven: 390000,
          Liège: 280000,
          Charleroi: 220000,
          Namur: 310000,
        },
      },
    };
  }

  getDataset(): RealEstateDataset | null {
    return this.dataset;
  }
}

export const dataLoader = DataLoader.getInstance();
