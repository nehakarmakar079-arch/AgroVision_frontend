import React, { createContext, useContext, useState, useEffect } from 'react';
import { farmService } from '../services/farmService';

const FarmContext = createContext();

export function FarmProvider({ children }) {
  const [farms, setFarms] = useState([]);
  const [activeFarm, setActiveFarm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unitPreference, setUnitPreference] = useState('Bigha'); // West Bengal default
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'info',
      title: 'Active Demonstration Mode',
      message: 'Viewing Purba Bardhaman demo plot. Switch to Gosaba or Hooghly in the top bar to inspect coastal salinity and multi-crop scenarios.',
      timestamp: 'Just now'
    },
    {
      id: 'notif-2',
      type: 'success',
      title: 'NASA POWER Feed Connected',
      message: 'Monthly climatological baselines and recent anomalies loaded for West Bengal.',
      timestamp: 'Today'
    }
  ]);

  // Load farms on mount
  useEffect(() => {
    async function loadFarms() {
      setIsLoading(true);
      try {
        const loaded = await farmService.getAllFarms();
        setFarms(loaded);
        if (loaded.length > 0) {
          // Default to first demo farm (Purba Bardhaman)
          setActiveFarm(loaded[0]);
        }
      } catch (err) {
        console.error('Failed to load farms:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadFarms();
  }, []);

  const switchFarm = (farmId) => {
    const selected = farms.find(f => f.id === farmId);
    if (selected) {
      setActiveFarm(selected);
      // Add notification for context awareness
      setNotifications(prev => [
        {
          id: `switch-${Date.now()}`,
          type: 'info',
          title: `Switched to ${selected.name}`,
          message: `Active district: ${selected.district} (${selected.agroClimaticZone || 'West Bengal'})`,
          timestamp: 'Just now'
        },
        ...prev.slice(0, 4)
      ]);
    }
  };

  const addFarm = async (farmData) => {
    const saved = await farmService.registerFarm(farmData);
    setFarms(prev => [saved, ...prev]);
    setActiveFarm(saved);
    setNotifications(prev => [
      {
        id: `reg-${Date.now()}`,
        type: 'success',
        title: 'New Farm Registered',
        message: `${saved.name} in ${saved.district} is now active for analysis.`,
        timestamp: 'Just now'
      },
      ...prev.slice(0, 4)
    ]);
    return saved;
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <FarmContext.Provider
      value={{
        farms,
        activeFarm,
        isLoading,
        switchFarm,
        addFarm,
        unitPreference,
        setUnitPreference,
        notifications,
        dismissNotification
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
}
