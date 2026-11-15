import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FarmProvider } from './context/FarmContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Dashboard Pages
import OverviewPage from './pages/dashboard/OverviewPage';
import MyFarmsPage from './pages/dashboard/MyFarmsPage';
import RegisterFarmPage from './pages/dashboard/RegisterFarmPage';
import ClimatePage from './pages/dashboard/ClimatePage';
import SatellitePage from './pages/dashboard/SatellitePage';
import RiskPage from './pages/dashboard/RiskPage';
import CropPlannerPage from './pages/dashboard/CropPlannerPage';
import RecoveryPage from './pages/dashboard/RecoveryPage';
import ReportsPage from './pages/dashboard/ReportsPage';
import ResearchPage from './pages/dashboard/ResearchPage';
import SettingsPage from './pages/dashboard/SettingsPage';

export default function App() {
  return (
    <FarmProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Farm Dashboard Application Routes */}
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/app/overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="farms" element={<MyFarmsPage />} />
            <Route path="register-farm" element={<RegisterFarmPage />} />
            <Route path="climate" element={<ClimatePage />} />
            <Route path="satellite" element={<SatellitePage />} />
            <Route path="risk" element={<RiskPage />} />
            <Route path="crop-planner" element={<CropPlannerPage />} />
            <Route path="recovery" element={<RecoveryPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FarmProvider>
  );
}
