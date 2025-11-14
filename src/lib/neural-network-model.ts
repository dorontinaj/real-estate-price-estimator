import * as tf from '@tensorflow/tfjs';
import type { PropertyRecord } from './data-loader';
import { dataLoader } from './data-loader';

export class NeuralNetworkModel {
  private model: tf.Sequential | null = null;
  private trained = false;
  private trainingData: PropertyRecord[] = [];
  private normalizeParams = {
    surface: { min: 30, max: 400, mean: 0, std: 1 },
    rooms: { min: 1, max: 8, mean: 0, std: 1 },
    bathrooms: { min: 1, max: 5, mean: 0, std: 1 },
    age: { min: 0, max: 150, mean: 0, std: 1 },
    price: { min: 50000, max: 2000000, mean: 0, std: 1 },
  };

  constructor() {
    // Create neural network architecture
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [9], units: 64, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'linear' }),
      ],
    });

    // Compile model with optimized learning rate
    this.model.compile({
      optimizer: tf.train.adam(0.003),
      loss: 'meanSquaredError',
      metrics: ['mae'],
    });
  }

  async train(onProgress?: (epoch: number, loss: number) => void) {
    if (!this.model) throw new Error('Model not initialized');

    try {
      const dataset = await dataLoader.loadData();
      this.trainingData = dataset.properties;

      // Calculate normalization parameters
      this.calculateNormalizationParams();

      // Prepare training data
      const features: number[][] = [];
      const labels: number[] = [];

      for (const property of this.trainingData) {
        features.push(this.extractFeatures(property));
        labels.push(this.normalizePrice(property.price));
      }

      const xs = tf.tensor2d(features);
      const ys = tf.tensor2d(labels, [labels.length, 1]);

      // Train the model with optimized settings for speed
      await this.model.fit(xs, ys, {
        epochs: 30,
        batchSize: 64,
        validationSplit: 0.15,
        shuffle: true,
        verbose: 0,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            if (onProgress && logs) {
              onProgress(epoch, logs.loss as number);
            }
          },
          onTrainEnd: () => {
            // Cleanup during training
            tf.tidy(() => {});
          },
        },
      });

      // Clean up tensors
      xs.dispose();
      ys.dispose();

      this.trained = true;
      console.log(
        `Neural Network trained with ${this.trainingData.length} properties`
      );
    } catch (error) {
      console.error('Error training Neural Network:', error);
      throw error;
    }
  }

  private calculateNormalizationParams() {
    const surfaces = this.trainingData.map((p) => p.surface);
    const rooms = this.trainingData.map((p) => p.rooms);
    const bathrooms = this.trainingData.map((p) => p.bathrooms);
    const ages = this.trainingData.map(
      (p) => new Date().getFullYear() - p.construction_year
    );
    const prices = this.trainingData.map((p) => p.price);

    this.normalizeParams = {
      surface: this.getStats(surfaces),
      rooms: this.getStats(rooms),
      bathrooms: this.getStats(bathrooms),
      age: this.getStats(ages),
      price: this.getStats(prices),
    };
  }

  private getStats(values: number[]) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance =
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      values.length;
    const std = Math.sqrt(variance);
    return { min, max, mean, std };
  }

  private normalize(
    value: number,
    stats: { min: number; max: number; mean: number; std: number }
  ) {
    // Z-score normalization
    return (value - stats.mean) / (stats.std || 1);
  }

  private normalizePrice(price: number) {
    return this.normalize(price, this.normalizeParams.price);
  }

  private denormalizePrice(normalizedPrice: number) {
    return (
      normalizedPrice * this.normalizeParams.price.std +
      this.normalizeParams.price.mean
    );
  }

  private extractFeatures(property: PropertyRecord): number[] {
    const currentYear = new Date().getFullYear();
    const age = currentYear - property.construction_year;

    return [
      this.normalize(property.surface, this.normalizeParams.surface),
      this.normalize(property.rooms, this.normalizeParams.rooms),
      this.normalize(property.bathrooms, this.normalizeParams.bathrooms),
      this.normalize(age, this.normalizeParams.age),
      property.has_garden ? 1 : 0,
      property.has_parking ? 1 : 0,
      this.encodeLocation(property.location),
      this.encodePropertyType(property.property_type),
      this.encodeCondition(property.condition),
    ];
  }

  private encodeLocation(location: string): number {
    const locationMap: Record<string, number> = {
      Brussels: 1.0,
      Antwerp: 0.8,
      Ghent: 0.6,
      Bruges: 0.7,
      Leuven: 0.75,
      Liège: 0.4,
      Namur: 0.5,
      Charleroi: 0.3,
      Mons: 0.35,
      Aalst: 0.45,
      Mechelen: 0.55,
      'La Louvière': 0.3,
      Kortrijk: 0.4,
      Hasselt: 0.45,
    };
    return locationMap[location] || 0.5;
  }

  private encodePropertyType(type: string): number {
    const typeMap: Record<string, number> = {
      studio: 0.2,
      apartment: 0.4,
      house: 0.6,
      townhouse: 0.7,
      villa: 1.0,
    };
    return typeMap[type] || 0.5;
  }

  private encodeCondition(condition: string): number {
    const conditionMap: Record<string, number> = {
      needs_renovation: 0.25,
      fair: 0.5,
      good: 0.75,
      excellent: 1.0,
    };
    return conditionMap[condition] || 0.5;
  }

  predict(propertyData: {
    surface: number;
    rooms: number;
    bathrooms: number;
    constructionYear: number;
    location: string;
    propertyType: string;
    condition: string;
    hasGarden: boolean;
    hasParking: boolean;
  }): number {
    if (!this.trained || !this.model) {
      throw new Error('Model must be trained before making predictions');
    }

    // Use tidy to automatically dispose tensors
    return tf.tidy(() => {
      const currentYear = new Date().getFullYear();
      const age = currentYear - propertyData.constructionYear;

      const features = [
        this.normalize(propertyData.surface, this.normalizeParams.surface),
        this.normalize(propertyData.rooms, this.normalizeParams.rooms),
        this.normalize(propertyData.bathrooms, this.normalizeParams.bathrooms),
        this.normalize(age, this.normalizeParams.age),
        propertyData.hasGarden ? 1 : 0,
        propertyData.hasParking ? 1 : 0,
        this.encodeLocation(propertyData.location),
        this.encodePropertyType(propertyData.propertyType),
        this.encodeCondition(propertyData.condition),
      ];

      const input = tf.tensor2d([features]);
      const prediction = this.model!.predict(input) as tf.Tensor;
      const normalizedPrice = prediction.dataSync()[0];

      const price = this.denormalizePrice(normalizedPrice);
      return Math.max(50000, Math.round(price / 1000) * 1000);
    });
  }

  getTrainingDataSize(): number {
    return this.trainingData.length;
  }

  dispose() {
    if (this.model) {
      this.model.dispose();
    }
  }
}
