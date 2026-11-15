// Farm Advisory Report Service
// Compiles farm data, NASA observations, and recommendations for printing and CSV export

import { farmService } from './farmService';
import { climateService } from './climateService';
import { riskService } from './riskService';
import { cropService } from './cropService';

export const reportService = {
  async generateFarmReport(farmId) {
    const farm = await farmService.getFarmById(farmId);
    const climate = await climateService.getClimateByFarmId(farmId);
    const risks = await riskService.getRiskAssessment(farmId);
    const rotation = await cropService.getRotationRecommendations(farmId);

    return {
      reportId: `AGRO-REP-${farmId}-${Date.now().toString().slice(-6)}`,
      generatedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      farm,
      climate: climate.data,
      risks: risks.data,
      rotation: rotation.data,
      nasaMetadata: {
        sources: 'NASA POWER, GPM IMERG, SMAP, Landsat/MODIS HLS',
        institution: 'AgroVision Agricultural Decision Support Platform',
        officialTagline: 'From Space Data to Farm Recovery Decisions',
        disclaimer: 'This advisory report synthesizes NASA satellite Earth observations with local agro-ecological guidelines. It provides decision-support context for farmers and field workers. Ground verification is recommended.'
      }
    };
  },

  exportToCSV(reportData) {
    const headers = ['Category', 'Parameter', 'Observed Value', 'Source'];
    const rows = [
      ['Farm Profile', 'Farm Name', reportData.farm?.name || '', 'AgroVision Registry'],
      ['Farm Profile', 'District', reportData.farm?.district || '', 'AgroVision Registry'],
      ['Farm Profile', 'Area', `${reportData.farm?.area || ''} ${reportData.farm?.areaUnit || ''}`, 'Farmer Provided'],
      ['Climate Snapshot', 'Temperature', `${reportData.climate?.currentSnapshot?.temperature ?? ''} °C`, 'NASA POWER'],
      ['Climate Snapshot', 'Relative Humidity', `${reportData.climate?.currentSnapshot?.relativeHumidity ?? ''} %`, 'NASA POWER'],
      ['Climate Snapshot', 'Rainfall Monthly to Date', `${reportData.climate?.currentSnapshot?.rainfallMonthlyToDate ?? ''} mm`, 'NASA POWER'],
      ['Risk Intelligence', 'Overall Risk Level', reportData.risks?.overallRiskLevel || '', 'AgroVision Synthesis']
    ];

    const escapeCsv = (val) => {
      const str = String(val ?? '');
      return `"${str.replace(/"/g, '""')}"`;
    };

    // Include UTF-8 Byte Order Mark (\uFEFF) for universal spreadsheet compatibility
    const csvContent = '\uFEFF' + [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AgroVision_Advisory_${reportData.farm?.id || 'plot'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
