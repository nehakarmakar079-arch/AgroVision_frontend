import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFarm } from '../../context/FarmContext';
import { 
  Menu, 
  X, 
  Bell, 
  CheckCircle, 
  ChevronDown, 
  MapPin, 
  Layers, 
  UserCheck 
} from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const { activeFarm, farms, switchFarm, notifications, dismissNotification } = useFarm();
  const [showFarmDropdown, setShowFarmDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const farmDropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (farmDropdownRef.current && !farmDropdownRef.current.contains(event.target)) {
        setShowFarmDropdown(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const isDashboardView = location.pathname.startsWith('/app');

  return (
    <header style={{
      height: 'var(--navbar-height)',
      backgroundColor: 'var(--color-deep-navy)',
      color: 'var(--color-white)',
      borderBottom: '1px solid rgba(53, 197, 244, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 12px rgba(6, 20, 38, 0.25)'
    }}>
      <div className="container flex items-center justify-between" style={{ height: '100%' }}>
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          {isDashboardView && (
            <button 
              onClick={onToggleSidebar}
              style={{ color: 'var(--color-white)', padding: '0.4rem', display: 'flex', alignItems: 'center' }}
              aria-label="Toggle Dashboard Sidebar"
            >
              <Menu size={22} />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <img 
              src="/assets/agrovision-logo.png" 
              alt="AgroVision Emblem" 
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
            <div className="flex flex-col">
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.25rem', 
                fontWeight: 800, 
                color: 'var(--color-white)',
                lineHeight: 1
              }}>
                Agro<span style={{ color: 'var(--color-lime-green)' }}>Vision</span>
              </span>
              <span style={{ 
                fontSize: '0.68rem', 
                color: 'var(--color-bright-cyan)', 
                letterSpacing: '0.04em',
                fontWeight: 600,
                marginTop: '2px'
              }}>
                Space Data to Farm Decisions
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-4" style={{ display: 'none' }} id="desktop-nav">
          <Link 
            to="/" 
            style={{ 
              color: location.pathname === '/' ? 'var(--color-lime-green)' : 'var(--color-white)',
              fontWeight: 600,
              fontSize: '0.92rem'
            }}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            style={{ 
              color: location.pathname === '/about' ? 'var(--color-lime-green)' : 'var(--color-white)',
              fontWeight: 600,
              fontSize: '0.92rem'
            }}
          >
            About
          </Link>
          <Link 
            to="/app/overview" 
            className="btn btn-sm btn-primary"
            style={{ fontSize: '0.85rem' }}
          >
            Open Dashboard
          </Link>
        </nav>

        {/* Active Farm Switcher & Notifications */}
        <div className="flex items-center gap-2">
          {/* Active Farm Selector */}
          {activeFarm && (
            <div ref={farmDropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setShowFarmDropdown(!showFarmDropdown)}
                className="flex items-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(53, 197, 244, 0.3)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-white)',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                <MapPin size={14} style={{ color: 'var(--color-lime-green)' }} />
                <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {activeFarm.district} ({activeFarm.areaUnit === 'Bigha' ? `${activeFarm.area} Bigha` : `${activeFarm.area} Acre`})
                </span>
                <ChevronDown size={14} style={{ opacity: 0.7 }} />
              </button>

              {/* Dropdown Menu */}
              {showFarmDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '260px',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-dark)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-border)',
                  zIndex: 200,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '0.6rem 0.85rem', background: 'var(--color-soft-bg)', borderBottom: '1px solid var(--color-border)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-dark-blue)' }}>
                    SELECT DEMONSTRATION FARM
                  </div>
                  {farms.map(f => (
                    <button
                      key={f.id}
                      onClick={() => {
                        switchFarm(f.id);
                        setShowFarmDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 0.85rem',
                        borderBottom: '1px solid var(--color-border)',
                        background: f.id === activeFarm.id ? 'rgba(56, 168, 50, 0.08)' : 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <strong style={{ fontSize: '0.85rem', color: 'var(--color-dark-blue)' }}>{f.name}</strong>
                        {f.id === activeFarm.id && <CheckCircle size={14} style={{ color: 'var(--color-agri-green)' }} />}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {f.district} • {f.agroClimaticZone}
                      </span>
                    </button>
                  ))}
                  <div style={{ padding: '0.5rem 0.85rem', textAlign: 'center', background: '#F8FAFC' }}>
                    <Link 
                      to="/app/register-farm" 
                      onClick={() => setShowFarmDropdown(false)}
                      style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-satellite-blue)' }}
                    >
                      + Register Your Own Farm
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notifications Dropdown */}
          <div ref={notifDropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: 'var(--color-white)',
                padding: '0.45rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
              }}
              aria-label="Notifications"
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '8px',
                  height: '8px',
                  background: 'var(--color-lime-green)',
                  borderRadius: '50%'
                }} />
              )}
            </button>

            {showNotifDropdown && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '300px',
                background: 'var(--color-surface)',
                color: 'var(--color-text-dark)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
                zIndex: 200,
                maxHeight: '360px',
                overflowY: 'auto'
              }}>
                <div style={{ padding: '0.65rem 1rem', background: 'var(--color-soft-bg)', borderBottom: '1px solid var(--color-border)', fontSize: '0.8rem', fontWeight: 700 }}>
                  SYSTEM NOTIFICATIONS
                </div>
                {notifications.length === 0 ? (
                  <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    No unread notifications.
                  </div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.82rem' }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: '0.2rem' }}>
                        <strong style={{ color: 'var(--color-dark-blue)' }}>{n.title}</strong>
                        <button onClick={() => dismissNotification(n.id)} style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>×</button>
                      </div>
                      <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Quick Dashboard Action */}
          <Link 
            to="/app/overview" 
            className="btn btn-sm btn-accent"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Layers size={14} />
            <span>Farm Portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
