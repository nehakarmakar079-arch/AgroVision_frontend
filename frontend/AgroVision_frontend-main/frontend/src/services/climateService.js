// NASA POWER Agroclimatology Service
// Standardized format for daily & monthly variables: T2M, T2M_MAX, T2M_MIN, PRECTOTCORR, RH2M

import { apiRequest } from '../api/apiClient';
import { MOCK_CLIMATE_BY_FARM } from '../data/mockClimate';

export const climateService = {
  async getClimateByFarmId(farmId) {
    const liveResponse = await apiRequest(`/api/analyses/${farmId}/climate`);
    if (liveResponse && liveResponse.data) {
      return liveResponse;
    }

    const data = MOCK_CLIMATE_BY_FARM[farmId] || MOCK_CLIMATE_BY_FARM['farm-bardhaman-01'];
    return {
      status: 'success',
      data: data,
      metadata: {
        source: 'NASA Langley Research Center POWER Project',
        parameters: ['T2M', 'T2M_MAX', 'T2M_MIN', 'RH2M', 'PRECTOTCORR'],
        spatialResolution: '0.5° x 0.5° (~50km)',
        temporalCoverage: '10-Year Climatological Normals + Recent Season',
        isDemoData: true,
        caveat: 'NASA POWER provides regional gridded atmospheric context. Farm micro-climates (tree canopy, canal proximity) may show local deviations.'
      }
    };
  }
};
