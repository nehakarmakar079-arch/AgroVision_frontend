# AgroVision — Space Data to Farm Recovery Decisions
**NASA Space Apps Challenge 2026 | Team Innovatrix | West Bengal, India**  
*Challenge Track: "Field Shift: Adapting Farms with NASA Data"*

---

## 1. Project Overview

**AgroVision** is a climate-informed agricultural decision-support platform engineered for smallholder farmers, agricultural extension workers, and agronomists across **West Bengal, India**. 

The platform bridges the gap between open NASA Earth observation data (NASA POWER, GPM IMERG, SMAP, Landsat/HLS, and MODIS) and actionable on-the-ground farming decisions. AgroVision translates complex satellite climatology and remote sensing metrics into practical guidance: helping farmers break continuous monoculture, protect vulnerable aquifers, screen multi-hazard risks (waterlogging and coastal salinity), and plan resilient crop rotations.

> **Project Identity:**  
> - **Project Name:** AgroVision  
> - **Tagline:** From Space Data to Farm Recovery Decisions  
> - **Team Name:** Innovatrix  
> - **Event:** NASA Space Apps Challenge 2026  
> - **Primary Geography:** West Bengal, India  

---

## 2. Problem Statement & Solution

### The Challenge in West Bengal
1. **Unbroken Monoculture & Soil Exhaustion:** In the Gangetic alluvial plains (e.g., Purba Bardhaman and Hooghly), intensive Rice–Potato–Boro Rice sequences have depleted organic soil carbon and strained groundwater reserves.
2. **Coastal Salinity & Storm Surges:** In the coastal Sundarbans delta (South 24 Parganas), post-monsoon dry-season soil electrical conductivity (EC > 4.0 dS/m) and tidal flooding drastically limit rabi crop survival without salinity-adaptive planning.
3. **Erratic Seasonal Transitions:** Shifting monsoon withdrawal dates and pre-monsoon heatwaves regularly jeopardize sowing windows for high-value rabi crops like potato and mustard.
4. **The Science-to-Farmer Translation Gap:** While NASA provides petabytes of open environmental data, smallholder farmers cannot directly consume gridded NetCDF or HDF5 files without translation into local agro-ecological contexts.

### The AgroVision Solution
AgroVision introduces a closed-loop, three-stage agricultural workflow:
- **BEFORE (Seasonal Risk Signals):** Pre-sowing evaluation of 10-year monthly normals (temperature, precipitation regularity, solar radiation) modeled after NASA POWER to optimize sowing windows.
- **DURING (Satellite & Field Reality):** In-season monitoring of vegetation greenness (NDVI) modeled after MODIS/Landsat and precipitation accumulation modeled after NASA GPM IMERG, paired with farmer photo evidence.
- **AFTER (Recovery & Rotation Planning):** Evaluation of 12-month farming sequences against agronomic rules to recommend 2–3 alternative crop rotations with explainable benefits (water conservation, biological nitrogen fixation, and pest breaks).

---

## 3. Features & Implementation Status

AgroVision explicitly separates implemented production-ready UI capabilities from demonstration datasets and planned backend integrations.

### A. Implemented Frontend Features (Production-Ready)
- **Interactive 12-Month Cropping Calendar:** Visual Jan–Dec matrix enabling farmers to specify current crop sequences and detect fallow gaps or continuous heavy feeder rotations.
- **Adaptive Crop Rotation Engine:** Generates 2–3 science-backed alternative rotation plans tailored to local West Bengal agro-climatic zones, with quantified water balance savings, soil nitrogen contribution, and pest cycle disruptions.
- **Climate "What-If" Scenario Simulator:** Interactive simulation sliders for delayed sowing dates, temperature offsets, and rainfall anomalies to forecast vegetative yield impacts.
- **Multi-Hazard Risk Screening:** Early screening for standing water/waterlogging hazards and coastal salinity vulnerability based on ICAR-CSSRI benchmarks.
- **Farmer Field Evidence Logging:** Direct photo upload preview and laboratory soil test input (pH, EC, N-P-K) with memory-safe browser lifecycle handling (URL.createObjectURL / URL.revokeObjectURL).
- **Interactive Farm Location Picker:** Leaflet-powered map with OpenStreetMap tiles and HTML5 GPS auto-detection (
avigator.geolocation).
- **Real-Time Land Measurement Converter:** Instant bidirectional conversion between traditional Bengali **Bigha** (~0.3306 Acre), **Acre**, and **Hectare**.
- **Printable Farmer Advisory Report & CSV Export:** One-click clean, printable advisory summary and UTF-8 BOM Excel-compatible CSV export.
- **Scientific Data Provenance Matrix:** Transparent documentation of spatial resolutions (50 km for NASA POWER, 10 km for GPM, 9 km for SMAP, 30 m for HLS), sensor platforms, and observational caveats.

### B. Demonstration & Regional Baseline Data (Calibrated Mock Feeds)
- **Demonstration Data Notice:** *All climatology curves, rainfall accumulations, and satellite vegetation indices in the current frontend demonstration are delivered via calibrated regional baseline datasets. These datasets represent realistic agro-climatic parameters for West Bengal zones and operate completely offline without requiring live NASA API credentials or network connections.*
- **Pre-configured Demonstration Farm Baselines:** Three representative farm profiles reflecting distinct agro-climatic zones in West Bengal:
  1. *Burdwan Alluvial Plot (Purba Bardhaman):* Rice–Potato–Mustard/Sesame cropping.
  2. *Singur Multi-Crop Farm (Hooghly):* Jute–Aman Paddy–Mustard cycle.
  3. *Gosaba Coastal Delta Farm (Sundarbans, South 24 Parganas):* Saline coastal clay with salt-tolerant Aman and zero-tillage relay Khesari.

### C. Planned Backend Integrations (Future Roadmap)
- Direct integration with live NASA POWER REST API for dynamic gridded daily agro-climatology.
- Direct telemetry ingestion from NASA GPM IMERG Early/Late runs for near-real-time precipitation accumulation.
- Direct integration with NASA SMAP L4 soil moisture products.
- Node.js + Express backend service layer handling server-side data caching and user plot analysis.

---

## 4. User Workflow

`
[ 1. Select / Register Farm ]
   └─ GPS auto-detect or click on West Bengal interactive map
   └─ Define plot size in Bigha, Acre, or Hectare
         │
[ 2. Define 12-Month Crop Calendar ]
   └─ Specify current annual planting sequence (Jan–Dec)
         │
[ 3. Evaluate Environmental Conditions ]
   ├─ BEFORE: Inspect 10-year climate normals & seasonal anomalies (NASA POWER parameters)
   ├─ DURING: Monitor precipitation accumulation & vegetation health (GPM & NDVI parameters)
   └─ RISKS: Check flood waterlogging & coastal delta salinity alerts
         │
[ 4. Explore Crop Rotation Alternatives ]
   ├─ Review 2–3 adaptation plans with explainable rationale
   └─ Test delayed sowing scenarios using the Climate Simulator
         │
[ 5. Track Recovery & Print Advisory ]
   ├─ Log ground-truth field photos and harvest milestones
   └─ Print official advisory sheet or export CSV data for field teams
`

---

## 5. Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.3.1 | Functional components, custom hooks, and React Context API |
| **Build Tool & Bundler** | Vite 6.0.1 | ESM development server and optimized Rollup production bundling |
| **Routing** | React Router DOM 6.28.0 | Declarative client-side routing across 14 dedicated application views |
| **Interactive Maps** | Leaflet 1.9.4 & React-Leaflet 4.2.1 | Lightweight OpenStreetMap tile rendering with zero paid API keys |
| **Data Visualizations** | Recharts 2.13.3 | Responsive SVG-based climate trends and multi-mission comparison curves |
| **Iconography** | Lucide React 0.460.0 | Accessible, modern SVG icons |
| **Styling & Design System** | Custom CSS3 Variables | Brand design tokens (Navy #061426, Satellite #168BCE, Green #38A832) |
| **Planned Backend** | Node.js + Express 4.21.1 | Modular REST API gateway for future live data feeds and analysis |

---

## 6. Frontend Architecture

The frontend follows a clean, modular architecture:

`
frontend/src/
├── api/
│   └── apiClient.js             # Configurable HTTP client with automatic demonstration fallback
├── components/
│   ├── common/                  # Navbar, Sidebar, Footer, Breadcrumbs, DemoBadge, DataSourceCard
│   └── map/                     # FarmLocationPicker (Leaflet GPS & coordinate selector)
├── context/
│   └── FarmContext.jsx          # Global active plot state, unit preferences & notifications
├── data/                        # Structured mock data engines (Burdwan, Hooghly, Gosaba)
├── layouts/
│   ├── MainLayout.jsx           # Public portal layout with brand navigation and footer
│   └── DashboardLayout.jsx      # Dashboard shell with responsive sidebar & active farm banner
├── pages/
│   ├── HomePage.jsx             # Public landing page with 3-stage visual explanation
│   ├── AboutPage.jsx            # Project mission, Team Innovatrix & scientific commitment
│   ├── NotFoundPage.jsx         # 404 error handler
│   └── dashboard/               # 11 specialized dashboard modules
│       ├── OverviewPage.jsx     # High-level environmental snapshot & next-step guidance
│       ├── MyFarmsPage.jsx      # Plot management and demo profile switcher
│       ├── RegisterFarmPage.jsx # Farm registration with GPS & Bigha converter
│       ├── ClimatePage.jsx      # NASA POWER historical monthly normals & anomalies
│       ├── SatellitePage.jsx    # GPM rainfall, SMAP moisture & MODIS/HLS NDVI curves
│       ├── RiskPage.jsx         # Waterlogging, salinity screening & photo evidence
│       ├── CropPlannerPage.jsx  # 12-month calendar & 2-3 rotation alternatives
│       ├── RecoveryPage.jsx     # Post-hazard recovery timeline & harvest checklist
│       ├── ReportsPage.jsx      # Printable advisory sheet & CSV exporter
│       ├── ResearchPage.jsx     # NASA data provenance matrix & validation notes
│       └── SettingsPage.jsx     # Area units, language preview & cache management
├── services/                    # Domain service layer (farm, climate, satellite, crop, report)
└── styles/                      # Brand tokens (variables.css), resets & components.css
`

---

## 7. Demonstration Farm Profiles

AgroVision includes three calibrated demonstration profiles representing West Bengal's major farming zones:

| Farm Profile | Location | Area | Soil & Zone | Cropping Cycle & Focus |
| :--- | :--- | :--- | :--- | :--- |
| **Burdwan Alluvial Demo Plot** | Purba Bardhaman | 4.5 Bigha (1.49 Acres) | Gangetic Alluvium (Clay Loam) | Rice–Potato–Mustard/Sesame; aquifer preservation & pulse nitrogen restoration |
| **Hooghly Multi-Crop Farm** | Singur, Hooghly | 3.0 Bigha (0.99 Acres) | Alluvial Silt Loam | Jute–Aman Paddy–Mustard; organic matter recycling & pest cycle disruption |
| **Gosaba Coastal Delta Farm** | South 24 Parganas (Sundarbans) | 5.0 Bigha (1.65 Acres) | Saline Coastal Clay | Salinity-adaptive relay cycle; salt-tolerant Aman with zero-tillage relay Khesari |

---

## 8. Installation & Local Setup

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### Step-by-Step Instructions

1. **Clone the repository:**
   `ash
   git clone https://github.com/Mr-supriyo/AgroVision_frontend.git
   cd AgroVision_frontend
   `

2. **Navigate to the frontend directory:**
   `ash
   cd frontend
   `

3. **Install dependencies:**
   `ash
   npm install
   `

4. **Start the local development server:**
   `ash
   npm run dev
   `
   Open your browser at **http://localhost:3000**.

5. **Build for production:**
   `ash
   npm run build
   `

6. **Preview the production bundle:**
   `ash
   npm run preview
   `

---

## 9. Backend Integration & API Specification

### Environment Variable Configuration
The frontend operates fully in demonstration mode by default without requiring an active backend or API keys.

To connect an optional backend service:
1. Create a .env file inside rontend/:
   `env
   # Backend API Base URL (leave blank for local demonstration mode)
   VITE_API_URL=http://localhost:5000
   `
2. The client abstraction in rontend/src/api/apiClient.js checks VITE_API_URL. When configured, requests are routed to the backend server. If the server is unreachable, the client safely falls back to local demonstration datasets without interrupting the user.
3. **Security Notice:** The frontend client never stores or exposes private API keys, database credentials, or secret tokens. All sensitive services belong strictly within the backend layer.

### Planned Backend REST API Endpoints
The ackend/ directory is structured for future Node.js + Express development with the following endpoint specification:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /api/health | Service health and operational status check |
| GET | /api/locations | Supported agro-climatic zones and regional benchmarks |
| GET | /api/farms | Retrieve list of registered farms |
| POST | /api/farms | Register a new farm plot with coordinates and area |
| GET | /api/farms/:farmId | Retrieve detailed farm profile and history |
| POST | /api/farms/:farmId/analyze | Execute multi-mission climate and satellite analysis |
| GET | /api/analyses/:analysisId | Retrieve saved analysis results |
| POST | /api/analyses/:analysisId/simulate | Execute what-if climate anomaly simulations |
| GET | /api/analyses/:analysisId/rotation | Generate adaptive crop rotation alternatives |
| GET | /api/analyses/:analysisId/report | Retrieve advisory report payload |

---

## 10. Project Directory Structure

`
AgroVision/
├── .gitignore                   # Excludes node_modules/, dist/, coverage/, .env*, backups
├── README.md                    # Root consolidated platform documentation
├── backend/                     # Node.js + Express backend service directory
│   ├── README.md                # Backend architecture & planned endpoint specification
│   ├── package.json             # Backend dependencies (express, axios, cors, dotenv)
│   └── package-lock.json        # Backend lockfile
├── docs/                        # Architectural specifications and research references
└── frontend/                    # React + Vite frontend application
    ├── public/
    │   └── assets/
    │       └── agrovision-logo.png   # Official AgroVision brand emblem
    ├── src/
    │   ├── api/                 # HTTP abstraction client with demonstration fallback
    │   ├── components/          # Common UI components & Leaflet map picker
    │   ├── context/             # FarmContext global state provider
    │   ├── data/                # Calibrated West Bengal mock data engines
    │   ├── layouts/             # MainLayout & DashboardLayout shells
    │   ├── pages/               # 14 complete application routes
    │   ├── services/            # 8 domain-specific service adapters
    │   ├── styles/              # Design system & CSS stylesheets
    │   ├── App.jsx              # Declarative router entrypoint
    │   └── main.jsx             # React application bootstrap
    ├── index.html               # Vite HTML entrypoint
    ├── package.json             # Frontend dependencies & scripts
    └── vite.config.js           # Vite configuration with Rollup code-splitting (port 3000)
`

---

## 11. Current Development Status

- [x] **Complete Frontend Implementation:** All 14 routes fully developed, styled, and functional.
- [x] **Production Build Verified:** Vite + Rollup compilation builds cleanly in under 4 seconds with zero compilation warnings.
- [x] **Code Splitting Optimized:** Vendor chunks (endor-react, endor-charts, endor-maps, endor-icons) configured to ensure efficient browser caching.
- [x] **Branding & UI Consistency:** Standardized AgroVision identity with appropriate attribution in designated sections.
- [x] **Local Asset Bundling:** Leaflet CSS bundled locally with zero runtime CDN failure points.
- [x] **Demo Data Transparency:** Simulated NASA-format feeds explicitly distinguished from future live telemetry.
- [x] **Backend Specification Preserved:** Co-located backend documentation maintained in ackend/README.md.

---

## 12. Future Development Roadmap

- **Phase 1: Node.js & Express API Gateway:** Implement backend microservice layer to ingest user plot coordinates and return authenticated analysis payloads.
- **Phase 2: Live NASA Earthdata Connectors:** Direct integration with:
  - NASA POWER REST API for live gridded daily agro-climatology.
  - NASA GPM IMERG Early/Late run for near-real-time precipitation accumulation.
  - NASA SMAP L4 soil moisture products.
- **Phase 3: Expanded Environmental Adapters:** Future-ready adapters for SoilGrids 250m soil profile layers and FAO GAEZ agro-ecological crop suitability envelopes.
- **Phase 4: Field Resilience Enhancements:** Offline Progressive Web App (PWA) service worker caching and Bengali voice-guided audio assistance for grassroots farmers.

---

## 13. Credits & Acknowledgements

- **NASA Earth Science Division** for open data access:
  - **NASA Langley Research Center POWER Project:** Agroclimatology data.
  - **NASA Global Precipitation Measurement (GPM) Mission:** IMERG precipitation products.
  - **NASA Soil Moisture Active Passive (SMAP) Mission:** Surface & root-zone soil water metrics.
  - **USGS / NASA Landsat & MODIS Teams:** Surface reflectance and NDVI vegetation monitoring.
- **Bidhan Chandra Krishi Viswavidyalaya (BCKV), Mohanpur, West Bengal:** Agronomic research guidelines and regional crop calendar benchmarks.
- **ICAR - Central Soil Salinity Research Institute (CSSRI), Canning Town Regional Station:** Coastal soil electrical conductivity thresholds.
- **OpenStreetMap & Leaflet Contributors:** Open-source geospatial mapping infrastructure.

---

*AgroVision — Developed with pride by Team Innovatrix for the NASA Space Apps Challenge 2026.*
