import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { 
  Settings, 
  User, 
  Globe, 
  Scale, 
  ShieldCheck, 
  Trash2, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';

export default function SettingsPage() {
  const { activeFarm, unitPreference, setUnitPreference } = useFarm();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [farmerProfile, setFarmerProfile] = useState({
    name: activeFarm?.farmerName || 'Subhasish Mondal',
    phone: '+91 98321 00000',
    village: activeFarm?.village || 'Bagila',
    district: activeFarm?.district || 'Purba Bardhaman'
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset local demo data to default profiles?')) {
      localStorage.removeItem('agrovision_registered_farms_v1');
      window.location.reload();
    }
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.25rem' }}>
          Settings & Preferences
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
          Customize your farm measurement units, language, and regional preferences.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* 1. Measurement Units Preference */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Scale size={20} style={{ color: 'var(--color-agri-green)' }} />
              Farm Area Unit Preference
            </h3>
            <span className="badge badge-satellite">LOCAL CONVERSIONS</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Select the primary land measurement unit displayed throughout your dashboards and reports.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { id: 'Bigha', label: 'Bigha (বিঘা)', desc: 'Standard in West Bengal (1 Bigha ≈ 0.33 Acre / 1333.3 m²)' },
              { id: 'Acre', label: 'Acre', desc: 'National Standard (1 Acre ≈ 3.025 Bigha)' },
              { id: 'Hectare', label: 'Hectare', desc: 'Metric Standard (1 Hectare ≈ 7.475 Bigha)' }
            ].map(unit => (
              <label 
                key={unit.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: unitPreference === unit.id ? '2px solid var(--color-agri-green)' : '1px solid var(--color-border)',
                  background: unitPreference === unit.id ? 'rgba(56, 168, 50, 0.05)' : 'var(--color-soft-bg)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: '0.35rem' }}>
                  <strong style={{ color: 'var(--color-dark-blue)', fontSize: '0.95rem' }}>{unit.label}</strong>
                  <input 
                    type="radio" 
                    name="unitPref" 
                    checked={unitPreference === unit.id} 
                    onChange={() => setUnitPreference(unit.id)}
                    style={{ accentColor: 'var(--color-agri-green)' }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                  {unit.desc}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 2. Language Selection */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Globe size={20} style={{ color: 'var(--color-satellite-blue)' }} />
              Platform Language
            </h3>
            <span className="badge badge-satellite">TRANSLATION ARCHITECTURE</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            AgroVision currently operates in clear, farmer-accessible English. Multilingual translation architecture is prepared for Bengali and Hindi.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-satellite-blue)',
              background: 'rgba(22, 139, 206, 0.05)'
            }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: 'var(--color-dark-blue)' }}>English (Default)</strong>
                <span className="badge badge-live">Active</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Simple, accessible English designed for smallholder farmers.
              </span>
            </div>

            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--color-border)',
              background: 'var(--color-soft-bg)',
              opacity: 0.8
            }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: 'var(--color-text-dark)' }}>বাংলা (Bengali)</strong>
                <span className="badge badge-demo">Planned</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                কৃষকদের জন্য সম্পূর্ণ বাংলা ইন্টারফেস (Phase 2 Backend Integration).
              </span>
            </div>

            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--color-border)',
              background: 'var(--color-soft-bg)',
              opacity: 0.8
            }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: 'var(--color-text-dark)' }}>हिन्दी (Hindi)</strong>
                <span className="badge badge-demo">Planned</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                क्षेत्रीय किसानों के लिए हिंदी अनुवाद (Future Release).
              </span>
            </div>
          </div>
        </div>

        {/* 3. Farmer Profile Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <User size={20} style={{ color: 'var(--color-dark-blue)' }} />
              Farmer Contact & Village Record
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Local Identity</span>
          </div>

          <form onSubmit={handleSaveProfile}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Farmer / Manager Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={farmerProfile.name}
                  onChange={e => setFarmerProfile({ ...farmerProfile, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone (Optional)</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  value={farmerProfile.phone}
                  onChange={e => setFarmerProfile({ ...farmerProfile, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Village</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={farmerProfile.village}
                  onChange={e => setFarmerProfile({ ...farmerProfile, village: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">District in West Bengal</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={farmerProfile.district} 
                  disabled
                  style={{ background: 'var(--color-soft-bg)' }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="btn btn-primary">
                Save Profile Updates
              </button>
              {saveSuccess && (
                <span style={{ color: 'var(--color-agri-green)', fontWeight: 600, fontSize: '0.85rem' }}>
                  ✓ Profile settings saved!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* 4. Data Management & Reset */}
        <div className="card" style={{ borderLeft: '4px solid var(--color-danger)' }}>
          <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <strong style={{ color: 'var(--color-dark-blue)', fontSize: '0.95rem' }}>Demo State & Cache Management</strong>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                Reset local demo storage to restore default demonstration profiles (Purba Bardhaman, Hooghly, Gosaba).
              </p>
            </div>
            <button 
              type="button" 
              onClick={handleResetData}
              className="btn btn-sm btn-danger"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Trash2 size={14} />
              <span>Reset Demo Storage</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
