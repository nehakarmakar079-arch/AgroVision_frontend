// West Bengal Crop Catalog & Validated Crop Rotation Alternatives
// Grounded in BCKV (Bidhan Chandra Krishi Viswavidyalaya) agronomic guidelines

export const WEST_BENGAL_CROPS = [
  {
    id: 'crop-aman-paddy',
    name: 'Aman Paddy (Kharif Rice)',
    localName: 'আমন ধান',
    season: 'Kharif (Monsoon)',
    sowingWindow: 'June – July',
    harvestWindow: 'October – November',
    durationDays: '120–140 days',
    waterRequirementMm: '1100–1250 mm',
    soilPreference: 'Clay to clay-loam, water-retentive',
    family: 'Poaceae (Gramineae)',
    waterStressTolerance: 'Low (requires standing water during tillering)',
    salinityTolerance: 'Low to Moderate (Salt varieties: Nonabokra, Gosaba-1)',
    nutrientDemand: 'High (N-P-K exhaustive)'
  },
  {
    id: 'crop-boro-paddy',
    name: 'Boro Paddy (Summer Rice)',
    localName: 'বোরো ধান',
    season: 'Boro (Winter-Summer)',
    sowingWindow: 'December – January',
    harvestWindow: 'April – May',
    durationDays: '135–150 days',
    waterRequirementMm: '1300–1500 mm (Heavy irrigation)',
    soilPreference: 'Clay loam, high water table',
    family: 'Poaceae',
    waterStressTolerance: 'Very Low (Requires continuous groundwater pumping)',
    salinityTolerance: 'Low',
    nutrientDemand: 'Very High',
    environmentalNote: 'Heavy groundwater extraction in alluvial belts causing aquifer depletion.'
  },
  {
    id: 'crop-potato',
    name: 'Potato (Kufri Jyoti / Pukhraj)',
    localName: 'আলু',
    season: 'Rabi (Winter)',
    sowingWindow: 'November – Early December',
    harvestWindow: 'February – Early March',
    durationDays: '85–100 days',
    waterRequirementMm: '400–500 mm',
    soilPreference: 'Well-drained sandy loam, rich in organic matter',
    family: 'Solanaceae',
    waterStressTolerance: 'Moderate',
    salinityTolerance: 'Low (susceptible to tip burn)',
    nutrientDemand: 'Very High (heavy potash and phosphorus user)'
  },
  {
    id: 'crop-mustard',
    name: 'Mustard (Brassica juncea)',
    localName: 'সরিষা',
    season: 'Rabi (Winter)',
    sowingWindow: 'October – November',
    harvestWindow: 'January – February',
    durationDays: '85–95 days',
    waterRequirementMm: '250–350 mm (Low water requirement)',
    soilPreference: 'Loam to sandy loam, moderate fertility',
    family: 'Brassicaceae',
    waterStressTolerance: 'High',
    salinityTolerance: 'Moderate',
    nutrientDemand: 'Medium',
    environmentalNote: 'Excellent low-water catch crop; breaks solanaceous disease cycles.'
  },
  {
    id: 'crop-moong',
    name: 'Green Gram / Moong (Summer)',
    localName: 'মুগ ডাল',
    season: 'Pre-Kharif / Zaid',
    sowingWindow: 'February – March',
    harvestWindow: 'April – May',
    durationDays: '60–70 days (Short duration)',
    waterRequirementMm: '200–250 mm',
    soilPreference: 'Well-drained loam to alluvial soil',
    family: 'Fabaceae (Legume)',
    waterStressTolerance: 'High',
    salinityTolerance: 'Moderate',
    nutrientDemand: 'Low (Fixes 35–45 kg atmospheric N/ha into soil)',
    environmentalNote: 'Biological Nitrogen Fixation; enriches soil fertility for the following Kharif paddy.'
  },
  {
    id: 'crop-sesame',
    name: 'Sesame / Til (Summer)',
    localName: 'তিল',
    season: 'Pre-Kharif / Zaid',
    sowingWindow: 'February – March',
    harvestWindow: 'May',
    durationDays: '75–85 days',
    waterRequirementMm: '200–300 mm',
    soilPreference: 'Sandy loam to alluvial loam',
    family: 'Pedaliaceae',
    waterStressTolerance: 'Very High (Deep taproot)',
    salinityTolerance: 'Moderate',
    nutrientDemand: 'Low to Medium',
    environmentalNote: 'Grows with residual soil moisture post-potato harvest with minimal irrigation.'
  },
  {
    id: 'crop-jute',
    name: 'Jute (Tossa Jute)',
    localName: 'পাট',
    season: 'Pre-Kharif to Kharif',
    sowingWindow: 'March – April',
    harvestWindow: 'July – August',
    durationDays: '110–120 days',
    waterRequirementMm: '500–600 mm (Rainfed / Pre-monsoon showers)',
    soilPreference: 'Rich alluvial soil, silt loam',
    family: 'Malvaceae',
    waterStressTolerance: 'Moderate to High',
    salinityTolerance: 'Low to Moderate',
    nutrientDemand: 'Medium (Adds massive leaf litter biomass: 3–4 tonnes/ha)',
    environmentalNote: 'Naturally restores organic carbon through shed leaves before rice transplanting.'
  },
  {
    id: 'crop-grass-pea',
    name: 'Grass Pea / Khesari (Paira/Relay)',
    localName: 'খেসারি',
    season: 'Rabi (Winter Relay)',
    sowingWindow: 'November (broadcast into standing rice)',
    harvestWindow: 'February',
    durationDays: '90–100 days',
    waterRequirementMm: '150–200 mm (Zero irrigation needed)',
    soilPreference: 'Coastal clay to heavy alluvium',
    family: 'Fabaceae (Legume)',
    waterStressTolerance: 'Extremely High',
    salinityTolerance: 'High (Tolerates moderate dry-season coastal salinity)',
    nutrientDemand: 'Low (Nitrogen-fixing)',
    environmentalNote: 'Ideal relay crop in coastal delta where winter tillage triggers salt capillary rise.'
  }
];

export const MOCK_ROTATION_RECOMMENDATIONS = {
  'farm-bardhaman-01': [
    {
      id: 'plan-1',
      title: 'Plan A: Soil-Restoring Pulse & Oilseed Diversification',
      sequence: 'Aman Paddy → Mustard → Moong (Green Gram)',
      timing: [
        { crop: 'Aman Paddy', window: 'Jul – Oct', duration: '115 days', type: 'Cereal' },
        { crop: 'Mustard', window: 'Nov – Jan', duration: '90 days', type: 'Oilseed' },
        { crop: 'Moong (Green Gram)', window: 'Feb – Apr', duration: '65 days', type: 'Legume' },
        { crop: 'Fallow / Green Manure', window: 'May – Jun', duration: '50 days', type: 'Rest' }
      ],
      waterBalance: {
        estimatedSavings: '42% less water compared to continuous Boro Rice',
        groundwaterImpact: 'Positive (prevents summer tube-well drawdown)',
        riskLevel: 'Low'
      },
      soilBenefit: {
        nitrogenContribution: '+35 to 45 kg N/ha biological fixation from Moong roots',
        organicCarbon: 'Improves active carbon fractions, resting soil during peak May heat'
      },
      pestCycleBreak: 'High: Switching from Poaceae (Rice) to Brassicaceae (Mustard) breaks Stem Borer and Brown Planthopper carryover.',
      limitations: 'Farmer must protect early-sown Moong pods from unseasonal April thundershowers (Kalbaishakhi).'
    },
    {
      id: 'plan-2',
      title: 'Plan B: Water-Conserving Commercial Rotation',
      sequence: 'Early Aman Paddy → Potato → Sesame (Til)',
      timing: [
        { crop: 'Early Aman Paddy', window: 'Jul – Oct', duration: '105 days', type: 'Cereal' },
        { crop: 'Potato', window: 'Nov – Feb', duration: '90 days', type: 'Tuber / Commercial' },
        { crop: 'Sesame (Til)', window: 'Mar – May', duration: '75 days', type: 'Oilseed' },
        { crop: 'Land Prep / Puddling', window: 'Jun', duration: '30 days', type: 'Rest' }
      ],
      waterBalance: {
        estimatedSavings: '28% less water than Boro Rice; Sesame utilizes residual moisture',
        groundwaterImpact: 'Moderate',
        riskLevel: 'Low'
      },
      soilBenefit: {
        nitrogenContribution: 'Neutral; requires balanced chemical/organic split for Potato',
        organicCarbon: 'Sesame deep taproots break subsoil compaction pan caused by repeated puddling'
      },
      pestCycleBreak: 'Moderate: Breaks bacterial wilt and potato cyst nematode cycles with dry summer sesame.',
      limitations: 'High initial capital investment for certified potato seed tubers.'
    }
  ],
  'farm-hooghly-02': [
    {
      id: 'plan-1',
      title: 'Plan A: Sustainable Fiber-Cereal-Pulse Rotation',
      sequence: 'Jute → Aman Paddy → Lentil / Mustard',
      timing: [
        { crop: 'Jute', window: 'Mar – Jun', duration: '110 days', type: 'Fiber' },
        { crop: 'Aman Paddy', window: 'Jul – Oct', duration: '115 days', type: 'Cereal' },
        { crop: 'Mustard / Lentil', window: 'Nov – Feb', duration: '85 days', type: 'Oilseed/Pulse' }
      ],
      waterBalance: {
        estimatedSavings: '35% water savings; Jute utilizes pre-monsoon showers',
        groundwaterImpact: 'Low stress on aquifers',
        riskLevel: 'Low'
      },
      soilBenefit: {
        nitrogenContribution: 'Legume relay fixes atmospheric nitrogen; Jute leaf fall adds 3 t/ha biomass',
        organicCarbon: 'Highest organic carbon restoration among alluvial cropping systems'
      },
      pestCycleBreak: 'Very High: 3 distinct plant families (Malvaceae → Poaceae → Brassicaceae) completely resets pest cycles.',
      limitations: 'Requires access to clean freshwater ponds or retting tanks for fiber extraction in July.'
    }
  ],
  'farm-gosaba-03': [
    {
      id: 'plan-1',
      title: 'Plan A: Coastal Salinity-Adaptive Relay Cycle',
      sequence: 'Salt-Tolerant Aman Paddy → Relay Grass Pea (Khesari) → Mulched Summer Fallow',
      timing: [
        { crop: 'Salt-Tolerant Paddy (Gosaba-1)', window: 'Jul – Nov', duration: '130 days', type: 'Saline-Tolerant Cereal' },
        { crop: 'Relay Grass Pea (Khesari)', window: 'Dec – Feb', duration: '80 days', type: 'Saline-Tolerant Legume' },
        { crop: 'Straw Mulch / Green Fallow', window: 'Mar – Jun', duration: '110 days', type: 'Salinity Suppression' }
      ],
      waterBalance: {
        estimatedSavings: 'Zero groundwater extraction (prevents saline intrusion into sweet water layer)',
        groundwaterImpact: 'Preserves shallow drinking aquifers',
        riskLevel: 'Moderate (dependent on monsoon flush)'
      },
      soilBenefit: {
        nitrogenContribution: 'Relay legume provides living soil cover and atmospheric nitrogen',
        organicCarbon: 'Mulching during March–May prevents evaporation-driven capillary salt accumulation'
      },
      pestCycleBreak: 'High: Naturally adapted coastal species with minimal chemical pesticide need.',
      limitations: 'Soil EC must be measured in December before legume germination; if EC > 6 dS/m, use straw mulch only.'
    }
  ]
};
