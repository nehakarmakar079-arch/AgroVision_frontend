// Soil Information Adapter & Laboratory Entry Profiles
// Contains modeled SoilGrids (ISRIC 250m) estimates and actual laboratory soil test entries
// Strictly acknowledges that NASA satellites do NOT directly measure soil chemical NPK or individual farm EC.

export const MOCK_SOIL_DATA = {
  'farm-bardhaman-01': {
    soilGridsModel: {
      source: 'SoilGrids (ISRIC - 250m Gridded Model)',
      phH2O: 6.4,
      clayFraction: '28%',
      sandFraction: '38%',
      siltFraction: '34%',
      organicCarbonGKg: 8.2, // ~0.82%
      cationExchangeCapacity: '18 cmol(+)/kg',
      disclaimer: 'SoilGrids values are machine-learning statistical predictions at 250m resolution, not direct field sample tests.'
    },
    latestLabTest: {
      testDate: '2026-09-20',
      labName: 'District Soil Testing Laboratory, Burdwan',
      testedBy: 'Department of Agriculture, Govt. of West Bengal',
      ph: 6.5, // Slightly acidic to neutral
      electricalConductivity: 0.35, // dS/m (Normal non-saline)
      availableNitrogenKgHa: 215, // Low
      availablePhosphorusKgHa: 24.5, // Medium
      availablePotassiumKgHa: 198, // Medium
      organicCarbonPercent: 0.74, // Medium
      salinityClass: 'Non-Saline (EC < 2.0 dS/m)',
      soilHealthVerdict: 'Good physical structure, but nitrogen depleted due to continuous intensive cropping. Requires pulse/legume inclusion.'
    }
  },
  'farm-hooghly-02': {
    soilGridsModel: {
      source: 'SoilGrids (ISRIC - 250m Gridded Model)',
      phH2O: 6.8,
      clayFraction: '32%',
      sandFraction: '30%',
      siltFraction: '38%',
      organicCarbonGKg: 9.5,
      cationExchangeCapacity: '22 cmol(+)/kg',
      disclaimer: 'Statistical regional estimate at 250m resolution.'
    },
    latestLabTest: {
      testDate: '2026-08-15',
      labName: 'Hooghly Krishi Vigyan Kendra (KVK)',
      testedBy: 'Bidhan Chandra Krishi Viswavidyalaya (BCKV)',
      ph: 6.7,
      electricalConductivity: 0.42,
      availableNitrogenKgHa: 240,
      availablePhosphorusKgHa: 32.0,
      availablePotassiumKgHa: 220,
      organicCarbonPercent: 0.88,
      salinityClass: 'Non-Saline',
      soilHealthVerdict: 'Balanced nutrient index with healthy organic carbon. Crop diversification with Jute provides good root aeration.'
    }
  },
  'farm-gosaba-03': {
    soilGridsModel: {
      source: 'SoilGrids (ISRIC - 250m Gridded Model)',
      phH2O: 7.6,
      clayFraction: '46%',
      sandFraction: '18%',
      siltFraction: '36%',
      organicCarbonGKg: 7.0,
      cationExchangeCapacity: '26 cmol(+)/kg',
      disclaimer: 'SoilGrids reflects regional coastal clay; it cannot predict seasonal tidal salinity surges.'
    },
    latestLabTest: {
      testDate: '2026-10-28',
      labName: 'Sundarbans Coastal Soil Testing Facility, Canning',
      testedBy: 'Central Soil Salinity Research Institute (CSSRI)',
      ph: 7.8, // Slightly alkaline
      electricalConductivity: 4.8, // dS/m (Moderately Saline - critical for Rabi season!)
      availableNitrogenKgHa: 180, // Low
      availablePhosphorusKgHa: 14.0, // Low
      availablePotassiumKgHa: 340, // High (marine cation deposition)
      organicCarbonPercent: 0.52, // Low
      salinityClass: 'Moderately Saline (EC: 4.0 – 8.0 dS/m)',
      soilHealthVerdict: 'High dry-season salinity hazard. Capillary rise of salt expected between January and May. Conventional vegetables/Boro rice will face osmotic failure unless salt-tolerant pulses or mulch conservation is applied.'
    }
  }
};
