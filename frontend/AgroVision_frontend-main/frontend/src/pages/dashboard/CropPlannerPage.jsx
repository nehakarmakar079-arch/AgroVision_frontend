import React, { useState, useEffect } from 'react';
import { useFarm } from '../../context/FarmContext';
import { cropService } from '../../services/cropService';
import DataSourceCard from '../../components/common/DataSourceCard';
import { 
  Repeat, 
  Droplets, 
  Leaf, 
  ShieldCheck, 
  Sliders, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function CropPlannerPage() {
  const { activeFarm } = useFarm();
  const [crops, setCrops] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [currentRotation, setCurrentRotation] = useState([]);
  const [selectedCropFilter, setSelectedCropFilter] = useState('ALL');

  // Simulation Sliders
  const [delayDays, setDelayDays] = useState(0);
  const [tempOffset, setTempOffset] = useState(0.0);
  const [rainOffset, setRainOffset] = useState(0);
  const [simulationResult, setSimulationResult] = useState(null);

  useEffect(() => {
    if (!activeFarm) return;
    const cat = cropService.getCropCatalog();
    setCrops(cat);

    // Initial rotation matrix
    setCurrentRotation(activeFarm.currentRotation || []);

    // Load recommendations
    async function fetchRecs() {
      const res = await cropService.getRotationRecommendations(activeFarm.id, activeFarm.currentRotation);
      setRecommendations(res.data || []);
    }
    fetchRecs();

    // Run baseline simulation
    runSimulation(0, 0.0, 0);
  }, [activeFarm]);

  const runSimulation = async (delay, temp, rain) => {
    if (!activeFarm) return;
    const res = await cropService.simulateClimateScenario({
      farmId: activeFarm.id,
      sowingDelayDays: delay,
      tempOffsetCelsius: temp,
      rainfallOffsetPercent: rain
    });
    setSimulationResult(res);
  };

  const handleRotationChange = (monthIndex, newCrop) => {
    const normalized = MONTHS.map((m, idx) => {
      const existing = currentRotation[idx];
      return existing ? { ...existing } : { month: m, crop: 'Fallow', stage: 'Resting' };
    });
    normalized[monthIndex] = {
      ...normalized[monthIndex],
      month: MONTHS[monthIndex],
      crop: newCrop,
      stage: newCrop === 'Fallow' ? 'Resting' : (normalized[monthIndex].stage || 'Vegetative')
    };
    setCurrentRotation(normalized);
  };

  if (!activeFarm) {
    return <div className="card" style={{ padding: '2rem' }}>Loading Crop Rotation Planner...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.25rem' }}>
          Crop Rotation & Adaptation Planner
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
          Evaluate your 12-month farming sequence against NASA climate data to break monoculture and improve soil resilience.
        </p>
      </div>

      {/* 1. INTERACTIVE 12-MONTH CROP CALENDAR INPUT */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Calendar size={20} style={{ color: 'var(--color-satellite-blue)' }} />
            Your Current 12-Month Cropping Calendar
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Tap any month to adjust crop</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          Specify what is currently planted on your land across each month. This allows our rule engine to evaluate water balance, fallow periods, and disease carryover.
        </p>

        {/* 12-Month Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(78px, 1fr))', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {MONTHS.map((m, idx) => {
            const currentItem = currentRotation[idx] || { month: m, crop: 'Fallow' };
            const isRice = currentItem.crop?.includes('Paddy') || currentItem.crop?.includes('Rice');
            const isPotato = currentItem.crop?.includes('Potato');
            const isMustard = currentItem.crop?.includes('Mustard');
            const isLegume = currentItem.crop?.includes('Moong') || currentItem.crop?.includes('Pea') || currentItem.crop?.includes('Khesari');

            let cardBg = 'var(--color-soft-bg)';
            let borderColor = 'var(--color-border)';
            if (isRice) { cardBg = 'rgba(22, 139, 206, 0.12)'; borderColor = 'var(--color-satellite-blue)'; }
            else if (isPotato) { cardBg = 'rgba(245, 158, 11, 0.12)'; borderColor = 'var(--color-warning)'; }
            else if (isMustard) { cardBg = 'rgba(181, 230, 29, 0.2)'; borderColor = 'var(--color-lime-green)'; }
            else if (isLegume) { cardBg = 'rgba(56, 168, 50, 0.15)'; borderColor = 'var(--color-agri-green)'; }

            return (
              <div 
                key={m} 
                style={{
                  background: cardBg,
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.4rem',
                  textAlign: 'center',
                  minWidth: '78px'
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-dark-blue)', marginBottom: '0.35rem' }}>
                  {m}
                </div>
                <select
                  value={currentItem.crop || 'Fallow'}
                  onChange={e => handleRotationChange(idx, e.target.value)}
                  style={{
                    width: '100%',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.15rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    background: '#FFFFFF',
                    fontWeight: 600,
                    color: 'var(--color-dark-blue)'
                  }}
                >
                  <option value="Aman Paddy">Aman Paddy</option>
                  <option value="Boro Paddy">Boro Paddy</option>
                  <option value="Potato">Potato</option>
                  <option value="Mustard">Mustard</option>
                  <option value="Moong">Moong</option>
                  <option value="Sesame">Sesame</option>
                  <option value="Jute">Jute</option>
                  <option value="Khesari">Khesari</option>
                  <option value="Fallow">Fallow / Rest</option>
                </select>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '0.35rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentItem.stage || 'Standing'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4" style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
          <span className="flex items-center gap-1"><span style={{ width: 10, height: 10, background: 'var(--color-satellite-blue)', borderRadius: 2 }} /> Cereals (Rice)</span>
          <span className="flex items-center gap-1"><span style={{ width: 10, height: 10, background: 'var(--color-warning)', borderRadius: 2 }} /> Tubers (Potato)</span>
          <span className="flex items-center gap-1"><span style={{ width: 10, height: 10, background: 'var(--color-lime-green)', borderRadius: 2 }} /> Oilseeds (Mustard/Sesame)</span>
          <span className="flex items-center gap-1"><span style={{ width: 10, height: 10, background: 'var(--color-agri-green)', borderRadius: 2 }} /> Legumes (Moong/Khesari)</span>
        </div>
      </div>

      {/* 2. ALTERNATIVE CROP ROTATION PLANS (CORE PS OUTPUT) */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--color-dark-blue)', marginBottom: '0.2rem' }}>
              Recommended Alternative Crop-Rotation Cycles
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
              Scientifically evaluated against NASA POWER seasonal rainfall and BCKV agronomic soil restoration guidelines.
            </p>
          </div>
          <span className="badge badge-live">2–3 FEASIBLE PLANS</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {recommendations.map((plan, idx) => (
            <div 
              key={plan.id}
              className="card"
              style={{
                borderLeft: idx === 0 ? '5px solid var(--color-agri-green)' : '5px solid var(--color-satellite-blue)'
              }}
            >
              {/* Plan Header */}
              <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: idx === 0 ? 'var(--color-agri-green)' : 'var(--color-satellite-blue)', letterSpacing: '0.04em' }}>
                    RECOMMENDATION {idx + 1}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--color-dark-blue)', marginTop: '0.15rem' }}>
                    {plan.title}
                  </h3>
                </div>

                <div style={{ padding: '0.4rem 0.85rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-dark-blue)' }}>
                  Sequence: {plan.sequence}
                </div>
              </div>

              {/* Timing Timeline */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {plan.timing?.map((t, tIdx) => (
                  <div key={tIdx} style={{ padding: '0.65rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-satellite-blue)', fontWeight: 600 }}>{t.window} ({t.duration})</div>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--color-dark-blue)' }}>{t.crop}</strong>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{t.type}</div>
                  </div>
                ))}
              </div>

              {/* EXPLAINABILITY CARDS (WHY THIS IS BETTER) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                {/* 1. Water Demand Reduction */}
                <div style={{ padding: '0.85rem', background: 'rgba(22, 139, 206, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(22, 139, 206, 0.2)' }}>
                  <div className="flex items-center gap-1" style={{ fontWeight: 700, color: 'var(--color-satellite-blue)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <Droplets size={16} />
                    <span>Water Conservation Benefit</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-dark)', lineHeight: 1.5 }}>
                    <strong>{plan.waterBalance?.estimatedSavings}</strong>. {plan.waterBalance?.groundwaterImpact}.
                  </p>
                </div>

                {/* 2. Soil Health & Nitrogen Restoring */}
                <div style={{ padding: '0.85rem', background: 'rgba(56, 168, 50, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56, 168, 50, 0.2)' }}>
                  <div className="flex items-center gap-1" style={{ fontWeight: 700, color: 'var(--color-agri-green)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <Leaf size={16} />
                    <span>Soil Fertility & Restorative Impact</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-dark)', lineHeight: 1.5 }}>
                    <strong>{plan.soilBenefit?.nitrogenContribution}</strong>. {plan.soilBenefit?.organicCarbon}.
                  </p>
                </div>

                {/* 3. Pest & Disease Break */}
                <div style={{ padding: '0.85rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-1" style={{ fontWeight: 700, color: 'var(--color-dark-blue)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <ShieldCheck size={16} />
                    <span>Pest & Pathogen Cycle Break</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-dark)', lineHeight: 1.5 }}>
                    {plan.pestCycleBreak}
                  </p>
                </div>
              </div>

              {/* Realistic Limitations Warning */}
              <div style={{ padding: '0.5rem 0.75rem', background: 'var(--color-warning-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: '#92400E' }}>
                <strong>Agronomic Caveat:</strong> {plan.limitations}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CLIMATE SCENARIO SIMULATOR ("WHAT-IF") */}
      <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, #0B1F3A 0%, #061426 100%)', color: '#FFFFFF' }}>
        <div className="card-header" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <h3 className="card-title" style={{ color: '#FFFFFF' }}>
            <Sliders size={20} style={{ color: 'var(--color-bright-cyan)' }} />
            Climate Stress Simulator ("What-If" Analysis)
          </h3>
          <span className="badge badge-satellite">DECISION SUPPORT SCENARIO</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
          Test how delayed sowing or unseasonal rainfall shifts impact harvest timing and water stress before committing to your crop cycle.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
          
          {/* Slider 1: Sowing Delay */}
          <div>
            <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <span>Sowing Delay:</span>
              <strong style={{ color: 'var(--color-lime-green)' }}>{delayDays} Days</strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              step="5"
              value={delayDays}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                setDelayDays(val);
                runSimulation(val, tempOffset, rainOffset);
              }}
              style={{ width: '100%', accentColor: 'var(--color-lime-green)' }}
            />
            <div className="flex justify-between" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>
              <span>On Time (0d)</span>
              <span>15 Days</span>
              <span>1 Month Delay (30d)</span>
            </div>
          </div>

          {/* Slider 2: Seasonal Rainfall Offset */}
          <div>
            <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <span>Precipitation Anomaly:</span>
              <strong style={{ color: 'var(--color-bright-cyan)' }}>{rainOffset > 0 ? `+${rainOffset}` : rainOffset}%</strong>
            </div>
            <input 
              type="range" 
              min="-40" 
              max="40" 
              step="10"
              value={rainOffset}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                setRainOffset(val);
                runSimulation(delayDays, tempOffset, val);
              }}
              style={{ width: '100%', accentColor: 'var(--color-bright-cyan)' }}
            />
            <div className="flex justify-between" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>
              <span>Drought (-40%)</span>
              <span>Normal (0%)</span>
              <span>Excess (+40%)</span>
            </div>
          </div>

          {/* Slider 3: Temperature Offset */}
          <div>
            <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <span>Temperature Shift:</span>
              <strong style={{ color: '#F97316' }}>{tempOffset > 0 ? `+${tempOffset}` : tempOffset}°C</strong>
            </div>
            <input 
              type="range" 
              min="-1.5" 
              max="3.0" 
              step="0.5"
              value={tempOffset}
              onChange={e => {
                const val = parseFloat(e.target.value);
                setTempOffset(val);
                runSimulation(delayDays, val, rainOffset);
              }}
              style={{ width: '100%', accentColor: '#F97316' }}
            />
            <div className="flex justify-between" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>
              <span>Cooler (-1.5°C)</span>
              <span>Normal</span>
              <span>Heatwave (+3.0°C)</span>
            </div>
          </div>
        </div>

        {/* Simulation Output Card */}
        {simulationResult && (
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid rgba(53, 197, 244, 0.3)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <strong style={{ color: 'var(--color-bright-cyan)', fontSize: '0.95rem' }}>
                {simulationResult.scenarioLabel}
              </strong>
              <span style={{ 
                padding: '0.25rem 0.65rem', 
                borderRadius: 'var(--radius-full)', 
                fontSize: '0.75rem', 
                fontWeight: 700,
                background: simulationResult.vulnerabilityIndex > 50 ? 'var(--color-danger)' : 'var(--color-agri-green)',
                color: '#FFFFFF'
              }}>
                Vulnerability Index: {simulationResult.vulnerabilityIndex} / 100
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Harvest Window Forecast:</span>
                <div style={{ marginTop: '0.2rem', color: '#FFFFFF', fontWeight: 600 }}>{simulationResult.harvestWindowVerdict}</div>
              </div>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Water Balance Impact:</span>
                <div style={{ marginTop: '0.2rem', color: '#FFFFFF', fontWeight: 600 }}>{simulationResult.waterStressVerdict}</div>
              </div>
            </div>

            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.82rem', color: 'var(--color-lime-green)' }}>
              <strong>Adaptive Recommendation:</strong> {simulationResult.suggestedAdjustment}
            </div>
          </div>
        )}
      </div>

      <DataSourceCard 
        sourceName="Crop Rotation & Agronomic Rule Engine"
        product="Bidhan Chandra Krishi Viswavidyalaya (BCKV) Crop Guidelines & NASA POWER"
        resolution="District-Level Agro-Ecological Profiling"
        observationDate="2026 Season"
        coverage="West Bengal Agricultural Regions"
        caveat="Alternative rotation plans evaluate water stress, pest disruption, and nitrogen recovery. Seed availability and local market mandi prices should be confirmed before final sowing."
      />
    </div>
  );
}
