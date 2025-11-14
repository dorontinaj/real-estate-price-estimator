import { dataLoader, type PropertyRecord } from './data-loader';
import type { PropertyData } from '@/stores/prediction';

export class LinearRegressionModel {
  private weights: Record<string, number> = {};
  private bias = 0;
  private trained = false;
  private trainingData: PropertyRecord[] = [];

  constructor() {
    this.weights = {
      surface: 2800,
      rooms: 15000,
      bathrooms: 8000,
      age: -800,
      hasGarden: 25000,
      hasParking: 15000,
    };
    this.bias = 50000;
  }

  async train() {
    try {
      const dataset = await dataLoader.loadData();
      this.trainingData = dataset.properties;
      this.calculateWeights();
      this.trained = true;
      console.log(
        `Linear Regression trained with ${this.trainingData.length} properties`
      );
    } catch (error) {
      console.error('Error training Linear Regression:', error);
      this.trained = true;
    }
  }

  private calculateWeights() {
    if (this.trainingData.length === 0) return;

    const learningRate = 0.0001;
    const iterations = 1000;

    this.weights = {
      surface: 0,
      rooms: 0,
      bathrooms: 0,
      age: 0,
      hasGarden: 0,
      hasParking: 0,
    };
    this.bias = 0;

    for (let iter = 0; iter < iterations; iter++) {
      let totalError = 0;
      const gradients = { ...this.weights };
      let biasGradient = 0;

      for (const property of this.trainingData) {
        const features = this.extractFeatures(property);
        const predicted = this.predictFromFeatures(features);
        const error = predicted - property.price;

        totalError += error * error;

        gradients.surface += error * features.surface;
        gradients.rooms += error * features.rooms;
        gradients.bathrooms += error * features.bathrooms;
        gradients.age += error * features.age;
        gradients.hasGarden += error * features.hasGarden;
        gradients.hasParking += error * features.hasParking;
        biasGradient += error;
      }

      const n = this.trainingData.length;
      for (const key in this.weights) {
        this.weights[key] -= (learningRate * gradients[key]) / n;
      }
      this.bias -= (learningRate * biasGradient) / n;

      if (iter % 100 === 0) {
        const mse = totalError / n;
        console.log(`Iteration ${iter}, MSE: ${mse.toFixed(2)}`);
      }
    }
  }

  private extractFeatures(property: PropertyRecord): any {
    const currentYear = new Date().getFullYear();
    const age = Math.max(0, currentYear - property.construction_year);

    return {
      surface: property.surface,
      rooms: property.rooms,
      bathrooms: property.bathrooms,
      age: age,
      hasGarden: property.has_garden ? 1 : 0,
      hasParking: property.has_parking ? 1 : 0,
    };
  }

  private predictFromFeatures(features: any): number {
    let price = this.bias;
    price += this.weights.surface * features.surface;
    price += this.weights.rooms * features.rooms;
    price += this.weights.bathrooms * features.bathrooms;
    price += this.weights.age * features.age;
    price += this.weights.hasGarden * features.hasGarden;
    price += this.weights.hasParking * features.hasParking;
    return price;
  }

  predict(propertyData: PropertyData): number {
    if (!this.trained) {
      throw new Error('Model must be trained before making predictions');
    }

    const currentYear = new Date().getFullYear();
    const age = Math.max(0, currentYear - propertyData.constructionYear);

    let price = this.bias;
    price += this.weights.surface * propertyData.surface;
    price += this.weights.rooms * propertyData.rooms;
    price += this.weights.bathrooms * propertyData.bathrooms;
    price += this.weights.age * age;
    price += propertyData.hasGarden ? this.weights.hasGarden : 0;
    price += propertyData.hasParking ? this.weights.hasParking : 0;

    price *= this.getLocationMultiplier(propertyData.location);
    price *= this.getPropertyTypeMultiplier(propertyData.propertyType);
    price *= this.getConditionMultiplier(propertyData.condition);

    return Math.max(50000, Math.round(price / 1000) * 1000);
  }

  private getLocationMultiplier(location: string): number {
    if (this.trainingData.length === 0) {
      const fallbackMultipliers: Record<string, number> = {
        Brussels: 1.4,
        Antwerp: 1.2,
        Bruges: 1.3,
        Leuven: 1.25,
        Ghent: 1.1,
        Liège: 0.9,
        Namur: 1.0,
        Charleroi: 0.8,
        Mons: 0.85,
        Aalst: 0.95,
        Mechelen: 1.05,
        'La Louvière': 0.8,
        Kortrijk: 0.9,
        Hasselt: 0.95,
      };
      return fallbackMultipliers[location] || 1.0;
    }

    const cityProperties = this.trainingData.filter(
      (p) => p.location === location
    );
    if (cityProperties.length === 0) return 1.0;

    const cityAvgPrice =
      cityProperties.reduce((sum, p) => sum + p.price, 0) /
      cityProperties.length;
    const overallAvgPrice =
      this.trainingData.reduce((sum, p) => sum + p.price, 0) /
      this.trainingData.length;

    return cityAvgPrice / overallAvgPrice;
  }

  private getPropertyTypeMultiplier(type: string): number {
    const fallbackMultipliers: Record<string, number> = {
      studio: 0.6,
      apartment: 0.9,
      house: 1.0,
      townhouse: 1.1,
      villa: 1.5,
    };

    if (this.trainingData.length === 0) {
      return fallbackMultipliers[type] || 1.0;
    }

    const typeProperties = this.trainingData.filter(
      (p) => p.property_type === type
    );
    if (typeProperties.length === 0) return fallbackMultipliers[type] || 1.0;

    const typeAvgPrice =
      typeProperties.reduce((sum, p) => sum + p.price, 0) /
      typeProperties.length;
    const overallAvgPrice =
      this.trainingData.reduce((sum, p) => sum + p.price, 0) /
      this.trainingData.length;

    return typeAvgPrice / overallAvgPrice;
  }

  private getConditionMultiplier(condition: string): number {
    const fallbackMultipliers: Record<string, number> = {
      excellent: 1.15,
      good: 1.0,
      fair: 0.9,
      needs_renovation: 0.75,
    };
    return fallbackMultipliers[condition] || 1.0;
  }

  getTrainingDataSize(): number {
    return this.trainingData.length;
  }
}

export class KNNModel {
  private trainingData: PropertyRecord[] = [];
  private k = 5;
  private trained = false;

  constructor(k = 5) {
    this.k = k;
  }

  async train() {
    try {
      const dataset = await dataLoader.loadData();
      this.trainingData = dataset.properties;
      this.trained = true;
      console.log(`k-NN trained with ${this.trainingData.length} properties`);
    } catch (error) {
      console.error('Error training k-NN:', error);
      throw error;
    }
  }

  predict(propertyData: PropertyData): number {
    if (!this.trained) {
      throw new Error('Model must be trained before making predictions');
    }

    const queryFeatures = this.extractFeatures(propertyData);

    const distances = this.trainingData.map((property) => ({
      distance: this.euclideanDistance(
        queryFeatures,
        this.extractFeaturesFromRecord(property)
      ),
      price: property.price,
    }));

    distances.sort((a, b) => a.distance - b.distance);
    const kNearest = distances.slice(0, this.k);

    const totalWeight = kNearest.reduce(
      (sum, point) => sum + 1 / (point.distance + 0.001),
      0
    );
    const weightedPrice = kNearest.reduce((sum, point) => {
      const weight = 1 / (point.distance + 0.001) / totalWeight;
      return sum + point.price * weight;
    }, 0);

    return Math.round(weightedPrice);
  }

  private extractFeatures(data: PropertyData): number[] {
    const currentYear = new Date().getFullYear();
    const age = currentYear - data.constructionYear;

    return [
      data.surface / 100,
      data.rooms,
      data.bathrooms,
      age / 50,
      data.hasGarden ? 1 : 0,
      data.hasParking ? 1 : 0,
      this.encodeLocation(data.location),
      this.encodePropertyType(data.propertyType),
      this.encodeCondition(data.condition),
    ];
  }

  private extractFeaturesFromRecord(property: PropertyRecord): number[] {
    const currentYear = new Date().getFullYear();
    const age = currentYear - property.construction_year;

    return [
      property.surface / 100,
      property.rooms,
      property.bathrooms,
      age / 50,
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

  private euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(
      a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
    );
  }
}

export class DecisionTreeModel {
  private root?: DecisionTreeNode;
  private trained = false;
  private trainingData: PropertyRecord[] = [];

  async train() {
    try {
      const dataset = await dataLoader.loadData();
      this.trainingData = dataset.properties;
      this.root = this.buildTree(this.trainingData, 0, 5);
      this.trained = true;
      console.log(
        `Decision Tree trained with ${this.trainingData.length} properties`
      );
    } catch (error) {
      console.error('Error training Decision Tree:', error);
      throw error;
    }
  }

  private buildTree(
    data: PropertyRecord[],
    depth: number,
    maxDepth: number
  ): DecisionTreeNode {
    if (depth >= maxDepth || data.length < 10) {
      const avgPrice = data.reduce((sum, p) => sum + p.price, 0) / data.length;
      return new DecisionTreeNode(undefined, undefined, avgPrice);
    }

    const bestSplit = this.findBestSplit(data);
    if (!bestSplit) {
      const avgPrice = data.reduce((sum, p) => sum + p.price, 0) / data.length;
      return new DecisionTreeNode(undefined, undefined, avgPrice);
    }

    const node = new DecisionTreeNode(bestSplit.feature, bestSplit.threshold);
    node.left = this.buildTree(bestSplit.leftData, depth + 1, maxDepth);
    node.right = this.buildTree(bestSplit.rightData, depth + 1, maxDepth);

    return node;
  }

  private findBestSplit(data: PropertyRecord[]): any {
    let bestSplit = null;
    let bestScore = Number.POSITIVE_INFINITY;

    const features = ['surface', 'rooms', 'bathrooms', 'construction_year'];

    for (const feature of features) {
      const values = data.map((p) => (p as any)[feature]).sort((a, b) => a - b);
      const uniqueValues = [...new Set(values)];

      for (let i = 0; i < uniqueValues.length - 1; i++) {
        const threshold = (uniqueValues[i] + uniqueValues[i + 1]) / 2;
        const leftData = data.filter((p) => (p as any)[feature] <= threshold);
        const rightData = data.filter((p) => (p as any)[feature] > threshold);

        if (leftData.length === 0 || rightData.length === 0) continue;

        const score = this.calculateSplitScore(leftData, rightData);
        if (score < bestScore) {
          bestScore = score;
          bestSplit = { feature, threshold, leftData, rightData };
        }
      }
    }

    return bestSplit;
  }

  private calculateSplitScore(
    leftData: PropertyRecord[],
    rightData: PropertyRecord[]
  ): number {
    const leftVariance = this.calculateVariance(leftData.map((p) => p.price));
    const rightVariance = this.calculateVariance(rightData.map((p) => p.price));
    const totalSize = leftData.length + rightData.length;

    return (
      (leftData.length / totalSize) * leftVariance +
      (rightData.length / totalSize) * rightVariance
    );
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  }

  predict(propertyData: PropertyData): number {
    if (!this.trained || !this.root) {
      throw new Error('Model must be trained before making predictions');
    }

    return this.traverseTree(this.root, propertyData);
  }

  private traverseTree(node: DecisionTreeNode, data: PropertyData): number {
    if (node.isLeaf()) {
      return node.value!;
    }

    let value: number;
    switch (node.feature) {
      case 'surface':
        value = data.surface;
        break;
      case 'rooms':
        value = data.rooms;
        break;
      case 'bathrooms':
        value = data.bathrooms;
        break;
      case 'construction_year':
        value = data.constructionYear;
        break;
      default:
        value = 0;
    }

    if (value <= (node.threshold || 0)) {
      return node.left ? this.traverseTree(node.left, data) : 300000;
    } else {
      return node.right ? this.traverseTree(node.right, data) : 400000;
    }
  }
}

class DecisionTreeNode {
  feature?: string;
  threshold?: number;
  value?: number;
  left?: DecisionTreeNode;
  right?: DecisionTreeNode;

  constructor(feature?: string, threshold?: number, value?: number) {
    this.feature = feature;
    this.threshold = threshold;
    this.value = value;
  }

  isLeaf(): boolean {
    return this.value !== undefined;
  }
}

export class RandomForestModel {
  private trees: DecisionTreeModel[] = [];
  private numTrees = 10;
  private trained = false;

  constructor(numTrees = 10) {
    this.numTrees = numTrees;
  }

  async train() {
    try {
      this.trees = [];
      for (let i = 0; i < this.numTrees; i++) {
        const tree = new DecisionTreeModel();
        await tree.train();
        this.trees.push(tree);
      }

      this.trained = true;
      console.log(`Random Forest trained with ${this.numTrees} trees`);
    } catch (error) {
      console.error('Error training Random Forest:', error);
      throw error;
    }
  }

  predict(propertyData: PropertyData): number {
    if (!this.trained) {
      throw new Error('Model must be trained before making predictions');
    }

    const predictions = this.trees.map((tree) => tree.predict(propertyData));
    const avgPrediction =
      predictions.reduce((sum, pred) => sum + pred, 0) / predictions.length;
    return Math.round(avgPrediction);
  }
}
