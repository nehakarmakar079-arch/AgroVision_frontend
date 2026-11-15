import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFarm } from '../../context/FarmContext';
import { MapPin, Plus, CheckCircle, ArrowRight, Layers, Compass } from 'lucide-react';
import DemoBadge from '../../components/common/DemoBadge';

export default function MyFarmsPage() {
  const { farms, activeFarm, switchFarm } = useFarm();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.35rem' }}>
            My Registered Farms
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Manage your agricultural plots across West Bengal and toggle active evaluation targets.
          </p>
        </div>

        <Link to="/app/register-farm" className="btn btn-primary">
          <Plus size={18} />
          <span>Register New Farm</span>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {farms.map(farm => {
          const isActive = activeFarm && activeFarm.id === farm.id;

          return (
            <div 
              key={farm.id} 
              className="card"
              style={{
                border: isActive ? '2px solid var(--color-agri-green)' : '1px solid var(--color-border)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Status Badges */}
                <div className="flex items-center justify-between" style={{ marginBottom: '0.85rem' }}>
                  <DemoBadge label={farm.id.startsWith('farm-custom') ? 'USER REGISTERED' : 'DEMO PROFILE'} />
                  {isActive && (
                    <span className="badge badge-live">
                      <CheckCircle size={12} />
                      Active Farm
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark-blue)', marginBottom: '0.35rem' }}>
                  {farm.name}
                </h3>

                <div className="flex items-center gap-1" style={{ fontSize: '0.85rem', color: 'var(--color-satellite-blue)', marginBottom: '0.75rem', fontWeight: 600 }}>
                  <MapPin size={14} />
                  <span>{farm.village ? `${farm.village}, ` : ''}{farm.district}, West Bengal</span>
                </div>

                <div style={{ background: 'var(--color-soft-bg)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>Farm Area:</span>
                    <strong>{farm.area} {farm.areaUnit} ({farm.areaInAcres} Acres)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>Coordinates:</span>
                    <span>{farm.coordinates.latitude}° N, {farm.coordinates.longitude}° E</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>Main Crop:</span>
                    <strong style={{ color: 'var(--color-dark-blue)' }}>{farm.mainCrop}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>Agro-Climatic Zone:</span>
                    <span>{farm.agroClimaticZone || 'West Bengal Belt'}</span>
                  </div>
                </div>

                {farm.description && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {farm.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.85rem' }}>
                {!isActive ? (
                  <button
                    onClick={() => switchFarm(farm.id)}
                    className="btn btn-sm btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Select as Active
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn btn-sm btn-ghost"
                    style={{ flex: 1, color: 'var(--color-agri-green)', fontWeight: 700 }}
                  >
                    ✓ Currently Selected
                  </button>
                )}

                <button
                  onClick={() => {
                    switchFarm(farm.id);
                    navigate('/app/overview');
                  }}
                  className="btn btn-sm btn-primary"
                  title="View Farm Dashboard"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
