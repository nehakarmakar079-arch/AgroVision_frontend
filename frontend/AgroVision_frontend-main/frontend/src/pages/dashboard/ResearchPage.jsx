import React from 'react';
import { 
  Microscope, 
  Satellite, 
  Database, 
  ShieldCheck, 
  FileCheck, 
  Info,
  ExternalLink
} from 'lucide-react';

const DATASET_PROVENANCE = [
  {
    dataset: 'NASA POWER Project',
    product: 'Daily & Monthly Agroclimatology (Release 8)',
    mission: 'GEOS-5 FP-IT Atmospheric Assimilation & CERES Satellite Radiation',
    spatialResolution: '0.5° x 0.5° (~50 km)',
    temporalCadence: 'Daily / Monthly (1981–Present)',
    parameters: 'T2M, T2M_MAX, T2M_MIN, PRECTOTCORR, RH2M, ALLSKY_SFC_SW_DWN',
    roleInAgroVision: 'Provides historical 10-year climatological normals, thermal envelopes, and precipitation anomalies.',
    scientificLimitation: 'Gridded resolution does not capture localized micro-plot tree canopy shading or narrow canal evaporation.'
  },
  {
    dataset: 'NASA GPM IMERG',
    product: 'V07B Final Run Calibrated Multi-Satellite',
    mission: 'Global Precipitation Measurement Core Observatory & Constellation',
    spatialResolution: '0.1° x 0.1° (~10 km)',
    temporalCadence: '30-minute / Daily Accumulation',
    parameters: 'precipitationCal, precipitationRate',
    roleInAgroVision: 'Used for 7-day and 30-day cumulative precipitation screening to detect waterlogging and flood risks.',
    scientificLimitation: 'Radar/microwave precipitation estimates require in-situ rain gauge calibration; localized cloud bursts may vary.'
  },
  {
    dataset: 'NASA SMAP',
    product: 'L4 Global Surface and Root-Zone Soil Moisture',
    mission: 'Soil Moisture Active Passive (L-Band Radiometer)',
    spatialResolution: '9 km gridded',
    temporalCadence: '3-hourly assimilation',
    parameters: 'sm_surface (0-5cm), sm_rootzone (0-100cm)',
    roleInAgroVision: 'Establishes regional soil water availability and drying trends to evaluate post-monsoon sowing readiness.',
    scientificLimitation: 'Does not replace in-situ tensiometers or soil gravimetric testing for smallholder 1-bigha plots.'
  },
  {
    dataset: 'NASA HLS & Terra/Aqua MODIS',
    product: 'H30 / S30 (30m HLS) & MOD13Q1 (250m MODIS)',
    mission: 'Landsat-8/9 OLI, Sentinel-2 MSI, Terra/Aqua MODIS',
    spatialResolution: '30m (HLS) / 250m (MODIS)',
    temporalCadence: '2–3 days (HLS combined) / 16-day (MODIS)',
    parameters: 'NDVI (Normalized Difference Vegetation Index), EVI',
    roleInAgroVision: 'Monitors vegetative canopy greenness and emergence trajectories across Kharif and Rabi cycles.',
    scientificLimitation: 'Optical sensors are obstructed by monsoon cloud cover; HLS interpolation is required during June–August.'
  },
  {
    dataset: 'ISRIC SoilGrids 2.0',
    product: 'Machine Learning Global Gridded Soil Predictions',
    mission: 'ISRIC - World Soil Information',
    spatialResolution: '250m gridded',
    temporalCadence: 'Static Baseline',
    parameters: 'phh2o, clay, sand, silt, soc (soil organic carbon), cec',
    roleInAgroVision: 'Provides baseline soil textural classification and pH expectations for West Bengal blocks.',
    scientificLimitation: 'Modeled statistical estimates. Satellites do not measure soil NPK directly; direct lab tests are essential.'
  },
  {
    dataset: 'FAO GAEZ v4',
    product: 'Global Agro-Ecological Zones Model',
    mission: 'Food and Agriculture Organization (FAO) & IIASA',
    spatialResolution: '5 arc-minute (~9 km)',
    temporalCadence: 'Agro-Ecological Climatological Baseline',
    parameters: 'Crop suitability classes under rainfed and irrigated conditions',
    roleInAgroVision: 'Validates regional crop suitability envelopes against local BCKV crop calendar recommendations.',
    scientificLimitation: 'Suitability models reflect macro-climatic potential, not micro-economic mandi price fluctuations.'
  }
];

export default function ResearchPage() {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.25rem' }}>
          Research Workspace & NASA Data Provenance
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
          Technical specifications, spatial resolutions, calibration sources, and scientific validation transparency.
        </p>
      </div>

      {/* Scientific Commitment Overview */}
      <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--color-satellite-blue)' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
          <Microscope size={22} style={{ color: 'var(--color-satellite-blue)' }} />
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-dark-blue)', margin: 0 }}>
            Scientific Integrity & Resolution Awareness
          </h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-dark)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
          In agricultural remote sensing, transparency regarding spatial resolution is essential. AgroVision explicitly differentiates regional atmospheric context (NASA POWER at $50\text{km}$), synoptic precipitation (GPM at $10\text{km}$), and surface canopy reflectance (HLS at $30\text{m}$).
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <div>✓ No false claims of satellite-derived N-P-K chemical fertility.</div>
          <div>✓ Explicit spatial resolution labelling on all user interface cards.</div>
          <div>✓ Ground-truth integration through direct farmer photo evidence logging.</div>
          <div>✓ Strict coordinate privacy policy: coordinates are never publicly broadcast.</div>
        </div>
      </div>

      {/* Exhaustive NASA Provenance Table */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Database size={20} style={{ color: 'var(--color-agri-green)' }} />
            NASA Earth Observing System (EOS) Data Provenance Matrix
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Open Science Attribution</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-soft-bg)', borderBottom: '2px solid var(--color-border)', color: 'var(--color-dark-blue)' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>Source & Product</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Spatial Resolution</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Parameters</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>AgroVision Function</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Scientific Limitation</th>
              </tr>
            </thead>
            <tbody>
              {DATASET_PROVENANCE.map((ds, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <strong style={{ color: 'var(--color-dark-blue)' }}>{ds.dataset}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-satellite-blue)' }}>{ds.product}</div>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                    {ds.spatialResolution}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {ds.parameters}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-text-dark)' }}>
                    {ds.roleInAgroVision}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                    {ds.scientificLimitation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation & Future Research Section */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>
          <FileCheck size={20} style={{ color: 'var(--color-satellite-blue)' }} />
          Ground-Truthing & Agronomic Validation Roadmap
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
          The AgroVision pilot architecture has been calibrated against published regional agro-ecological trials from <strong>Bidhan Chandra Krishi Viswavidyalaya (BCKV)</strong>, Mohanpur, West Bengal, and the <strong>Central Soil Salinity Research Institute (CSSRI)</strong>, Regional Research Station, Canning Town.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', fontSize: '0.82rem' }}>
          <div style={{ padding: '0.85rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--color-dark-blue)' }}>Phase 1 Validation:</strong>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-muted)' }}>
              Synthetic stress testing using historical NASA POWER 10-year normals across Burdwan alluvial and Gosaba coastal coordinates.
            </p>
          </div>
          <div style={{ padding: '0.85rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--color-dark-blue)' }}>Phase 2 Validation (Field Deployment):</strong>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-muted)' }}>
              Pairing mobile farmer photo uploads with automated HLS 30m NDVI anomaly alerts for early waterlogging response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
