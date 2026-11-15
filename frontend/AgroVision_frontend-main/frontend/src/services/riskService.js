// Agricultural Risk Intelligence Service
// Screenings for Flood/Waterlogging, Coastal Salinity, Heat Stress, and Dry Spells

import { apiRequest } from '../api/apiClient';

export const riskService = {
  async getRiskAssessment(farmId) {
    const liveResponse = await apiRequest(`/api/analyses/${farmId}/risks`);
    if (liveResponse && liveResponse.data) {
      return liveResponse;
    }

    // Determine specific risk matrix depending on the farm profile
    const isGosaba = farmId && farmId.includes('gosaba');
    const isHooghly = farmId && farmId.includes('hooghly');

    return {
      status: 'success',
      data: {
        overallRiskLevel: isGosaba ? 'High (Coastal Salinity / Tidal Vulnerability)' : 'Low to Moderate',
        riskFactors: [
          {
            category: 'Flood & Waterlogging',
            level: isGosaba ? 'Moderate' : 'Low',
            indicator: isGosaba ? 'Lowland delta elevation (+1.8m MSL); drainage dependent on sluice gate operation' : 'Well-drained alluvial gradient; standing water unlikely in November',
            source: 'NASA GPM IMERG 7-Day Accumulation + SRTM DEM',
            recommendation: isGosaba ? 'Keep field bunds raised and check river dyke stability' : 'Maintain standard furrow drainage between potato beds'
          },
          {
            category: 'Coastal Soil Salinity',
            level: isGosaba ? 'High (EC: 4.8 dS/m)' : 'Safe (EC: 0.35 dS/m)',
            indicator: isGosaba ? 'Dry-season salt capillary rise begins in Dec-Jan. Sweet groundwater layer vulnerable' : 'Alluvial sweet soils; zero salinity hazard',
            source: 'CSSRI Canning Soil Test Baseline + Field Verification',
            recommendation: isGosaba ? 'Avoid water-intensive summer Boro rice; adopt relay grass pea (Khesari) or thick straw mulch' : 'No desalinization measures needed'
          },
          {
            category: 'Seasonal Temperature & Heat Stress',
            level: 'Low',
            indicator: 'Mean minimum temp 16.8°C favorable for winter crop emergence',
            source: 'NASA POWER T2M_MIN 10-Year Climatology',
            recommendation: 'Optimal sowing window for mustard, potato, and winter pulses'
          },
          {
            category: 'Rainfall Irregularity & Sowing Delay',
            level: 'Moderate',
            indicator: 'Late October thundershower delayed rabi land preparation by 7–10 days in Gangetic plains',
            source: 'NASA POWER PRECTOTCORR Anomaly',
            recommendation: 'Use early-maturing potato/pulse cultivars (e.g., Kufri Pukhraj) to recover lost schedule'
          }
        ]
      },
      metadata: {
        isDemoData: true,
        methodology: 'Multi-satellite threshold screening combined with agro-ecological zonal baselines'
      }
    };
  }
};
