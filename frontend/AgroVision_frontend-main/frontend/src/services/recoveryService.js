// Farm Recovery Tracking Service
// Manages chronological field event logs, photo submissions, and recovery status

import { apiRequest } from '../api/apiClient';
import { MOCK_RECOVERY_TIMELINES } from '../data/mockRecovery';

export const recoveryService = {
  async getRecoveryTimeline(farmId) {
    const liveResponse = await apiRequest(`/api/analyses/${farmId}/recovery`);
    if (liveResponse && liveResponse.data) {
      return liveResponse;
    }

    const data = MOCK_RECOVERY_TIMELINES[farmId] || MOCK_RECOVERY_TIMELINES['farm-bardhaman-01'];
    return {
      status: 'success',
      data: data,
      metadata: {
        isDemoData: true,
        workflowStage: 'AFTER (Farm Recovery & Next-Crop Planning)'
      }
    };
  },

  async logFieldObservation(farmId, observation) {
    const liveResponse = await apiRequest(`/api/farms/${farmId}/observations`, {
      method: 'POST',
      body: JSON.stringify(observation)
    });

    if (liveResponse && liveResponse.data) {
      return liveResponse.data;
    }

    return {
      success: true,
      event: {
        id: `evt-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: 'FIELD_EVIDENCE (DURING)',
        title: observation.title || 'Farmer Field Observation',
        description: observation.description || 'Field photograph and condition update submitted by farmer.',
        source: 'Farmer Field Upload',
        verified: false,
        photoUrl: observation.photoUrl || null
      }
    };
  }
};
