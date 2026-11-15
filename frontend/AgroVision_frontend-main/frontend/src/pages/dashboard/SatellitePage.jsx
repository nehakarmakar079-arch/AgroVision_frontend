import React, { useState, useEffect } from 'react';
import { useFarm } from '../../context/FarmContext';
import { satelliteService } from '../../services/satelliteService';
import DataSourceCard from '../../components/common/DataSourceCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Satellite, Droplets, Layers, Sprout, Info, ShieldAlert } from 'lucide-react';

export default function SatellitePage() {
  const { activeFarm } = useFarm();
  const [satData, setSatData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSat() {
      if (!activeFarm) return;
      setLoading(true);
      try {
        const res = await satelliteService.getSatelliteObservations(activeFarm.id);
        setSatData(res.data);
      } catch (err) {
        console.error('Failed to load satellite data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSat();
  }, [activeFarm]);

  if (!activeFarm || !satData) {
    return <div className="card" style={{ padding: '2rem' }}>Loading NASA Satellite Observations...</div>;
  }

  const { gpmRainfall, smapSoilMoisture, vegetationNdvi } = satData;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.25rem' }}>
          Satellite Environmental Monitoring
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
          Multi-mission observations from <strong>GPM IMERG</strong>, <strong>SMAP</strong>, and <strong>MODIS/HLS</strong> for {activeFarm.district}.
        </p>
      </div>

      {/* THREE MISSIONS SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-6" style={{ marginBottom: '1.5rem' }}>
        
        {/* Mission 1: GPM Rainfall */}
        <div className="card">
          <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
            <span className="badge badge-satellite">NASA GPM IMERG</span>
            <Droplets size={20} style={{ color: 'var(--color-satellite-blue)' }} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-dark-blue)', marginBottom: '0.5rem' }}>
            Precipitation Accumulation
          </h3>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-dark-blue)' }}>
            {gpmRainfall?.sevenDayAccumulation} mm
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
            7-Day Precipitation Accumulation • Rate: {gpmRainfall?.rainfallRateMmHr} mm/hr
          </div>
          <div style={{ padding: '0.5rem 0.75rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
            <strong>30-Day Total:</strong> {gpmRainfall?.thirtyDayAccumulation} mm ({gpmRainfall?.floodRiskIndex})
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
            Resolution: {gpmRainfall?.spatialResolution}
          </div>
        </div>

        {/* Mission 2: SMAP Soil Moisture */}
        <div className="card">
          <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
            <span className="badge badge-satellite">NASA SMAP L4</span>
            <Layers size={20} style={{ color: 'var(--color-agri-green)' }} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-dark-blue)', marginBottom: '0.5rem' }}>
            Surface & Root-Zone Moisture
          </h3>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-agri-green)' }}>
            {smapSoilMoisture?.surfaceMoisture}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
            Root Zone: {smapSoilMoisture?.rootZoneMoisture}
          </div>
          <div style={{ padding: '0.5rem 0.75rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
            <strong>Seasonal Anomaly:</strong> {smapSoilMoisture?.moistureAnomaly}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
            Resolution: {smapSoilMoisture?.spatialResolution}
          </div>
        </div>

        {/* Mission 3: MODIS/HLS NDVI */}
        <div className="card">
          <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
            <span className="badge badge-satellite">MODIS & HLS</span>
            <Sprout size={20} style={{ color: 'var(--color-lime-green)' }} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-dark-blue)', marginBottom: '0.5rem' }}>
            Vegetation Index (NDVI)
          </h3>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-dark-blue)' }}>
            {vegetationNdvi?.currentNdvi}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-agri-green)', fontWeight: 600, marginBottom: '0.75rem' }}>
            {vegetationNdvi?.ndviHealth}
          </div>
          <div style={{ padding: '0.5rem 0.75rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
            <strong>Source:</strong> {vegetationNdvi?.source}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
            Resolution: 30m (HLS) / 250m (MODIS)
          </div>
        </div>
      </div>

      {/* NDVI TEMPORAL CURVE */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Sprout size={20} style={{ color: 'var(--color-agri-green)' }} />
            Seasonal Vegetation Biomass Curve (NDVI)
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>June – November Timeline</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
          Tracking the trajectory of green canopy development from Kharif paddy tillering through maturity, harvest, and subsequent Rabi sowing emergence.
        </p>

        <div style={{ height: '280px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vegetationNdvi?.temporalCurve || []} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
              <YAxis domain={[0, 1.0]} stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                formatter={(val, name, item) => [`${val} (${item.payload.stage})`, 'NDVI']}
              />
              <Line type="monotone" dataKey="ndvi" name="Canopy Greenness" stroke="var(--color-agri-green)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-lime-green)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scientific Resolution Disclaimer */}
      <div className="alert-strip alert-strip-info">
        <Info size={18} style={{ flexShrink: 0 }} />
        <div>
          <strong>Scientific Resolution Disclaimer:</strong> {smapSoilMoisture?.disclaimer}
        </div>
      </div>

      <DataSourceCard 
        sourceName="NASA Earth Observing System (EOS)"
        product="GPM IMERG, SMAP L4, MODIS MOD13Q1, Landsat-8/9 HLS"
        resolution="GPM: 10km | SMAP: 9km | MODIS: 250m | HLS: 30m"
        observationDate="Near Real-Time Multi-Mission"
        coverage="West Bengal Agro-Climatic Zones"
        caveat="Satellite indices measure land-surface optical reflections and microwave emissions. Ground verification through direct field logging is required for definitive diagnostic confirmation."
      />
    </div>
  );
}
