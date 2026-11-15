import React from 'react';
import { Link } from 'react-router-dom';
import { Satellite, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-deep-navy)',
      color: 'var(--color-text-light)',
      borderTop: '1px solid rgba(53, 197, 244, 0.15)',
      padding: '3rem 0 1.5rem',
      fontSize: '0.88rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <img 
                src="/assets/agrovision-logo.png" 
                alt="AgroVision" 
                style={{ height: '42px', width: 'auto' }}
              />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                Agro<span style={{ color: 'var(--color-lime-green)' }}>Vision</span>
              </span>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              A climate-informed agricultural decision-support platform combining NASA Earth observations with West Bengal agricultural knowledge.
            </p>
            <div style={{ marginTop: '1rem', color: 'var(--color-bright-cyan)', fontWeight: 600, fontSize: '0.8rem' }}>
              Team Innovatrix • NASA Space Apps Challenge 2026
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
              Core Modules
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/app/climate" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Climate Intelligence (NASA POWER)</Link></li>
              <li><Link to="/app/satellite" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Satellite Monitoring (GPM & SMAP)</Link></li>
              <li><Link to="/app/risk" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Risk & Salinity Screening</Link></li>
              <li><Link to="/app/crop-planner" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Crop Rotation Planner</Link></li>
              <li><Link to="/app/recovery" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Farm Recovery Tracker</Link></li>
            </ul>
          </div>

          {/* NASA Data Attribution */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
              NASA Earth Science Data
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.82rem', lineHeight: 1.6 }}>
              We gratefully acknowledge the NASA Earth Science Division, NASA Langley POWER Project, NASA GPM IMERG, NASA SMAP Science Team, and USGS/NASA Landsat for open data access.
            </p>
            <div className="flex items-center gap-1" style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--color-lime-green)' }}>
              <Satellite size={14} />
              <span>Open Science for Sustainable Agriculture</span>
            </div>
          </div>

          {/* Scientific Disclaimer */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
              Scientific Disclaimer
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.8rem', lineHeight: 1.5 }}>
              AgroVision provides decision-support context. Gridded satellite products reflect regional conditions and do not replace laboratory soil testing or local agronomic extension verification.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem'
        }}>
          <div>
            © 2026 AgroVision (Team Innovatrix). Developed for West Bengal Farmers.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>About Project</Link>
            <Link to="/app/research" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Data Provenance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
