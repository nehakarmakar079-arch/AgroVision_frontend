// NASA Satellite Earth Observation Feeds (GPM IMERG, SMAP, MODIS, Landsat/HLS)
// Clearly labelled as DEMONSTRATION SATELLITE DATASET with spatial resolution caveats

export const MOCK_SATELLITE_DATA = {
  'farm-bardhaman-01': {
    gpmRainfall: {
      source: 'NASA GPM IMERG (V07B Final Run)',
      spatialResolution: '0.1° x 0.1° (~10 km)',
      sevenDayAccumulation: 2.4, // mm
      thirtyDayAccumulation: 58.2, // mm
      rainfallRateMmHr: 0.0,
      floodRiskIndex: 'Low (0.18 / 1.0)',
      lastPass: '2026-11-14T06:00:00Z',
      status: 'DEMO DATA'
    },
    smapSoilMoisture: {
      source: 'NASA SMAP L4 Global Surface & Root-Zone',
      spatialResolution: '9 km gridded',
      surfaceMoisture: '0.28 cm³/cm³ (Sufficient)',
      rootZoneMoisture: '0.32 cm³/cm³ (Optimal)',
      moistureAnomaly: '+0.04 vs 5-yr seasonal mean',
      disclaimer: 'SMAP data provides 9km regional moisture context. It does not replace field tensiometer probes or direct soil tests on smallholder plots.',
      status: 'DEMO DATA'
    },
    vegetationNdvi: {
      source: 'MODIS (MOD13Q1 250m) & Landsat-HLS (30m)',
      currentNdvi: 0.68,
      ndviHealth: 'Vigorous Green Canopy (Post-Aman Harvest / Early Potato)',
      temporalCurve: [
        { date: 'Jun 15', ndvi: 0.22, stage: 'Fallow / Seedling' },
        { date: 'Jul 15', ndvi: 0.44, stage: 'Tillering (Paddy)' },
        { date: 'Aug 15', ndvi: 0.76, stage: 'Peak Vegetative' },
        { date: 'Sep 15', ndvi: 0.82, stage: 'Heading / Flowering' },
        { date: 'Oct 15', ndvi: 0.58, stage: 'Maturity / Harvest' },
        { date: 'Nov 01', ndvi: 0.32, stage: 'Land Prep (Potato)' },
        { date: 'Nov 14', ndvi: 0.48, stage: 'Early Emergence' }
      ]
    }
  },
  'farm-hooghly-02': {
    gpmRainfall: {
      source: 'NASA GPM IMERG (V07B Final Run)',
      spatialResolution: '0.1° x 0.1° (~10 km)',
      sevenDayAccumulation: 3.1,
      thirtyDayAccumulation: 64.0,
      rainfallRateMmHr: 0.0,
      floodRiskIndex: 'Low (0.15 / 1.0)',
      lastPass: '2026-11-14T06:00:00Z',
      status: 'DEMO DATA'
    },
    smapSoilMoisture: {
      source: 'NASA SMAP L4 Global Surface & Root-Zone',
      spatialResolution: '9 km gridded',
      surfaceMoisture: '0.31 cm³/cm³ (Sufficient)',
      rootZoneMoisture: '0.34 cm³/cm³ (Optimal)',
      moistureAnomaly: '+0.02 vs seasonal mean',
      disclaimer: 'SMAP data provides 9km regional moisture context. It does not replace field tensiometer probes.',
      status: 'DEMO DATA'
    },
    vegetationNdvi: {
      source: 'MODIS (MOD13Q1 250m) & Landsat-HLS (30m)',
      currentNdvi: 0.64,
      ndviHealth: 'Healthy Green Biomass (Mustard sowing)',
      temporalCurve: [
        { date: 'Jun 15', ndvi: 0.65, stage: 'Jute Maturity' },
        { date: 'Jul 15', ndvi: 0.35, stage: 'Paddy Transplanting' },
        { date: 'Aug 15', ndvi: 0.74, stage: 'Paddy Tillering' },
        { date: 'Sep 15', ndvi: 0.80, stage: 'Paddy Panicle' },
        { date: 'Oct 15', ndvi: 0.52, stage: 'Harvest' },
        { date: 'Nov 01', ndvi: 0.28, stage: 'Mustard Sowing' },
        { date: 'Nov 14', ndvi: 0.50, stage: 'Mustard Emergence' }
      ]
    }
  },
  'farm-gosaba-03': {
    gpmRainfall: {
      source: 'NASA GPM IMERG (V07B Final Run)',
      spatialResolution: '0.1° x 0.1° (~10 km)',
      sevenDayAccumulation: 12.8,
      thirtyDayAccumulation: 142.5,
      rainfallRateMmHr: 0.2,
      floodRiskIndex: 'Moderate (0.52 / 1.0)',
      lastPass: '2026-11-14T06:00:00Z',
      status: 'DEMO DATA'
    },
    smapSoilMoisture: {
      source: 'NASA SMAP L4 Global Surface & Root-Zone',
      spatialResolution: '9 km gridded',
      surfaceMoisture: '0.38 cm³/cm³ (Near Saturation)',
      rootZoneMoisture: '0.41 cm³/cm³ (Waterlogged Subsoil)',
      moistureAnomaly: '+0.09 vs seasonal mean',
      disclaimer: 'Coastal wetness indices are affected by high tidal channels. Satellite radar reflects surface water presence rather than field soil moisture alone.',
      status: 'DEMO DATA'
    },
    vegetationNdvi: {
      source: 'MODIS (MOD13Q1 250m) & Landsat-HLS (30m)',
      currentNdvi: 0.54,
      ndviHealth: 'Moderate (Salinity stress in non-paddy patches)',
      temporalCurve: [
        { date: 'Jun 15', ndvi: 0.20, stage: 'Saline Fallow' },
        { date: 'Jul 15', ndvi: 0.38, stage: 'Rainfed Paddy Seedling' },
        { date: 'Aug 15', ndvi: 0.68, stage: 'Active Tillering' },
        { date: 'Sep 15', ndvi: 0.72, stage: 'Heading' },
        { date: 'Oct 15', ndvi: 0.65, stage: 'Grain filling' },
        { date: 'Nov 01', ndvi: 0.55, stage: 'Late Harvest' },
        { date: 'Nov 14', ndvi: 0.36, stage: 'Post-Harvest Desiccation' }
      ]
    }
  }
};
