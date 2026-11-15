import React from 'react';
import { Link } from 'react-router-dom';
import { Satellite, Award, Users, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-soft-bg)', padding: '3.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <img 
            src="/assets/agrovision-logo.png" 
            alt="AgroVision Emblem" 
            style={{ height: '90px', width: 'auto', marginBottom: '1.25rem' }} 
          />
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: 'var(--color-dark-blue)' }}>
            About AgroVision
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-satellite-blue)', fontWeight: 600 }}>
            From Space Data to Farm Recovery Decisions
          </p>
        </div>

        {/* Mission Card */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--color-dark-blue)' }}>
            Our Mission & Purpose
          </h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
            AgroVision was developed for the <strong>NASA Space Apps Challenge 2026</strong> under the challenge 
            <em>"Field Shift: Adapting Farms with NASA Data"</em> by <strong>Team Innovatrix</strong>.
          </p>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
            Our vision is to bridge the gap between petabytes of open NASA Earth observation data and the daily decisions of smallholder farmers in <strong>West Bengal, India</strong>. Rather than serving another complex scientific portal, AgroVision translates satellite signals into plain-English agricultural guidance: helping farmers break continuous monoculture, conserve depleted groundwater, and recover after flood or salinity shocks.
          </p>
        </div>

        {/* Team Innovatrix */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
            <Users size={22} style={{ color: 'var(--color-satellite-blue)' }} />
            <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Team Innovatrix</h3>
          </div>
          <p style={{ lineHeight: 1.6, color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
            We are first-year engineering students passionate about space science, remote sensing, and grassroots agricultural development.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '0.85rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)' }}>
              <strong>Event:</strong> NASA Space Apps Challenge 2026
            </div>
            <div style={{ padding: '0.85rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)' }}>
              <strong>Geography:</strong> West Bengal, India
            </div>
            <div style={{ padding: '0.85rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)' }}>
              <strong>Discipline:</strong> AgriTech & Remote Sensing
            </div>
          </div>
        </div>

        {/* Scientific Integrity */}
        <div className="card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-dark-blue)' }}>
            Our Scientific Commitment
          </h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
            <li>We do not pretend that satellite data directly measures soil NPK or exact farm-level chemical fertility.</li>
            <li>We explicitly display spatial resolutions ($50\text{km}$ for NASA POWER, $9\text{km}$ for SMAP, $30\text{m}$ for HLS) so users and judges understand the observational scale.</li>
            <li>All demonstration profiles are clearly labelled with <code>[DEMO DATA]</code> badges.</li>
            <li>All recommendations adhere to verified crop calendars from Bidhan Chandra Krishi Viswavidyalaya (BCKV).</li>
          </ul>
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/app/overview" className="btn btn-lg btn-primary">
            <span>Explore the Platform</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
