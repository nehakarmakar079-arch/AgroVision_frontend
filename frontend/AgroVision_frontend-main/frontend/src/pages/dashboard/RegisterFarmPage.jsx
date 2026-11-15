import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFarm } from '../../context/FarmContext';
import { farmService } from '../../services/farmService';
import FarmLocationPicker from '../../components/map/FarmLocationPicker';
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function RegisterFarmPage() {
  const { addFarm } = useFarm();
  const navigate = useNavigate();
  const districts = farmService.getDistricts();

  const [formData, setFormData] = useState({
    name: '',
    farmerName: '',
    state: 'West Bengal',
    district: 'Purba Bardhaman',
    block: '',
    village: '',
    area: '',
    areaUnit: 'Bigha', // Default for WB
    farmType: 'Irrigated Alluvial',
    mainCrop: 'Aman Paddy',
    latitude: 23.2324,
    longitude: 87.8615
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Conversion calculations for West Bengal standard: 1 Bigha = 0.3306 Acre = 0.1338 Hectare
  const numArea = parseFloat(formData.area) || 0;
  let convertedAcres = 0;
  let convertedHectares = 0;
  let convertedBigha = 0;

  if (formData.areaUnit === 'Bigha') {
    convertedBigha = numArea;
    convertedAcres = (numArea * 0.3306).toFixed(2);
    convertedHectares = (numArea * 0.1338).toFixed(2);
  } else if (formData.areaUnit === 'Acre') {
    convertedAcres = numArea;
    convertedBigha = (numArea * 3.025).toFixed(2);
    convertedHectares = (numArea * 0.4047).toFixed(2);
  } else {
    convertedHectares = numArea;
    convertedBigha = (numArea * 7.475).toFixed(2);
    convertedAcres = (numArea * 2.471).toFixed(2);
  }

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = 'Please provide a name for your farm.';
    if (!formData.district) err.district = 'Please select your district in West Bengal.';
    if (!formData.area || numArea <= 0) err.area = 'Please enter a valid farm area greater than 0.';
    if (!formData.latitude || !formData.longitude) err.coordinates = 'Please select a location on the map.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        area: numArea,
        areaInAcres: parseFloat(convertedAcres) || numArea,
        coordinates: {
          latitude: formData.latitude,
          longitude: formData.longitude
        },
        soilType: formData.district.includes('24 Parganas') ? 'Saline Coastal Clay' : 'Gangetic Alluvium (Clay Loam)'
      };

      await addFarm(payload);
      navigate('/app/overview');
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--color-dark-blue)', marginBottom: '0.35rem' }}>
          Register Your Farm
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Identify your farm location and basic cropping details to connect location-specific NASA environmental observations.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* Column 1: Farm Information */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '1.25rem' }}>
              1. Farm & Farmer Identity
            </h3>

            <div className="form-group">
              <label className="form-label">Farm / Plot Name *</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g., Uttar Math Plot #4"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Farmer / Manager Name (Optional)</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g., Animesh Mondal"
                value={formData.farmerName}
                onChange={e => setFormData({ ...formData, farmerName: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">State</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.state} 
                  disabled 
                  style={{ background: 'var(--color-soft-bg)', color: 'var(--color-text-muted)' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">District in West Bengal *</label>
                <select 
                  className="form-select"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                >
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.district && <span className="form-error">{errors.district}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Block (Optional)</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g., Memari / Singur"
                  value={formData.block}
                  onChange={e => setFormData({ ...formData, block: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Village (Optional)</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g., Bagila"
                  value={formData.village}
                  onChange={e => setFormData({ ...formData, village: e.target.value })}
                />
              </div>
            </div>

            {/* Farm Area & Unit Conversion */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Farm Area *</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0.1"
                    className="form-input"
                    placeholder="e.g., 3.5"
                    value={formData.area}
                    onChange={e => setFormData({ ...formData, area: e.target.value })}
                  />
                  {errors.area && <span className="form-error">{errors.area}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Area Unit</label>
                  <select 
                    className="form-select"
                    value={formData.areaUnit}
                    onChange={e => setFormData({ ...formData, areaUnit: e.target.value })}
                  >
                    <option value="Bigha">Bigha (বিঘা)</option>
                    <option value="Acre">Acre</option>
                    <option value="Hectare">Hectare</option>
                  </select>
                </div>
              </div>

              {numArea > 0 && (
                <div style={{ background: 'rgba(56, 168, 50, 0.08)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--color-agri-green)' }}>
                  <strong>Equivalent:</strong> {convertedBigha} Bigha ≈ {convertedAcres} Acres ({convertedHectares} Hectares)
                </div>
              )}
            </div>

            {/* Farm Type & Main Crop */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Primary Farm Type</label>
                <select 
                  className="form-select"
                  value={formData.farmType}
                  onChange={e => setFormData({ ...formData, farmType: e.target.value })}
                >
                  <option value="Irrigated Alluvial">Irrigated Alluvial (Canal/Tubewell)</option>
                  <option value="Rainfed Medium Land">Rainfed Medium Land</option>
                  <option value="Coastal Saline Lowland">Coastal Saline Lowland (Sundarbans)</option>
                  <option value="Red Laterite Upland">Red Laterite Upland</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Current Main Crop</label>
                <select 
                  className="form-select"
                  value={formData.mainCrop}
                  onChange={e => setFormData({ ...formData, mainCrop: e.target.value })}
                >
                  <option value="Aman Paddy">Aman Paddy (Kharif)</option>
                  <option value="Boro Paddy">Boro Paddy (Summer)</option>
                  <option value="Potato">Potato (Rabi)</option>
                  <option value="Mustard">Mustard (Rabi)</option>
                  <option value="Jute">Jute (Pre-Kharif)</option>
                  <option value="Sesame">Sesame / Til</option>
                  <option value="Pulses">Pulses (Moong / Lentil)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Location Selection */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>
              2. Pinpoint Farm on Map
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Use your device GPS or tap directly on the map. NASA satellite environmental metrics will be retrieved for these exact coordinates.
            </p>

            <FarmLocationPicker 
              latitude={formData.latitude}
              longitude={formData.longitude}
              district={formData.district}
              onLocationChange={(lat, lng) => setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }))}
            />

            {/* Privacy Guarantee */}
            <div className="flex items-start gap-2" style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'var(--color-soft-bg)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              <ShieldCheck size={16} style={{ color: 'var(--color-agri-green)', flexShrink: 0, marginTop: '2px' }} />
              <span>
                <strong>Privacy Guaranteed:</strong> Coordinates are used strictly to query regional NASA Earth data and are not shared publicly or commercialized.
              </span>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between" style={{ padding: '1.5rem', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            * Mandatory fields required for agro-climatic assessment
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-lg btn-primary"
            style={{ minWidth: '220px' }}
          >
            {isSubmitting ? 'Registering Farm...' : 'Save & Open Dashboard'}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
