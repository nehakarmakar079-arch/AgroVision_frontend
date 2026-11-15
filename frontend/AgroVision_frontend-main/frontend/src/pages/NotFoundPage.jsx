import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ padding: '6rem 1rem', textAlign: 'center', backgroundColor: 'var(--color-soft-bg)' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--color-satellite-blue)', marginBottom: '0.5rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-dark-blue)' }}>Page Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          The farm coordinate or portal page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Home size={18} />
          <span>Return to AgroVision Home</span>
        </Link>
      </div>
    </div>
  );
}
