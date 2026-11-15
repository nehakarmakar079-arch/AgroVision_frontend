// Farm Management Service
// Handles farm retrieval, new farm registration, and local demo state

import { apiRequest } from '../api/apiClient';
import { DEMO_FARMS, WEST_BENGAL_DISTRICTS } from '../data/mockFarms';

const STORAGE_KEY = 'agrovision_registered_farms_v1';

// Initialize local demo storage
function getStoredFarms() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[FarmService] Error reading localStorage, using initial mock profiles.', e);
  }
  return DEMO_FARMS;
}

export const farmService = {
  async getAllFarms() {
    const liveResponse = await apiRequest('/api/farms');
    if (liveResponse && liveResponse.data) {
      return liveResponse.data;
    }
    return getStoredFarms();
  },

  async getFarmById(farmId) {
    const liveResponse = await apiRequest(`/api/farms/${farmId}`);
    if (liveResponse && liveResponse.data) {
      return liveResponse.data;
    }
    const all = getStoredFarms();
    return all.find(f => f.id === farmId) || all[0];
  },

  async registerFarm(farmData) {
    // Contract prepared for future backend: POST /api/farms
    const liveResponse = await apiRequest('/api/farms', {
      method: 'POST',
      body: JSON.stringify(farmData)
    });

    if (liveResponse && liveResponse.data) {
      return liveResponse.data;
    }

    // Local state fallback
    const newFarm = {
      ...farmData,
      id: `farm-custom-${Date.now()}`,
      status: 'User Registered (Demo Mode)',
      lastAnalysisDate: new Date().toISOString().split('T')[0],
      currentRotation: farmData.currentRotation || [
        { month: 'Jan', crop: farmData.mainCrop || 'Potato', stage: 'Vegetative' },
        { month: 'Feb', crop: farmData.mainCrop || 'Potato', stage: 'Harvest' },
        { month: 'Mar', crop: 'Fallow', stage: 'Resting' },
        { month: 'Apr', crop: 'Fallow', stage: 'Resting' },
        { month: 'May', crop: 'Land Prep', stage: 'Preparation' },
        { month: 'Jun', crop: 'Paddy', stage: 'Nursery' },
        { month: 'Jul', crop: 'Paddy', stage: 'Transplanting' },
        { month: 'Aug', crop: 'Paddy', stage: 'Tillering' },
        { month: 'Sep', crop: 'Paddy', stage: 'Flowering' },
        { month: 'Oct', crop: 'Paddy', stage: 'Harvest' },
        { month: 'Nov', crop: farmData.mainCrop || 'Mustard', stage: 'Sowing' },
        { month: 'Dec', crop: farmData.mainCrop || 'Mustard', stage: 'Vegetative' }
      ]
    };

    const currentFarms = getStoredFarms();
    const updated = [newFarm, ...currentFarms];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }

    return newFarm;
  },

  getDistricts() {
    return WEST_BENGAL_DISTRICTS;
  }
};
