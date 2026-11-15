import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useFarm } from '../context/FarmContext';
import { MapPin, Info } from 'lucide-react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeFarm } = useFarm();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main style={{ 
          flex: 1, 
          padding: '1.5rem', 
          backgroundColor: 'var(--color-soft-bg)',
          maxWidth: '100%',
          overflowX: 'hidden'
        }}>
          <div className="container" style={{ padding: 0 }}>
            {/* Top Bar Banner showing Active Farm */}
            {activeFarm && (
              <div style={{
                background: 'linear-gradient(90deg, var(--color-dark-blue) 0%, var(--color-deep-navy) 100%)',
                color: 'var(--color-white)',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                boxShadow: '0 2px 8px rgba(6, 20, 38, 0.15)'
              }}>
                <div className="flex items-center gap-2">
                  <div style={{
                    background: 'rgba(56, 168, 50, 0.25)',
                    padding: '0.4rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-lime-green)'
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                      {activeFarm.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                      {activeFarm.village ? `${activeFarm.village}, ` : ''}{activeFarm.block ? `${activeFarm.block}, ` : ''}{activeFarm.district} • {activeFarm.area} {activeFarm.areaUnit} ({activeFarm.areaInAcres} Acres)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeFarm.id?.startsWith('farm-custom') ? (
                    <span className="badge badge-live">
                      Registered Plot
                    </span>
                  ) : (
                    <span className="badge badge-demo">
                      Demo Profile
                    </span>
                  )}
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-bright-cyan)', fontWeight: 600 }}>
                    {activeFarm.soilType}
                  </span>
                </div>
              </div>
            )}

            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
