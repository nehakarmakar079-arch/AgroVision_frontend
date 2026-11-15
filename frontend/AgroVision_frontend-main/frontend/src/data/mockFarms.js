// Demonstration Farm Profiles and West Bengal Geography
// Clearly designated as DEMO PROFILES per NASA Space Apps requirements

export const WEST_BENGAL_DISTRICTS = [
  'Purba Bardhaman',
  'Hooghly',
  'South 24 Parganas',
  'North 24 Parganas',
  'Nadia',
  'Murshidabad',
  'Purba Medinipur',
  'Paschim Medinipur',
  'Bankura',
  'Purulia',
  'Birbhum',
  'Malda',
  'Uttar Dinajpur',
  'Dakshin Dinajpur',
  'Jalpaiguri',
  'Alipurduar',
  'Cooch Behar',
  'Darjeeling',
  'Kalimpong',
  'Howrah',
  'Kolkata',
  'Jhargram',
  'Paschim Bardhaman'
];

export const DEMO_FARMS = [
  {
    id: 'farm-bardhaman-01',
    name: 'Burdwan Alluvial Demo Plot',
    farmerName: 'Subhasish Mondal',
    state: 'West Bengal',
    district: 'Purba Bardhaman',
    block: 'Memari-I',
    village: 'Bagila',
    coordinates: {
      latitude: 23.2324,
      longitude: 87.8615
    },
    area: 4.5,
    areaUnit: 'Bigha', // 1 Bigha ~ 0.3306 Acre (West Bengal)
    areaInAcres: 1.49,
    farmType: 'Irrigated Alluvial',
    soilType: 'Gangetic Alluvium (Sandy Clay Loam)',
    mainCrop: 'Aman Paddy',
    currentRotation: [
      { month: 'Jan', crop: 'Potato', stage: 'Bulb enlargement' },
      { month: 'Feb', crop: 'Potato', stage: 'Maturity / Harvest' },
      { month: 'Mar', crop: 'Sesame', stage: 'Sowing / Vegetative' },
      { month: 'Apr', crop: 'Sesame', stage: 'Flowering' },
      { month: 'May', crop: 'Sesame', stage: 'Harvesting' },
      { month: 'Jun', crop: 'Fallow / Prep', stage: 'Land Puddling' },
      { month: 'Jul', crop: 'Aman Paddy', stage: 'Transplanting' },
      { month: 'Aug', crop: 'Aman Paddy', stage: 'Tillering' },
      { month: 'Sep', crop: 'Aman Paddy', stage: 'Panicle Initiation' },
      { month: 'Oct', crop: 'Aman Paddy', stage: 'Harvesting' },
      { month: 'Nov', crop: 'Potato', stage: 'Land Prep & Sowing' },
      { month: 'Dec', crop: 'Potato', stage: 'Vegetative growth' }
    ],
    lastAnalysisDate: '2026-11-12',
    status: 'Demo Profile Active',
    agroClimaticZone: 'Old Alluvial Zone',
    description: 'Intensive agricultural belt with high cropping intensity. Often faces groundwater depletion during Boro rice or late-winter unseasonal rainfall affecting potato harvest.'
  },
  {
    id: 'farm-hooghly-02',
    name: 'Hooghly Multi-Crop Demo Farm',
    farmerName: 'Pranab Ghosh',
    state: 'West Bengal',
    district: 'Hooghly',
    block: 'Singur',
    village: 'Beraberi',
    coordinates: {
      latitude: 22.8126,
      longitude: 88.2312
    },
    area: 3.0,
    areaUnit: 'Bigha',
    areaInAcres: 0.99,
    farmType: 'Semi-Irrigated Medium Land',
    soilType: 'Clay Loam with High Organic Matter',
    mainCrop: 'Jute & Paddy',
    currentRotation: [
      { month: 'Jan', crop: 'Mustard', stage: 'Pod filling' },
      { month: 'Feb', crop: 'Mustard', stage: 'Harvest' },
      { month: 'Mar', crop: 'Jute', stage: 'Sowing & Early growth' },
      { month: 'Apr', crop: 'Jute', stage: 'Active growth' },
      { month: 'May', crop: 'Jute', stage: 'Active growth' },
      { month: 'Jun', crop: 'Jute', stage: 'Harvesting & Retting' },
      { month: 'Jul', crop: 'Aman Paddy', stage: 'Transplanting' },
      { month: 'Aug', crop: 'Aman Paddy', stage: 'Tillering' },
      { month: 'Sep', crop: 'Aman Paddy', stage: 'Flowering' },
      { month: 'Oct', crop: 'Aman Paddy', stage: 'Harvesting' },
      { month: 'Nov', crop: 'Mustard', stage: 'Sowing' },
      { month: 'Dec', crop: 'Mustard', stage: 'Vegetative' }
    ],
    lastAnalysisDate: '2026-11-10',
    status: 'Demo Profile Active',
    agroClimaticZone: 'New Alluvial Zone',
    description: 'General diversified commercial cropping scenario. Jute-paddy-oilseed cycle balances water demand and provides good crop canopy coverage.'
  },
  {
    id: 'farm-gosaba-03',
    name: 'Gosaba Coastal & Delta Demo Farm',
    farmerName: 'Amal Halder',
    state: 'West Bengal',
    district: 'South 24 Parganas',
    block: 'Gosaba',
    village: 'Satjelia',
    coordinates: {
      latitude: 22.1648,
      longitude: 88.8062
    },
    area: 5.0,
    areaUnit: 'Bigha',
    areaInAcres: 1.65,
    farmType: 'Coastal Saline Lowland',
    soilType: 'Saline Coastal Clay',
    mainCrop: 'Rainfed Aman Paddy',
    currentRotation: [
      { month: 'Jan', crop: 'Fallow (High Salinity)', stage: 'Land Resting' },
      { month: 'Feb', crop: 'Fallow (High Salinity)', stage: 'Land Resting' },
      { month: 'Mar', crop: 'Fallow (High Salinity)', stage: 'Land Resting' },
      { month: 'Apr', crop: 'Fallow (High Salinity)', stage: 'Pre-monsoon prep' },
      { month: 'May', crop: 'Land Preparation', stage: 'Desalinization leaching' },
      { month: 'Jun', crop: 'Salt-Tolerant Paddy', stage: 'Seedbed nursery' },
      { month: 'Jul', crop: 'Salt-Tolerant Paddy', stage: 'Transplanting' },
      { month: 'Aug', crop: 'Salt-Tolerant Paddy', stage: 'Tillering' },
      { month: 'Sep', crop: 'Salt-Tolerant Paddy', stage: 'Flowering' },
      { month: 'Oct', crop: 'Salt-Tolerant Paddy', stage: 'Grain filling' },
      { month: 'Nov', crop: 'Salt-Tolerant Paddy', stage: 'Harvesting' },
      { month: 'Dec', crop: 'Grass Pea (Khesari)', stage: 'Relay cropping / Fallow' }
    ],
    lastAnalysisDate: '2026-11-14',
    status: 'Demo Profile Active',
    agroClimaticZone: 'Coastal Saline Delta (Sundarbans)',
    description: 'Vulnerable coastal delta prone to tidal storm surges, river dyke breaches, and high dry-season soil electrical conductivity (EC). Requires saline-resilient varieties and freshwater retention.'
  }
];
