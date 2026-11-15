// Farm Recovery Timeline & Field Evidence Mock Data
// Supports BEFORE, DURING, and AFTER agricultural recovery workflows

export const MOCK_RECOVERY_TIMELINES = {
  'farm-bardhaman-01': {
    currentStatus: 'Evidence Updated (Under Monitoring)',
    statusBadgeColor: 'info',
    recoveryScorePercent: 78,
    events: [
      {
        id: 'evt-1',
        date: '2026-10-14',
        type: 'CLIMATE_SIGNAL (BEFORE)',
        title: 'Unseasonal Late-Monsoon Rainfall Recorded',
        description: 'NASA GPM recorded 62mm rainfall over 48 hours during late October, causing temporary field saturation.',
        source: 'NASA GPM IMERG',
        verified: true
      },
      {
        id: 'evt-2',
        date: '2026-10-22',
        type: 'FIELD_EVIDENCE (DURING)',
        title: 'Farmer Logged Field Drainage Photo',
        description: 'Standing water drained through perimeter channels. Potato land preparation delayed by 8 days.',
        source: 'Farmer Field Upload',
        verified: true,
        photoUrl: '/assets/sample-field-drained.jpg'
      },
      {
        id: 'evt-3',
        date: '2026-11-04',
        type: 'SATELLITE_OBSERVATION (DURING)',
        title: 'Soil Moisture Stabilized (SMAP)',
        description: 'SMAP surface soil moisture returned to normal range (0.28 cm³/cm³), allowing power-tiller operations.',
        source: 'NASA SMAP L4',
        verified: true
      },
      {
        id: 'evt-4',
        date: '2026-11-12',
        type: 'RECOVERY_STEP (AFTER)',
        title: 'Potato Sowing Completed & Next-Crop Planning',
        description: 'Kufri Jyoti planted with furrow irrigation. Recommended Plan A (Mustard-Moong rotation) under farmer review for following season.',
        source: 'AgroVision Advisory',
        verified: false
      }
    ]
  },
  'farm-gosaba-03': {
    currentStatus: 'Follow-up Required (Salinity Monitoring)',
    statusBadgeColor: 'warning',
    recoveryScorePercent: 62,
    events: [
      {
        id: 'evt-c1',
        date: '2026-09-28',
        type: 'CYCLONIC_SIGNAL (BEFORE)',
        title: 'Bay of Bengal Deep Depression Surge Alert',
        description: 'High tidal swell accompanied 94mm precipitation in Gosaba block.',
        source: 'NASA GPM IMERG',
        verified: true
      },
      {
        id: 'evt-c2',
        date: '2026-10-18',
        type: 'FIELD_TEST (DURING)',
        title: 'Salinity Incursion Testing (CSSRI)',
        description: 'Post-monsoon surface soil EC measured at 4.8 dS/m. Alert triggered against planting high-water summer rice.',
        source: 'Laboratory Soil Test',
        verified: true
      },
      {
        id: 'evt-c3',
        date: '2026-11-08',
        type: 'RECOVERY_STEP (AFTER)',
        title: 'Straw Mulch & Relay Khesari Strategy Adopted',
        description: 'Zero-tillage broadcasting of Khesari into standing paddy stubble to conserve moisture and suppress salt rising.',
        source: 'AgroVision Recovery Protocol',
        verified: true
      }
    ]
  }
};
