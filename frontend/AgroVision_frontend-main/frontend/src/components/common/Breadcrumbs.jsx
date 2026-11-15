import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const ROUTE_LABELS = {
  app: 'Dashboard',
  overview: 'Farm Overview',
  farms: 'My Farms',
  'register-farm': 'Register New Farm',
  climate: 'Climate Intelligence',
  satellite: 'Satellite Monitoring',
  risk: 'Risk Intelligence',
  'crop-planner': 'Crop & Rotation Planner',
  recovery: 'Recovery Tracker',
  reports: 'Farmer Reports',
  research: 'Research Workspace',
  settings: 'Settings'
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" style={{ padding: '0.75rem 0', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
      <div className="flex items-center gap-2" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        <Link to="/" className="flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
          <Home size={14} />
          <span>Home</span>
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = ROUTE_LABELS[value] || value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <React.Fragment key={to}>
              <ChevronRight size={14} style={{ color: 'var(--color-border-dark)' }} />
              {isLast ? (
                <span style={{ fontWeight: 600, color: 'var(--color-dark-blue)' }}>{label}</span>
              ) : (
                <Link to={to} style={{ color: 'var(--color-text-muted)' }}>{label}</Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
