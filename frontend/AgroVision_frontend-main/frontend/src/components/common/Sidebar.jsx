import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  PlusCircle, 
  CloudSun, 
  Satellite, 
  AlertTriangle, 
  Repeat, 
  Activity, 
  FileText, 
  Microscope, 
  Settings,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/app/overview', label: 'Farm Overview', icon: LayoutDashboard },
  { path: '/app/farms', label: 'My Farms', icon: MapPin },
  { path: '/app/register-farm', label: 'Register New Farm', icon: PlusCircle },
  { path: '/app/climate', label: 'Climate Intelligence', icon: CloudSun },
  { path: '/app/satellite', label: 'Satellite Monitoring', icon: Satellite },
  { path: '/app/risk', label: 'Risk Intelligence', icon: AlertTriangle },
  { path: '/app/crop-planner', label: 'Crop Rotation Planner', icon: Repeat },
  { path: '/app/recovery', label: 'Recovery Tracker', icon: Activity },
  { path: '/app/reports', label: 'Farmer Reports', icon: FileText },
  { path: '/app/research', label: 'Research Workspace', icon: Microscope },
  { path: '/app/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(6, 20, 38, 0.6)',
            zIndex: 90,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      <aside style={{
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--color-dark-blue)',
        color: 'var(--color-white)',
        borderRight: '1px solid rgba(53, 197, 244, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - var(--navbar-height))',
        position: 'sticky',
        top: 'var(--navbar-height)',
        zIndex: 95,
        transition: 'transform var(--transition-normal)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
      }}
      className="sidebar-responsive"
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between" style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-bright-cyan)', letterSpacing: '0.05em' }}>
            PORTAL NAVIGATION
          </span>
          <button onClick={onClose} style={{ color: 'var(--color-white)' }} className="close-btn">
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0.5rem' }}>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer Meta */}
        <div style={{ 
          padding: '0.85rem 1rem', 
          background: 'var(--color-deep-navy)', 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.75rem',
          color: 'var(--color-text-light)'
        }}>
          <div>West Bengal Pilot Region</div>
          <div style={{ color: 'var(--color-bright-cyan)', fontWeight: 600 }}>Agricultural Decision Engine</div>
        </div>
      </aside>
    </>
  );
}
