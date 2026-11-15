// Crop Rotation & Agricultural Planning Service
// Handles West Bengal crop catalog, rotation evaluations, and What-If climate simulations

import { apiRequest } from '../api/apiClient';
import { WEST_BENGAL_CROPS, MOCK_ROTATION_RECOMMENDATIONS } from '../data/mockCrops';

export const cropService = {
  getCropCatalog() {
    return WEST_BENGAL_CROPS;
  },

  async getRotationRecommendations(farmId, currentRotation) {
    // Contract prepared for future backend: GET /api/analyses/:analysisId/rotation
    const liveResponse = await apiRequest(`/api/analyses/${farmId}/rotation`);
    if (liveResponse && liveResponse.data) {
      return liveResponse;
    }

    const recs = MOCK_ROTATION_RECOMMENDATIONS[farmId] || MOCK_ROTATION_RECOMMENDATIONS['farm-bardhaman-01'];
    return {
      status: 'success',
      data: recs,
      metadata: {
        agronomicAuthority: 'Bidhan Chandra Krishi Viswavidyalaya (BCKV) Crop Rotation Guidelines',
        pilotRegion: farmId.includes('gosaba') ? 'Coastal Sundarbans Delta' : 'Gangetic Alluvial Plain',
        isDemoData: true,
        rotationRulesChecked: [
          'Water deficit compatibility with NASA POWER seasonal rainfall',
          'Nitrogen restoration via pulse/legume nodulation',
          'Pest & disease cycle interruption via alternating plant families',
          'Feasibility of turnaround windows between harvest and next sowing'
        ]
      }
    };
  },

  async simulateClimateScenario({ farmId, tempOffsetCelsius, rainfallOffsetPercent, sowingDelayDays }) {
    // Contract prepared for future backend: POST /api/analyses/:analysisId/simulate
    const liveResponse = await apiRequest(`/api/analyses/${farmId}/simulate`, {
      method: 'POST',
      body: JSON.stringify({ tempOffsetCelsius, rainfallOffsetPercent, sowingDelayDays })
    });

    if (liveResponse && liveResponse.data) {
      return liveResponse.data;
    }

    // Local deterministic scenario simulation calculation
    const delay = parseInt(sowingDelayDays, 10) || 0;
    const tempChange = parseFloat(tempOffsetCelsius) || 0;
    const rainChange = parseInt(rainfallOffsetPercent, 10) || 0;

    let waterStressVerdict = 'Stable';
    let harvestWindowVerdict = 'On Schedule';
    let vulnerabilityScore = 20;

    if (delay > 15) {
      harvestWindowVerdict = 'Critical Shift: Late sowing pushes pod filling/tuber bulking into dry heat in March.';
      vulnerabilityScore += 35;
    } else if (delay > 7) {
      harvestWindowVerdict = 'Moderate Shift: Harvest window compressed by approx. 1–2 weeks.';
      vulnerabilityScore += 15;
    }

    if (rainChange < -20) {
      waterStressVerdict = 'Severe Irrigation Deficit: Supplemental groundwater pumping required.';
      vulnerabilityScore += 30;
    } else if (rainChange > 25) {
      waterStressVerdict = 'Excess Moisture Risk: Standing water in furrows may cause tuber rot / root damping off.';
      vulnerabilityScore += 25;
    }

    if (tempChange > 1.5) {
      vulnerabilityScore += 20;
    }

    return {
      scenarioLabel: `Simulated: ${tempChange > 0 ? '+' : ''}${tempChange}°C, ${rainChange > 0 ? '+' : ''}${rainChange}% Rain, ${delay} Days Delay`,
      vulnerabilityIndex: Math.min(100, vulnerabilityScore),
      waterStressVerdict,
      harvestWindowVerdict,
      suggestedAdjustment: delay > 10 
        ? 'Switch to short-duration varieties (e.g., Kufri Pukhraj potato: 75 days; or Pusa Vishal moong) to avoid late season terminal heat stress.'
        : 'Maintain standard crop calendar with regular soil moisture monitoring.',
      isSimulation: true,
      disclaimer: 'This is a decision-support what-if scenario simulator, NOT an absolute weather forecast.'
    };
  }
};
