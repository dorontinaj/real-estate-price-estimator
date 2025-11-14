import { create } from 'zustand';

export interface PropertyData {
  surface: number;
  rooms: number;
  bathrooms: number;
  constructionYear: number;
  location: string;
  propertyType: string;
  condition: string;
  hasGarden: boolean;
  hasParking: boolean;
}

export interface PredictionResult {
  price: number;
  confidence: number;
  algorithm: string;
  processingTime: number;
}

interface PredictionStore {
  propertyData: PropertyData;
  predictions: PredictionResult[];
  isLoading: boolean;
  setPropertyData: (data: Partial<PropertyData>) => void;
  setPredictions: (predictions: PredictionResult[]) => void;
  setLoading: (loading: boolean) => void;
  resetPropertyData: () => void;
}

const initialPropertyData: PropertyData = {
  surface: 100,
  rooms: 3,
  bathrooms: 1,
  constructionYear: 2000,
  location: '',
  propertyType: '',
  condition: '',
  hasGarden: false,
  hasParking: false,
};

export const usePredictionStore = create<PredictionStore>((set) => ({
  propertyData: initialPropertyData,
  predictions: [],
  isLoading: false,
  setPropertyData: (data) =>
    set((state) => ({
      propertyData: { ...state.propertyData, ...data },
    })),
  setPredictions: (predictions) => set({ predictions }),
  setLoading: (loading) => set({ isLoading: loading }),
  resetPropertyData: () =>
    set({ propertyData: initialPropertyData, predictions: [] }),
}));
