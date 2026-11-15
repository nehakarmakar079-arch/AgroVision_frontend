import React from 'react';
import { Satellite, Info, ShieldAlert } from 'lucide-react';

export default function DataSourceCard({ 
  sourceName, 
  product, 
  resolution, 
  observationDate, 
  coverage, 
  caveat 
}) {
  return (
    <div style={{
      background: 'rgba(22, 139, 206, 0.05)',
      border: '1px solid rgba(22, 139, 206, 0.2)',
      borderRadius: 'var(--radius-md)',
      padding: '0.85rem 1rem',
      fontSize: '0.85rem',
      marginTop: '1rem'
    }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem' }}>
        <span className="flex items-center gap-1" style={{ fontWeight: 600, color: 'var(--color-satellite-blue)' }}>
          <Satellite size={15} />
          {sourceName}
        </span>
        {product && (
          <span style={{ fontSize: '0.75rem', background: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            {product}
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', color: 'var(--color-text-dark)', marginBottom: '0.4rem' }}>
        {resolution && <div><strong>Resolution:</strong> {resolution}</div>}
        {observationDate && <div><strong>Observed:</strong> {observationDate}</div>}
        {coverage && <div><strong>Coverage:</strong> {coverage}</div>}
      </div>

      {caveat && (
        <div className="flex items-start gap-1" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', borderTop: '1px dashed rgba(22, 139, 206, 0.2)', paddingTop: '0.4rem' }}>
          <Info size={13} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-satellite-blue)' }} />
          <span>{caveat}</span>
        </div>
      )}
    </div>
  );
}
