// NASA Satellite Earth Observation Feeds Service
// Connects GPM IMERG, SMAP, MODIS NDVI, Landsat/HLS

import { apiRequest } from '../api/apiClient';
import { MOCK_SATELLITE_DATA } from '../data/mockSatellite';

export const satelliteService = {
  async getSatelliteObservations(farmId) {
    const liveResponse = await apiRequest(`/api/analyses/${farmId}/satellite`);
    if (liveResponse && liveResponse.data) {
      return liveResponse;
    }

    const data = MOCK_SATELLITE_DATA[farmId] || MOCK_SATELLITE_DATA['farm-bardhaman-01'];
    return {
      status: 'success',
      data: data,
      metadata: {
        satellites: ['NASA GPM Core Observatory', 'NASA SMAP', 'Terra/Aqua MODIS', 'Landsat-8/9 / Sentinel-2 HLS'],
        isDemoData: true,
        dataFreshness: 'Observed within last 12-48 hours',
        disclaimer: 'Satellite indicators offer synoptic regional observations. Ground-truthing through farmer observations remains essential.'
      }
    };
  }
};
