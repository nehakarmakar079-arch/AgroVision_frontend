import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Satellite, 
  CloudSun, 
  Repeat, 
  Activity, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  Droplets,
  Layers,
  Sparkles
} from 'lucide-react';
import DemoBadge from '../components/common/DemoBadge';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: 'var(--color-soft-bg)' }}>
      {/* 1. HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #061426 0%, #0B1F3A 60%, #168BCE 140%)',
        color: '#FFFFFF',
        padding: '4.5rem 0 5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(53, 197, 244, 0.15)', border: '1px solid rgba(53, 197, 244, 0.3)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
                <Sparkles size={16} style={{ color: 'var(--color-lime-green)' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-bright-cyan)', letterSpacing: '0.04em' }}>
                  CLIMATE-INFORMED DECISION SUPPORT • WEST BENGAL
                </span>
              </div>

              <h1 style={{ color: '#FFFFFF', fontSize: '2.75rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
                Smarter Farming Decisions Through <span style={{ color: 'var(--color-lime-green)' }}>Space Data</span>.
              </h1>

              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                AgroVision helps farmers across West Bengal understand climate conditions, screen agricultural risks, evaluate sustainable crop rotations, and track recovery using NASA Earth observations.
              </p>

              <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
                <Link to="/app/overview" className="btn btn-lg btn-primary">
                  <span>Explore Demo Farm</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/app/register-farm" className="btn btn-lg btn-secondary" style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                  <span>Register Your Farm</span>
                </Link>
                <a href="#how-it-works" className="btn btn-lg btn-ghost" style={{ color: 'var(--color-bright-cyan)' }}>
                  How It Works ↓
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="flex items-center gap-4" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={16} style={{ color: 'var(--color-lime-green)' }} />
                  NASA POWER Climatology
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={16} style={{ color: 'var(--color-lime-green)' }} />
                  West Bengal Crop Calendars
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={16} style={{ color: 'var(--color-lime-green)' }} />
                  Free & Open Science
                </span>
              </div>
            </div>

            {/* Right Emblem & Satellite Feature Graphic */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(53, 197, 244, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
              }}>
                <img 
                  src="/assets/agrovision-logo.png" 
                  alt="AgroVision Official Emblem" 
                  style={{ maxWidth: '340px', width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)' }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--color-dark-blue)',
                  border: '1px solid var(--color-lime-green)',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--color-lime-green)',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}>
                  From Space Data to Farm Recovery Decisions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE-STAGE WORKFLOW (BEFORE, DURING, AFTER) */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-satellite-blue)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Continuous Agricultural Resilience
            </span>
            <h2 style={{ fontSize: '2.1rem', marginTop: '0.35rem', marginBottom: '0.75rem' }}>
              A Complete Three-Stage Decision Workflow
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
              We do not stop at displaying weather. AgroVision supports the farmer's journey before sowing, during crop development, and after environmental hazards.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Stage 1: BEFORE */}
            <div className="card" style={{ borderTop: '4px solid var(--color-satellite-blue)' }}>
              <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'rgba(22, 139, 206, 0.1)', color: 'var(--color-satellite-blue)', marginBottom: '1rem' }}>
                <CloudSun size={26} />
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-satellite-blue)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                STAGE 1: BEFORE SOWING
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Climate & Seasonal Risk Monitoring</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Inspect 10-year monthly normals of temperature, rainfall regularity, and solar radiation using <strong>NASA POWER</strong>. Catch delayed monsoon onset and early dry spells before purchasing seeds.
              </p>
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.82rem', color: 'var(--color-dark-blue)', fontWeight: 600 }}>
                ✓ Optimal sowing window selection
              </div>
            </div>

            {/* Stage 2: DURING */}
            <div className="card" style={{ borderTop: '4px solid var(--color-bright-cyan)' }}>
              <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'rgba(53, 197, 244, 0.15)', color: 'var(--color-satellite-blue)', marginBottom: '1rem' }}>
                <Satellite size={26} />
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-satellite-blue)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                STAGE 2: DURING THE SEASON
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Satellite Vitality & Field Reality</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Track vegetative greenness (NDVI) via <strong>MODIS & Landsat/HLS</strong> paired with <strong>NASA GPM</strong> heavy rainfall screening. Farmers can log field photographs and soil test EC/pH.
              </p>
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.82rem', color: 'var(--color-dark-blue)', fontWeight: 600 }}>
                ✓ Waterlogging & salinity alert screening
              </div>
            </div>

            {/* Stage 3: AFTER */}
            <div className="card" style={{ borderTop: '4px solid var(--color-agri-green)' }}>
              <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'rgba(56, 168, 50, 0.15)', color: 'var(--color-agri-green)', marginBottom: '1rem' }}>
                <Repeat size={26} />
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-agri-green)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                STAGE 3: AFTER HARVEST / HAZARD
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Recovery & Crop Rotation Planning</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Evaluate the farmer's 12-month cropping sequence. Receive <strong>2–3 alternative crop rotation plans</strong> with clear reasons: water conservation, biological nitrogen restoration, and pest breaks.
              </p>
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.82rem', color: 'var(--color-dark-blue)', fontWeight: 600 }}>
                ✓ Breaking soil exhaustion & monoculture
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WEST BENGAL FOCUS SECTION */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '4.5rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge badge-satellite" style={{ marginBottom: '0.75rem' }}>
                GEOGRAPHICAL PILOT GROUNDING
              </span>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Tailored for the Unique Agricultural Belt of West Bengal
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                West Bengal features three distinct agro-climatic zones requiring fundamentally different farming strategies:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-agri-green)' }}>
                  <strong style={{ color: 'var(--color-dark-blue)' }}>1. Gangetic Alluvial Plains (Purba Bardhaman & Hooghly):</strong>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Intensive Rice–Potato–Mustard/Sesame cropping. High water table extraction requires pulse rotation (Moong/Khesari) to preserve aquifers.
                  </p>
                </div>

                <div style={{ padding: '0.85rem 1rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-satellite-blue)' }}>
                  <strong style={{ color: 'var(--color-dark-blue)' }}>2. Coastal Delta & Sundarbans (South 24 Parganas / Gosaba):</strong>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Cyclonic storm surges and high dry-season soil salinity (EC &gt; 4.0 dS/m). Demands salt-tolerant Aman varieties and zero-tillage relay legumes.
                  </p>
                </div>

                <div style={{ padding: '0.85rem 1rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-warning)' }}>
                  <strong style={{ color: 'var(--color-dark-blue)' }}>3. Western Red & Lateritic Tracts (Bankura / Purulia):</strong>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Low water retention, rapid runoff, and frequent drought stress. Suitable for millets, oilseeds, and short-duration pulses.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--color-soft-bg)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--color-dark-blue)' }}>
                Demonstration Farm Profiles Ready to Inspect:
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link to="/app/overview" style={{ padding: '0.75rem 1rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'block', textDecoration: 'none' }}>
                  <div className="flex items-center justify-between">
                    <strong style={{ color: 'var(--color-dark-blue)', fontSize: '0.9rem' }}>🌾 Burdwan Alluvial Demo Plot</strong>
                    <DemoBadge />
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Purba Bardhaman • 4.5 Bigha • Rice–Potato–Sesame cycle
                  </span>
                </Link>

                <Link to="/app/overview" style={{ padding: '0.75rem 1rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'block', textDecoration: 'none' }}>
                  <div className="flex items-center justify-between">
                    <strong style={{ color: 'var(--color-dark-blue)', fontSize: '0.9rem' }}>🌱 Hooghly Multi-Crop Farm</strong>
                    <DemoBadge />
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Singur, Hooghly • 3.0 Bigha • Jute–Paddy–Mustard cycle
                  </span>
                </Link>

                <Link to="/app/overview" style={{ padding: '0.75rem 1rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'block', textDecoration: 'none' }}>
                  <div className="flex items-center justify-between">
                    <strong style={{ color: 'var(--color-dark-blue)', fontSize: '0.9rem' }}>🌊 Gosaba Coastal & Delta Farm</strong>
                    <DemoBadge />
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Sundarbans • 5.0 Bigha • Salinity-adaptive relay cycle
                  </span>
                </Link>
              </div>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <Link to="/app/register-farm" className="btn btn-sm btn-primary">
                  + Add Your Farm Coordinates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (5 SIMPLE STEPS) */}
      <section id="how-it-works" style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '2.1rem', marginBottom: '0.75rem' }}>How AgroVision Works for Farmers</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Designed for simple, friction-free operation without needing technical satellite expertise.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '1', title: 'Select Location', desc: 'Use GPS detection or tap your field on the West Bengal interactive map.' },
              { step: '2', title: 'Enter Crop History', desc: 'Pick your current crops across the 12-month calendar (Jan–Dec).' },
              { step: '3', title: 'Load NASA Evidence', desc: 'Inspect regional rainfall, temperature normals, and vegetation vitality.' },
              { step: '4', title: 'Review Alternatives', desc: 'Compare 2–3 science-backed crop rotation options with clear reasons.' },
              { step: '5', title: 'Track Recovery', desc: 'Log field photos, track harvest timelines, and print advisory sheets.' }
            ].map(item => (
              <div key={item.step} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--color-dark-blue)',
                  color: 'var(--color-lime-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  margin: '0 auto 0.75rem'
                }}>
                  {item.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NASA DATA TRANSPARENCY & CITATION */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '4rem 0', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <span className="badge badge-satellite" style={{ marginBottom: '0.5rem' }}>OPEN SCIENCE & ACCURACY</span>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>NASA Earth Observation Datasets Used</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
              We maintain strict transparency: regional satellite data provides synoptic environmental context, but does not substitute for laboratory field soil chemistry.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div style={{ padding: '1rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-dark-blue)' }}>NASA POWER</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-satellite-blue)', fontWeight: 600 }}>0.5° x 0.5° Gridded Climatology</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                Temperature (T2M), daily precipitation (PRECTOTCORR), relative humidity, and solar radiation.
              </p>
            </div>

            <div style={{ padding: '1rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-dark-blue)' }}>NASA GPM IMERG</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-satellite-blue)', fontWeight: 600 }}>0.1° x 0.1° (~10km) Precipitation</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                Near real-time 7-day and 30-day precipitation accumulation for waterlogging and flood screening.
              </p>
            </div>

            <div style={{ padding: '1rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-dark-blue)' }}>NASA SMAP L4</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-satellite-blue)', fontWeight: 600 }}>9 km Regional Soil Moisture</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                Surface and root-zone soil water availability context across seasonal transitions.
              </p>
            </div>

            <div style={{ padding: '1rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-dark-blue)' }}>MODIS & Landsat HLS</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-satellite-blue)', fontWeight: 600 }}>30m – 250m Vegetation</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                Normalized Difference Vegetation Index (NDVI) curves to monitor canopy health across crop cycles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-dark-blue) 0%, var(--color-deep-navy) 100%)',
        color: '#FFFFFF',
        padding: '3.5rem 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.1rem', marginBottom: '1rem' }}>
            Ready to Explore Your Farm's Potential?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
            Whether you are farming in Purba Bardhaman or the coastal Sundarbans delta, start exploring climate-informed crop rotation recommendations today.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/app/overview" className="btn btn-lg btn-primary">
              Launch Farm Dashboard
            </Link>
            <Link to="/app/register-farm" className="btn btn-lg btn-secondary" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}>
              Register My Plot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
