import React, { useState, useEffect } from 'react';
import { useFarm } from '../../context/FarmContext';
import { climateService } from '../../services/climateService';
import DataSourceCard from '../../components/common/DataSourceCard';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { CloudSun, Droplets, Thermometer, Info, Calendar } from 'lucide-react';

export default function ClimatePage() {
  const { activeFarm } = useFarm();
  const [climateState, setClimateState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState('ALL');

  useEffect(() => {
    async function fetchClimate() {
      if (!activeFarm) return;
      setLoading(true);
      try {
        const res = await climateService.getClimateByFarmId(activeFarm.id);
        setClimateState(res);
      } catch (err) {
        console.error('Failed to load climate data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchClimate();
  }, [activeFarm]);

  if (!activeFarm || !climateState) {
    return <div className="card" style={{ padding: '2rem' }}>Loading NASA POWER agroclimatology...</div>;
  }

  const { data, metadata } = climateState;
  const trends = data?.monthlyTrends || [];

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.25rem' }}>
          Climate Intelligence
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
          10-Year historical monthly normals and seasonal anomalies for <strong>{activeFarm.district}</strong> ({data?.coordinates}).
        </p>
      </div>

      {/* Seasonal Anomalies Strip */}
      {data?.anomalies && (
        <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(22, 139, 206, 0.05) 0%, rgba(56, 168, 50, 0.05) 100%)' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <CloudSun size={20} style={{ color: 'var(--color-satellite-blue)' }} />
            <h3 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--color-dark-blue)' }}>
              Current Seasonal Climate Diagnosis
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
            <div>
              <strong style={{ color: 'var(--color-dark-blue)' }}>Monsoon Withdrawal:</strong>
              <div style={{ color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{data.anomalies.monsoonStatus}</div>
            </div>
            <div>
              <strong style={{ color: 'var(--color-dark-blue)' }}>Heatwave Stress:</strong>
              <div style={{ color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{data.anomalies.heatwaveRisk}</div>
            </div>
            <div>
              <strong style={{ color: 'var(--color-dark-blue)' }}>Sowing Schedule Impact:</strong>
              <div style={{ color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{data.anomalies.delayedSowingRisk}</div>
            </div>
          </div>
        </div>
      )}

      {/* CHARTS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Chart 1: Rainfall vs Historical 10-Yr Normal */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Droplets size={18} style={{ color: 'var(--color-satellite-blue)' }} />
              Precipitation vs 10-Yr Normal (mm)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>PRECTOTCORR</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Compare observed seasonal monthly precipitation against the regional 10-year baseline.
          </p>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} unit="mm" />
                <Tooltip 
                  contentStyle={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="rainfall" name="Current Season (mm)" fill="var(--color-satellite-blue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rainfallNormal" name="10-Yr Normal (mm)" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Temperature Trends (T2M, T2M_MAX, T2M_MIN) */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Thermometer size={18} style={{ color: '#F97316' }} />
              Monthly Temperature Trends (°C)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>T2M / MAX / MIN</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Temperature envelope dictates vegetative emergence, flowering, and vernalization windows.
          </p>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} unit="°C" />
                <Tooltip 
                  contentStyle={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="tempMax" name="Max Temp (°C)" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="tempMean" name="Mean Temp (°C)" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="tempMin" name="Min Temp (°C)" stroke="var(--color-satellite-blue)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Provenance and Scientific Context */}
      <DataSourceCard 
        sourceName={metadata?.source || 'NASA POWER Project'}
        product="Daily & Monthly Agroclimatology"
        resolution={metadata?.spatialResolution || '0.5° x 0.5° (~50km)'}
        observationDate="Recent Multi-Year Climatology"
        coverage="West Bengal, India"
        caveat={metadata?.caveat}
      />
    </div>
  );
}
