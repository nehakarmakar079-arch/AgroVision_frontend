import React, { useState, useEffect } from 'react';
import { useFarm } from '../../context/FarmContext';
import { recoveryService } from '../../services/recoveryService';
import DataSourceCard from '../../components/common/DataSourceCard';
import { 
  Activity, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Camera, 
  CheckSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecoveryPage() {
  const { activeFarm } = useFarm();
  const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Harvest checklist state
  const [checklist, setChecklist] = useState({
    grainMoistureChecked: true,
    drainageFurrowsCleaned: true,
    mulchApplied: false,
    postHarvestStoragePrepared: false
  });

  useEffect(() => {
    async function loadRecovery() {
      if (!activeFarm) return;
      setLoading(true);
      try {
        const res = await recoveryService.getRecoveryTimeline(activeFarm.id);
        setTimelineData(res.data);
      } catch (err) {
        console.error('Failed to load recovery timeline:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRecovery();
  }, [activeFarm]);

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!activeFarm || !timelineData) {
    return <div className="card" style={{ padding: '2rem' }}>Loading Farm Recovery Tracker...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.25rem' }}>
            Farm Recovery & Post-Hazard Tracking
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
            Chronological evidence logging connecting environmental events with field recovery for <strong>{activeFarm.district}</strong>.
          </p>
        </div>

        <div>
          <span className="badge badge-live">
            Status: {timelineData.currentStatus}
          </span>
        </div>
      </div>

      {/* RECOVERY PROGRESS BAR */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
          <div>
            <strong style={{ fontSize: '1.05rem', color: 'var(--color-dark-blue)' }}>Overall Farm Recovery Index</strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Based on satellite soil stabilization, field drainage confirmation, and crop replanting progress.
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-agri-green)' }}>
            {timelineData.recoveryScorePercent}%
          </div>
        </div>

        <div style={{ width: '100%', height: '10px', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-full)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          <div style={{ width: `${timelineData.recoveryScorePercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-satellite-blue) 0%, var(--color-agri-green) 100%)', borderRadius: 'var(--radius-full)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Left: Chronological Event Timeline */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Clock size={20} style={{ color: 'var(--color-satellite-blue)' }} />
              Milestone Timeline (Before, During, After)
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Event Log</span>
          </div>

          <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-border)', marginLeft: '0.5rem' }}>
            {timelineData.events?.map((evt, idx) => (
              <div key={evt.id || idx} style={{ marginBottom: '1.5rem', position: 'relative' }}>
                {/* Milestone Dot */}
                <div style={{
                  position: 'absolute',
                  left: '-1.95rem',
                  top: '2px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: evt.verified ? 'var(--color-agri-green)' : 'var(--color-satellite-blue)',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 0 0 1px var(--color-border)'
                }} />

                <div className="flex items-center gap-2" style={{ marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-satellite-blue)' }}>{evt.date}</span>
                  <span className="badge badge-satellite" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>{evt.type}</span>
                </div>

                <strong style={{ fontSize: '0.92rem', color: 'var(--color-dark-blue)', display: 'block', marginBottom: '0.25rem' }}>
                  {evt.title}
                </strong>

                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {evt.description}
                </p>

                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                  Source: <strong>{evt.source}</strong> {evt.verified && '✓ Verified'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border)' }}>
            <Link to="/app/risk" className="btn btn-sm btn-secondary">
              <Camera size={14} />
              <span>Log New Field Photo / Observation</span>
            </Link>
          </div>
        </div>

        {/* Right: Harvest Intelligence & Preparation Checklist */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <CheckSquare size={20} style={{ color: 'var(--color-agri-green)' }} />
              Harvest & Transition Preparation Checklist
            </h3>
            <span className="badge badge-satellite">ACTION PROTOCOL</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Action items for farmers transitioning from current standing crops to the recommended next rotation.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={checklist.grainMoistureChecked} 
                onChange={() => toggleChecklist('grainMoistureChecked')}
                style={{ marginTop: '3px', accentColor: 'var(--color-agri-green)' }} 
              />
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--color-dark-blue)' }}>Grain Moisture Testing (&lt;14%)</strong>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Aman paddy grains must be sun-dried to under 14% moisture before bagging to prevent aflatoxin and fungal spoilage.
                </p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={checklist.drainageFurrowsCleaned} 
                onChange={() => toggleChecklist('drainageFurrowsCleaned')}
                style={{ marginTop: '3px', accentColor: 'var(--color-agri-green)' }} 
              />
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--color-dark-blue)' }}>Perimeter Drainage Furrows Cleared</strong>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Clear excess water channels to allow soil moisture drying for the upcoming winter tuber/oilseed planting.
                </p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={checklist.mulchApplied} 
                onChange={() => toggleChecklist('mulchApplied')}
                style={{ marginTop: '3px', accentColor: 'var(--color-agri-green)' }} 
              />
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--color-dark-blue)' }}>Straw Stubble Mulch Conservation</strong>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Retain 15–20cm paddy stubble. In coastal zones (Sundarbans), mulch suppresses upward capillary salt rise.
                </p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={checklist.postHarvestStoragePrepared} 
                onChange={() => toggleChecklist('postHarvestStoragePrepared')}
                style={{ marginTop: '3px', accentColor: 'var(--color-agri-green)' }} 
              />
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--color-dark-blue)' }}>Pre-Booking Seed for Plan A (Mustard/Moong)</strong>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Procure certified high-yielding mustard seeds (e.g., Pusa Bold / B9) or green gram from local block seed stores.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <DataSourceCard 
        sourceName="AgroVision Recovery Intelligence Engine"
        product="Chronological Multi-Event Logging (NASA Satellites + Farmer Ground Truth)"
        resolution="Plot-Scale Ground Truth + Regional Satellite Validation"
        observationDate="Active 2026 Season"
        coverage="West Bengal Agricultural Regions"
        caveat="Recovery status reflects submitted observations and regional satellite moisture normalization. Extension verification is advised before declaring official crop compensation recovery."
      />
    </div>
  );
}
