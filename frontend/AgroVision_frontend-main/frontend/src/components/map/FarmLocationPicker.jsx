import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Compass, AlertCircle } from 'lucide-react';

// Fix Leaflet's default icon path issue in React Vite
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map clicks and marker placement
function LocationMarker({ position, onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    }
  });

  return position ? <Marker position={position} icon={defaultIcon} /> : null;
}

// Controller component to smoothly pan map when coordinates change externally
function MapCenterController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
  return null;
}

export default function FarmLocationPicker({ 
  latitude, 
  longitude, 
  onLocationChange,
  district 
}) {
  const [currentPos, setCurrentPos] = useState(
    latitude && longitude ? [latitude, longitude] : [23.2324, 87.8615] // Default: Purba Bardhaman
  );
  const [zoomLevel, setZoomLevel] = useState(8);
  const [geoError, setGeoError] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    if (latitude && longitude) {
      setCurrentPos([latitude, longitude]);
    }
  }, [latitude, longitude]);

  const handleSelect = (lat, lng) => {
    const fixedLat = parseFloat(lat.toFixed(5));
    const fixedLng = parseFloat(lng.toFixed(5));
    setCurrentPos([fixedLat, fixedLng]);
    onLocationChange(fixedLat, fixedLng);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('GPS Geolocation is not supported by your current browser.');
      return;
    }

    setIsDetecting(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetecting(false);
        const { latitude: lat, longitude: lng } = pos.coords;
        handleSelect(lat, lng);
        setZoomLevel(13); // Zoom closer to detected field
      },
      (err) => {
        setIsDetecting(false);
        if (err.code === 1) {
          setGeoError('Location permission was denied. You can still tap directly on the map to pick your farm.');
        } else {
          setGeoError('Unable to retrieve your current location. Please select your farm manually on the map.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const quickJump = (lat, lng, name) => {
    handleSelect(lat, lng);
    setZoomLevel(11);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Controls Bar */}
      <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="btn btn-sm btn-primary"
            style={{ fontSize: '0.82rem' }}
          >
            <Navigation size={14} className={isDetecting ? 'spin' : ''} />
            <span>{isDetecting ? 'Detecting GPS...' : 'Detect My Location'}</span>
          </button>

          <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
            or tap on the map below
          </span>
        </div>

        {/* Quick Candidate Pilot Jumps */}
        <div className="flex items-center gap-1" style={{ fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Quick Jump:</span>
          <button 
            type="button" 
            onClick={() => quickJump(23.2324, 87.8615, 'Bardhaman')} 
            className="btn btn-sm btn-ghost" 
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
          >
            Burdwan
          </button>
          <button 
            type="button" 
            onClick={() => quickJump(22.8126, 88.2312, 'Hooghly')} 
            className="btn btn-sm btn-ghost" 
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
          >
            Hooghly
          </button>
          <button 
            type="button" 
            onClick={() => quickJump(22.1648, 88.8062, 'Gosaba')} 
            className="btn btn-sm btn-ghost" 
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
          >
            Gosaba (Sundarbans)
          </button>
        </div>
      </div>

      {geoError && (
        <div className="alert-strip alert-strip-warning" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', margin: 0 }}>
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          <span>{geoError}</span>
        </div>
      )}

      {/* Leaflet Map Display */}
      <div style={{ height: '360px', width: '100%', position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1.5px solid var(--color-border)' }}>
        <MapContainer
          center={currentPos}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={currentPos} onLocationSelect={handleSelect} />
          <MapCenterController center={currentPos} zoom={zoomLevel} />
        </MapContainer>
      </div>

      {/* Coordinate & District Status */}
      <div className="flex items-center justify-between" style={{ background: 'var(--color-surface)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.82rem' }}>
        <div className="flex items-center gap-1" style={{ color: 'var(--color-dark-blue)', fontWeight: 600 }}>
          <MapPin size={15} style={{ color: 'var(--color-agri-green)' }} />
          <span>Selected Coordinates: {currentPos[0]}° N, {currentPos[1]}° E</span>
        </div>
        <span style={{ color: 'var(--color-satellite-blue)', fontWeight: 600 }}>
          West Bengal, India
        </span>
      </div>
    </div>
  );
}
