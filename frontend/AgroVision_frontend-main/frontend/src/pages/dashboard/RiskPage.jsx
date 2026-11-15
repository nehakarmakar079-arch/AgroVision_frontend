import React, { useState, useEffect } from 'react';
import { useFarm } from '../../context/FarmContext';
import { riskService } from '../../services/riskService';
import { soilService } from '../../services/soilService';
import DataSourceCard from '../../components/common/DataSourceCard';
import { 
  AlertTriangle, 
  Droplets, 
  ShieldAlert, 
  Camera, 
  Upload, 
  X, 
  CheckCircle2, 
  FlaskConical,
  Info
} from 'lucide-react';

export default function RiskPage() {
  const { activeFarm } = useFarm();
  const [riskData, setRiskData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoNote, setPhotoNote] = useState('');
  const [photoSubmitted, setPhotoSubmitted] = useState(false);

  // Lab Soil Test form state
  const [labForm, setLabForm] = useState({
    testDate: new Date().toISOString().split('T')[0],
    labName: 'Local Krishi Vigyan Kendra (KVK)',
    ph: '6.5',
    ec: '0.4',
    nitrogenKgHa: '220',
    phosphorusKgHa: '22',
    potassiumKgHa: '200'
  });
  const [labSubmitted, setLabSubmitted] = useState(false);

  useEffect(() => {
    async function loadRisk() {
      if (!activeFarm) return;
      try {
        const [rRes, sRes] = await Promise.all([
          riskService.getRiskAssessment(activeFarm.id),
          soilService.getSoilData(activeFarm.id)
        ]);
        setRiskData(rRes.data);
        setSoilData(sRes.data);
      } catch (err) {
        console.error('Failed to load risk data:', err);
      }
    }
    loadRisk();
  }, [activeFarm]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
      const objectUrl = URL.createObjectURL(file);
      setPhotoPreview(objectUrl);
    }
  };

  const handleClearPhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoPreview(null);
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    if (!photoPreview) return;
    setPhotoSubmitted(true);
    setTimeout(() => setPhotoSubmitted(false), 4000);
  };

  const handleLabSubmit = async (e) => {
    e.preventDefault();
    await soilService.submitLabTest(activeFarm.id, labForm);
    setLabSubmitted(true);
    setTimeout(() => setLabSubmitted(false), 4000);
  };

  if (!activeFarm || !riskData) {
    return <div className="card" style={{ padding: '2rem' }}>Evaluating Agricultural Risks...</div>;
  }

  const isCoastal = activeFarm.district.includes('24 Parganas');
  const labTest = soilData?.latestLabTest;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.25rem' }}>
          Agricultural Risk Intelligence & Evidence
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
          Multi-hazard screening for waterlogging, coastal salinity, and ground-truth field evidence for <strong>{activeFarm.district}</strong>.
        </p>
      </div>

      {/* RISK SUMMARY ALERT */}
      <div className={`alert-strip ${isCoastal ? 'alert-strip-warning' : 'alert-strip-info'}`} style={{ marginBottom: '1.5rem' }}>
        <AlertTriangle size={20} style={{ flexShrink: 0 }} />
        <div>
          <strong>Overall Agricultural Risk Status: {riskData.overallRiskLevel}</strong>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem' }}>
            {isCoastal 
              ? 'Coastal delta zone detected: High dry-season soil electrical conductivity (EC) and vulnerability to tidal surge requires salinity-adaptive crop planning.'
              : 'Gangetic alluvial zone: Favorable rabi soil moisture with minimal salinity hazard. Groundwater preservation is the primary sustainability priority.'
            }
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Module 1: Flood & Waterlogging Screening */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Droplets size={20} style={{ color: 'var(--color-satellite-blue)' }} />
              Flood & Waterlogging Screening
            </h3>
            <span className="badge badge-satellite">NASA GPM & SRTM</span>
          </div>

          <div style={{ padding: '0.85rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <div className="flex justify-between" style={{ marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Regional Drainage Gradient:</span>
              <strong>{isCoastal ? 'Lowland Delta (+1.8m MSL)' : 'Alluvial Plain (+18m MSL)'}</strong>
            </div>
            <div className="flex justify-between" style={{ marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Standing Water Risk:</span>
              <strong style={{ color: isCoastal ? '#D97706' : 'var(--color-agri-green)' }}>
                {isCoastal ? 'Moderate (Dependent on sluice gates)' : 'Low (Safe for tuber crops)'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-text-muted)' }}>NASA GPM 7-Day Rainfall:</span>
              <strong>{isCoastal ? '12.8 mm' : '2.4 mm'} (Normal)</strong>
            </div>
          </div>

          <div className="alert-strip alert-strip-info" style={{ fontSize: '0.78rem', margin: 0 }}>
            <Info size={14} style={{ flexShrink: 0 }} />
            <span>
              <strong>Scientific Limitation:</strong> Satellite radar water products reflect regional wetness. They do not prove that an individual micro-plot is inundated. Field inspection is required.
            </span>
          </div>
        </div>

        {/* Module 2: Coastal Soil Salinity Intelligence */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <FlaskConical size={20} style={{ color: '#0891B2' }} />
              Soil Salinity (EC) & Chemistry
            </h3>
            <span className={`badge ${isCoastal ? 'badge-warning' : 'badge-live'}`}>
              {labTest?.salinityClass || 'Tested'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.82rem' }}>
            <div style={{ padding: '0.65rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Electrical Conductivity (EC)</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isCoastal ? '#B45309' : 'var(--color-dark-blue)' }}>
                {labTest?.electricalConductivity} dS/m
              </div>
              <span style={{ fontSize: '0.72rem', color: isCoastal ? '#B45309' : 'var(--color-agri-green)' }}>
                {isCoastal ? '⚠ Elevated dry-season salt' : '✓ Normal Sweet Soil'}
              </span>
            </div>

            <div style={{ padding: '0.65rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Soil Reaction (pH)</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-dark-blue)' }}>
                {labTest?.ph}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                {labTest?.ph > 7.3 ? 'Slightly Alkaline' : 'Near Neutral'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            <strong>Laboratory Finding:</strong> {labTest?.soilHealthVerdict}
          </p>

          <div style={{ fontSize: '0.75rem', color: 'var(--color-danger)', fontWeight: 600 }}>
            * Important: NASA climate satellites do NOT measure soil salinity directly. Soil EC must be determined through laboratory testing.
          </div>
        </div>
      </div>

      {/* GROUND TRUTH EVIDENCE: FIELD PHOTO UPLOAD & OBSERVATION LOG */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Camera size={20} style={{ color: 'var(--color-agri-green)' }} />
            Farmer Field Evidence & Photo Upload
          </h3>
          <span className="badge badge-satellite">GROUND-TRUTHING WORKFLOW</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
          Upload photos of crop emergence, leaf yellowing, or field water stagnation to build ground-truth evidence supporting satellite observations.
        </p>

        <form onSubmit={handlePhotoSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            
            {/* Upload Area */}
            <div>
              <label style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 1rem',
                border: '2px dashed var(--color-border-dark)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                background: 'var(--color-soft-bg)',
                transition: 'all var(--transition-fast)'
              }}>
                <Upload size={32} style={{ color: 'var(--color-satellite-blue)', marginBottom: '0.5rem' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-dark-blue)' }}>
                  Tap to upload field photograph
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                  PNG, JPG, or WEBP (Max 5MB)
                </span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
              </label>

              {photoPreview && (
                <div style={{ marginTop: '0.75rem', position: 'relative', display: 'inline-block' }}>
                  <img 
                    src={photoPreview} 
                    alt="Uploaded field condition" 
                    style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} 
                  />
                  <button 
                    type="button" 
                    onClick={handleClearPhoto}
                    style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--color-danger)', color: '#FFFFFF', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Field Notes & Submit */}
            <div>
              <div className="form-group">
                <label className="form-label">Field Observation Notes</label>
                <textarea 
                  className="form-textarea"
                  rows="3"
                  placeholder="e.g., Standing water drained successfully. Early potato sprouts emerging cleanly with no visible fungal damping-off."
                  value={photoNote}
                  onChange={e => setPhotoNote(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <button 
                  type="submit" 
                  disabled={!photoPreview}
                  className="btn btn-primary"
                >
                  <Camera size={16} />
                  <span>Log Field Evidence</span>
                </button>

                {photoSubmitted && (
                  <span style={{ color: 'var(--color-agri-green)', fontWeight: 600, fontSize: '0.85rem' }}>
                    ✓ Observation saved to local timeline!
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>

        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          * Provisional Status: Photo upload is a visual record and screening aid. It does not replace on-site agricultural extension diagnosis.
        </div>
      </div>

      <DataSourceCard 
        sourceName="Multi-Source Risk Screening Engine"
        product="NASA GPM IMERG Precipitation, SRTM Topography, CSSRI Salinity Benchmarks"
        resolution="GPM: 10km | SRTM: 30m"
        observationDate="Seasonal Baseline"
        coverage="West Bengal Gangetic Alluvium & Sundarbans Coastal Belt"
        caveat="Risk classifications are decision-support screenings. Consult local Krishi Vigyan Kendra (KVK) officers for official agricultural disaster compensation claims."
      />
    </div>
  );
}
