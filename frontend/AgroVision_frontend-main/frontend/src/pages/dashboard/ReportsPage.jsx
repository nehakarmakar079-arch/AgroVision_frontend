import React, { useState, useEffect } from 'react';
import { useFarm } from '../../context/FarmContext';
import { reportService } from '../../services/reportService';
import { 
  Printer, 
  Download, 
  FileText, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Leaf, 
  Droplets,
  Satellite
} from 'lucide-react';

export default function ReportsPage() {
  const { activeFarm } = useFarm();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      if (!activeFarm) return;
      setLoading(true);
      try {
        const rep = await reportService.generateFarmReport(activeFarm.id);
        setReport(rep);
      } catch (err) {
        console.error('Failed to generate report:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [activeFarm]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (report) {
      reportService.exportToCSV(report);
    }
  };

  if (!activeFarm || !report) {
    return <div className="card" style={{ padding: '2rem' }}>Compiling Farm Advisory Report...</div>;
  }

  const { farm, climate, risks, rotation, nasaMetadata } = report;
  const topPlan = rotation && rotation[0];

  return (
    <div>
      {/* Top Controls Bar (Hidden during print) */}
      <div className="flex items-center justify-between no-print" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.25rem' }}>
            Farmer Advisory Report
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
            Official printable farm advisory sheet synthesizing NASA observations with agronomic recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleExportCSV} className="btn btn-secondary">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={16} />
            <span>Print Official Report</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE REPORT SHEET CONTAINER */}
      <div 
        id="printable-report"
        className="card print-sheet" 
        style={{ 
          background: '#FFFFFF', 
          padding: '2.5rem', 
          maxWidth: '850px', 
          margin: '0 auto 2rem',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Report Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--color-satellite-blue)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div className="flex items-center gap-3">
            <img 
              src="/assets/agrovision-logo.png" 
              alt="AgroVision Official Emblem" 
              style={{ height: '65px', width: 'auto' }}
            />
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-dark-blue)', lineHeight: 1 }}>
                Agro<span style={{ color: 'var(--color-agri-green)' }}>Vision</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-satellite-blue)', fontWeight: 700, letterSpacing: '0.04em', marginTop: '3px' }}>
                Climate-Informed Crop Advisory & Adaptation Summary
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                AgroVision Research & Advisory System • West Bengal
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--color-text-dark)' }}>
            <div><strong>Report Ref:</strong> {report.reportId}</div>
            <div><strong>Date:</strong> {report.generatedAt}</div>
            <div style={{ marginTop: '0.25rem' }}><span className="badge badge-demo">Advisory Summary</span></div>
          </div>
        </div>

        {/* Section 1: Farm & Farmer Metadata */}
        <div style={{ marginBottom: '1.5rem', background: 'var(--color-soft-bg)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--color-dark-blue)', marginBottom: '0.65rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.35rem' }}>
            1. Registered Plot Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Farm Name:</span>
              <div style={{ fontWeight: 700, color: 'var(--color-dark-blue)' }}>{farm.name}</div>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Location:</span>
              <div style={{ fontWeight: 700 }}>{farm.village ? `${farm.village}, ` : ''}{farm.district}, WB</div>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Coordinates:</span>
              <div>{farm.coordinates.latitude}° N, {farm.coordinates.longitude}° E</div>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Farm Area:</span>
              <div style={{ fontWeight: 700 }}>{farm.area} {farm.areaUnit} ({farm.areaInAcres} Acres)</div>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Soil Classification:</span>
              <div>{farm.soilType}</div>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Agro-Climatic Zone:</span>
              <div>{farm.agroClimaticZone || 'West Bengal'}</div>
            </div>
          </div>
        </div>

        {/* Section 2: NASA Agroclimatology Snapshot */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--color-dark-blue)', marginBottom: '0.65rem' }}>
            2. Climate & Environmental Evidence (NASA POWER & GPM)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', fontSize: '0.82rem', textAlign: 'center' }}>
            <div style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Temperature Envelope</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-dark-blue)' }}>{climate?.currentSnapshot?.temperature}°C</div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Min: {climate?.currentSnapshot?.minTemperature}°C • Max: {climate?.currentSnapshot?.maxTemperature}°C</span>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Monthly Rainfall</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-satellite-blue)' }}>{climate?.currentSnapshot?.rainfallMonthlyToDate} mm</div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-agri-green)' }}>Normal Accumulation</span>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Relative Humidity</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-dark-blue)' }}>{climate?.currentSnapshot?.relativeHumidity}%</div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>RH2M (Morning/Evening)</span>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Overall Risk Index</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: risks?.overallRiskLevel.includes('High') ? 'var(--color-danger)' : 'var(--color-agri-green)', marginTop: '3px' }}>
                {risks?.overallRiskLevel.includes('High') ? 'Elevated Salinity' : 'Safe / Moderate'}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Multi-Hazard Evaluation</span>
            </div>
          </div>
        </div>

        {/* Section 3: Recommended Alternative Crop Rotation */}
        {topPlan && (
          <div style={{ marginBottom: '1.5rem', border: '1.5px solid var(--color-agri-green)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', background: 'rgba(56, 168, 50, 0.04)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-dark-blue)', margin: 0 }}>
                3. Primary Recommended Crop Rotation Cycle
              </h3>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--color-agri-green)', color: '#FFFFFF', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                HIGHEST RESILIENCE
              </span>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark-blue)', marginBottom: '0.65rem' }}>
              {topPlan.sequence}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', marginBottom: '0.85rem' }}>
              {topPlan.timing?.map((t, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.78rem' }}>
                  <div style={{ color: 'var(--color-satellite-blue)', fontWeight: 600 }}>{t.window} ({t.duration})</div>
                  <strong style={{ color: 'var(--color-dark-blue)' }}>{t.crop}</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{t.type}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--color-text-dark)' }}>
              <div><strong>• Water Conservation:</strong> {topPlan.waterBalance?.estimatedSavings}. {topPlan.waterBalance?.groundwaterImpact}.</div>
              <div><strong>• Soil Nitrogen Restoration:</strong> {topPlan.soilBenefit?.nitrogenContribution}.</div>
              <div><strong>• Pest Cycle Interruption:</strong> {topPlan.pestCycleBreak}</div>
            </div>
          </div>
        )}

        {/* Section 4: Farmer Action Checklist */}
        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ fontSize: '0.95rem', color: 'var(--color-dark-blue)', marginBottom: '0.5rem' }}>
            4. Recommended Action Protocols for Farmer
          </h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: 'var(--color-text-dark)', lineHeight: 1.6 }}>
            <li>Conduct a direct field soil EC test if farming in coastal/delta blocks (Sundarbans).</li>
            <li>Maintain 15cm standing paddy stubble mulch to conserve residual soil moisture for winter crops.</li>
            <li>Procure certified seeds for pulse/oilseed varieties from verified Krishi Vigyan Kendra (KVK) sources.</li>
          </ul>
        </div>

        {/* Report Footer & Disclaimer */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', fontSize: '0.72rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
          <div><strong>Scientific Acknowledgement:</strong> {nasaMetadata.sources}.</div>
          <div><strong>Disclaimer:</strong> {nasaMetadata.disclaimer}</div>
        </div>
      </div>

      {/* Print Specific CSS */}
      <style>{`
        @media print {
          .no-print, header, aside, footer, nav {
            display: none !important;
          }
          body, main, #root {
            background: #FFFFFF !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-sheet {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
