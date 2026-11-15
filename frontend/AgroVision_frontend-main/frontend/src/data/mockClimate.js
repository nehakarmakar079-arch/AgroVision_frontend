// NASA POWER Agroclimatology Mock Data
// Daily and Monthly Gridded Climate Indicators (T2M, T2M_MAX, T2M_MIN, PRECTOTCORR, RH2M)
// Source: NASA Langley Research Center POWER Project (Resolution: 0.5 x 0.5 deg)
// Clearly labelled as DEMONSTRATION DATASET

export const MOCK_CLIMATE_BY_FARM = {
  'farm-bardhaman-01': {
    locationName: 'Purba Bardhaman, WB',
    coordinates: '23.23° N, 87.86° E',
    currentSnapshot: {
      temperature: 26.4, // deg C
      maxTemperature: 31.8,
      minTemperature: 19.5,
      relativeHumidity: 68, // %
      rainfallMonthlyToDate: 14.2, // mm
      solarRadiation: 18.4, // MJ/m^2/day
      soilMoistureEstimate: 0.28, // m^3/m^3 (SMAP Regional surface)
      observationDate: '2026-11-14',
      status: 'DEMO DATA (NASA POWER Format)'
    },
    monthlyTrends: [
      { month: 'Jan', tempMean: 18.2, tempMax: 25.1, tempMin: 12.0, rainfall: 12.5, rainfallNormal: 14.0, rh: 62 },
      { month: 'Feb', tempMean: 22.4, tempMax: 29.8, tempMin: 15.6, rainfall: 18.2, rainfallNormal: 22.0, rh: 58 },
      { month: 'Mar', tempMean: 27.8, tempMax: 35.2, tempMin: 20.4, rainfall: 24.6, rainfallNormal: 26.5, rh: 52 },
      { month: 'Apr', tempMean: 31.5, tempMax: 38.6, tempMin: 24.8, rainfall: 48.0, rainfallNormal: 54.0, rh: 59 },
      { month: 'May', tempMean: 32.1, tempMax: 38.2, tempMin: 26.3, rainfall: 125.4, rainfallNormal: 118.0, rh: 71 },
      { month: 'Jun', tempMean: 30.6, tempMax: 35.4, tempMin: 26.8, rainfall: 242.0, rainfallNormal: 255.0, rh: 82 },
      { month: 'Jul', tempMean: 29.2, tempMax: 32.8, tempMin: 26.0, rainfall: 334.8, rainfallNormal: 315.0, rh: 88 },
      { month: 'Aug', tempMean: 29.0, tempMax: 32.4, tempMin: 25.8, rainfall: 312.4, rainfallNormal: 298.0, rh: 87 },
      { month: 'Sep', tempMean: 28.8, tempMax: 32.6, tempMin: 25.2, rainfall: 228.6, rainfallNormal: 245.0, rh: 84 },
      { month: 'Oct', tempMean: 26.8, tempMax: 31.7, tempMin: 22.1, rainfall: 112.0, rainfallNormal: 95.0, rh: 76 },
      { month: 'Nov', tempMean: 22.5, tempMax: 28.9, tempMin: 16.8, rainfall: 14.2, rainfallNormal: 16.0, rh: 66 },
      { month: 'Dec', tempMean: 18.8, tempMax: 25.6, tempMin: 12.4, rainfall: 4.8, rainfallNormal: 6.5, rh: 64 }
    ],
    anomalies: {
      monsoonStatus: 'Normal withdrawal (+4% seasonal total)',
      heatwaveRisk: 'Low (Winter sowing underway)',
      delayedSowingRisk: 'Moderate: October rain (+17mm above normal) slightly delayed potato field drying.'
    }
  },
  'farm-hooghly-02': {
    locationName: 'Singur, Hooghly, WB',
    coordinates: '22.81° N, 88.23° E',
    currentSnapshot: {
      temperature: 27.1,
      maxTemperature: 32.2,
      minTemperature: 20.8,
      relativeHumidity: 71,
      rainfallMonthlyToDate: 16.0,
      solarRadiation: 17.8,
      soilMoistureEstimate: 0.31,
      observationDate: '2026-11-14',
      status: 'DEMO DATA (NASA POWER Format)'
    },
    monthlyTrends: [
      { month: 'Jan', tempMean: 19.1, tempMax: 25.8, tempMin: 12.9, rainfall: 10.5, rainfallNormal: 13.0, rh: 64 },
      { month: 'Feb', tempMean: 23.2, tempMax: 30.2, tempMin: 16.8, rainfall: 19.4, rainfallNormal: 21.0, rh: 60 },
      { month: 'Mar', tempMean: 28.1, tempMax: 35.0, tempMin: 21.6, rainfall: 28.2, rainfallNormal: 29.0, rh: 56 },
      { month: 'Apr', tempMean: 31.2, tempMax: 37.8, tempMin: 25.1, rainfall: 56.4, rainfallNormal: 58.0, rh: 63 },
      { month: 'May', tempMean: 31.8, tempMax: 37.2, tempMin: 26.5, rainfall: 138.2, rainfallNormal: 130.0, rh: 74 },
      { month: 'Jun', tempMean: 30.2, tempMax: 34.8, tempMin: 26.7, rainfall: 268.0, rainfallNormal: 275.0, rh: 84 },
      { month: 'Jul', tempMean: 29.1, tempMax: 32.5, tempMin: 26.1, rainfall: 348.5, rainfallNormal: 330.0, rh: 89 },
      { month: 'Aug', tempMean: 28.9, tempMax: 32.1, tempMin: 25.9, rainfall: 324.0, rainfallNormal: 310.0, rh: 88 },
      { month: 'Sep', tempMean: 28.7, tempMax: 32.3, tempMin: 25.4, rainfall: 242.0, rainfallNormal: 250.0, rh: 86 },
      { month: 'Oct', tempMean: 27.0, tempMax: 31.9, tempMin: 22.8, rainfall: 128.0, rainfallNormal: 105.0, rh: 78 },
      { month: 'Nov', tempMean: 23.1, tempMax: 29.2, tempMin: 17.5, rainfall: 16.0, rainfallNormal: 18.0, rh: 69 },
      { month: 'Dec', tempMean: 19.4, tempMax: 26.0, tempMin: 13.2, rainfall: 6.2, rainfallNormal: 7.0, rh: 66 }
    ],
    anomalies: {
      monsoonStatus: 'Well distributed monsoon (+5% vs 10-year normal)',
      heatwaveRisk: 'Minimal during current rabi transition',
      delayedSowingRisk: 'Favorable soil moisture for winter mustard/vegetables.'
    }
  },
  'farm-gosaba-03': {
    locationName: 'Gosaba, Sundarbans, WB',
    coordinates: '22.16° N, 88.81° E',
    currentSnapshot: {
      temperature: 27.8,
      maxTemperature: 31.5,
      minTemperature: 22.4,
      relativeHumidity: 79,
      rainfallMonthlyToDate: 28.4,
      solarRadiation: 17.2,
      soilMoistureEstimate: 0.38,
      observationDate: '2026-11-14',
      status: 'DEMO DATA (NASA POWER Format)'
    },
    monthlyTrends: [
      { month: 'Jan', tempMean: 20.2, tempMax: 26.2, tempMin: 14.8, rainfall: 14.0, rainfallNormal: 15.0, rh: 68 },
      { month: 'Feb', tempMean: 24.0, tempMax: 29.8, tempMin: 18.5, rainfall: 22.5, rainfallNormal: 24.0, rh: 66 },
      { month: 'Mar', tempMean: 28.4, tempMax: 33.8, tempMin: 23.2, rainfall: 34.0, rainfallNormal: 35.0, rh: 65 },
      { month: 'Apr', tempMean: 30.6, tempMax: 35.5, tempMin: 26.0, rainfall: 72.0, rainfallNormal: 70.0, rh: 72 },
      { month: 'May', tempMean: 31.0, tempMax: 35.2, tempMin: 27.1, rainfall: 184.0, rainfallNormal: 175.0, rh: 80 },
      { month: 'Jun', tempMean: 29.8, tempMax: 33.5, tempMin: 26.9, rainfall: 350.0, rainfallNormal: 360.0, rh: 88 },
      { month: 'Jul', tempMean: 28.9, tempMax: 31.8, tempMin: 26.3, rainfall: 460.0, rainfallNormal: 440.0, rh: 92 },
      { month: 'Aug', tempMean: 28.8, tempMax: 31.6, tempMin: 26.2, rainfall: 425.0, rainfallNormal: 410.0, rh: 91 },
      { month: 'Sep', tempMean: 28.6, tempMax: 31.7, tempMin: 25.8, rainfall: 320.0, rainfallNormal: 330.0, rh: 89 },
      { month: 'Oct', tempMean: 27.5, tempMax: 31.4, tempMin: 23.9, rainfall: 175.0, rainfallNormal: 145.0, rh: 82 },
      { month: 'Nov', tempMean: 24.2, tempMax: 29.6, tempMin: 19.2, rainfall: 28.4, rainfallNormal: 32.0, rh: 75 },
      { month: 'Dec', tempMean: 20.8, tempMax: 26.8, tempMin: 15.2, rainfall: 8.5, rainfallNormal: 10.0, rh: 70 }
    ],
    anomalies: {
      monsoonStatus: 'High cyclonic depression activity observed in late October',
      heatwaveRisk: 'Maritime humidity dampens diurnal variation',
      delayedSowingRisk: 'Salinity spike expected from Jan–May as standing water evaporates.'
    }
  }
};
