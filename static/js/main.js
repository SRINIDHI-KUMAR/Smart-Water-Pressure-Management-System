// ============================================================
    // ZONE CATEGORIES
    // ============================================================
    const ZONE_CATEGORIES = {
      RESIDENTIAL: { label: 'Residential', color: '#1d5fbf', mapColor: '#1d5fbf' },
      COMMERCIAL: { label: 'Commercial', color: '#7c3aed', mapColor: '#7c3aed' },
      INDUSTRIAL: { label: 'Industrial', color: '#d97706', mapColor: '#d97706' },
      MIXED: { label: 'Mixed Use', color: '#0d9488', mapColor: '#0d9488' }};

    // ============================================================
    // NETWORK DATA
    // ============================================================
    const ZONES = [
  { id:'Z01', name:'hotgi',      lat:17.7035, lng:75.9238, elevation:445, hasSensor:true,  population:42000, category:'RESIDENTIAL' },
  { id:'Z02', name:'akkalkot',   lat:17.6779, lng:75.9098, elevation:452, hasSensor:true,  population:38000, category:'RESIDENTIAL' },
  { id:'Z03', name:'bijapur',    lat:17.6681, lng:75.8952, elevation:448, hasSensor:false, population:31000, category:'RESIDENTIAL' },
  { id:'Z04', name:'station',    lat:17.6897, lng:75.9074, elevation:450, hasSensor:true,  population:55000, category:'COMMERCIAL'  },
  { id:'Z05', name:'mangalwar',  lat:17.6948, lng:75.9183, elevation:447, hasSensor:false, population:28000, category:'MIXED'       },
  { id:'Z06', name:'budhwar',    lat:17.6852, lng:75.9201, elevation:449, hasSensor:true,  population:33000, category:'COMMERCIAL'  },
  { id:'Z07', name:'shivaji',    lat:17.6724, lng:75.8853, elevation:455, hasSensor:false, population:25000, category:'RESIDENTIAL' },
  { id:'Z08', name:'osmanabad',  lat:17.6601, lng:75.9121, elevation:443, hasSensor:true,  population:29000, category:'INDUSTRIAL'  }
];

    const PIPES = [
      { id: 'P01', from: 'Z01', to: 'Z04', length: 2.1, diameter: 300, material: 'CI' },
      { id: 'P02', from: 'Z04', to: 'Z06', length: 1.8, diameter: 250, material: 'DI' },
      { id: 'P03', from: 'Z04', to: 'Z05', length: 1.2, diameter: 200, material: 'PVC' },
      { id: 'P04', from: 'Z06', to: 'Z08', length: 0.9, diameter: 200, material: 'DI' },
      { id: 'P05', from: 'Z08', to: 'Z02', length: 2.3, diameter: 250, material: 'CI' },
      { id: 'P06', from: 'Z02', to: 'Z08', length: 3.1, diameter: 300, material: 'CI' },
      { id: 'P07', from: 'Z08', to: 'Z03', length: 2.7, diameter: 200, material: 'AC' },
      { id: 'P08', from: 'Z03', to: 'Z07', length: 2.0, diameter: 150, material: 'AC' },
      { id: 'P09', from: 'Z05', to: 'Z01', length: 1.5, diameter: 200, material: 'PVC' },
      { id: 'P10', from: 'Z01', to: 'Z03', length: 2.8, diameter: 250, material: 'DI' },
      { id: 'P11', from: 'Z01', to: 'Z02', length: 1.3, diameter: 200, material: 'DI' },
      { id: 'P12', from: 'Z02', to: 'Z05', length: 1.7, diameter: 150, material: 'PVC' },
      { id: 'P13', from: 'Z03', to: 'Z01', length: 3.0, diameter: 300, material: 'CI' },
      { id: 'P14', from: 'Z01', to: 'Z04', length: 1.1, diameter: 200, material: 'PVC' },
    ];

    const RESERVOIRS = [
      { id: 'R01', name: 'Ekruk Main Reservoir', lat: 17.7255, lng: 75.8958, capacity: 50000, level: 73 },
      { id: 'R02', name: 'Hipparga Lake WTP', lat: 17.6518, lng: 75.9356, capacity: 80000, level: 61 },
    ];
    const TANKS = [
      { id: 'T01', name: 'Hotgi OHT', lat: 17.7072, lng: 75.9278, capacity: 5000, level: 68 },
      { id: 'T02', name: 'Akkalkot OHT', lat: 17.6749, lng: 75.9062, capacity: 4000, level: 82 },
      { id: 'T03', name: 'Bijapur OHT', lat: 17.6651, lng: 75.8902, capacity: 3500, level: 44 },
    ];
    const PUMP_HOUSES = [
      { id: 'PH01', name: 'Hotgi Pump Station', lat: 17.7055, lng: 75.9200, power: 150, pumps: 3, flow: 320 },
      { id: 'PH02', name: 'Central Pump Station', lat: 17.6890, lng: 75.9085, power: 200, pumps: 4, flow: 480 },
      { id: 'PH03', name: 'Osmanabad Pump Station', lat: 17.6620, lng: 75.9100, power: 100, pumps: 2, flow: 210 },
    ];

    // ============================================================
    // 12 PROBLEMS DEFINITION
    // ============================================================
    const PROBLEMS = [
      {
        id: 'P1', icon: '📉', label: 'Low Pressure\n(Tail-End)', shortLabel: 'Low Pressure',
        color: '#d97706', severity: 'WARNING',
        affectedZones: ['Z07', 'Z03', 'Z03'],
        affectedPipes: ['P08', 'P10', 'P13'],
        desc: 'Tail-end zones show consistently low pressure despite normal upstream supply.',
        solution: 'Auto-increase pump pressure at Hotgi & Akkalkot stations. Adjust upstream valve P10 opening from 60% → 90% to push more water.',
        faultType: 'LOW_PRESSURE',
        simulate(s, zone) {
          if (['Z07', 'Z03', 'Z03'].includes(zone.id)) {
            s.pressure = 0.55 + Math.random() * 0.3; s.flow = 8 + Math.random() * 4; s.loss = 18 + Math.random() * 8;
          }
        }
      },
      {
        id: 'P2', icon: '⚖️', label: 'Uneven\nDistribution', shortLabel: 'Uneven Dist.',
        color: '#7c3aed', severity: 'WARNING',
        affectedZones: ['Z01', 'Z02', 'Z04', 'Z06'],
        affectedPipes: ['P01', 'P02', 'P11'],
        desc: 'Flow imbalance detected — northern zones oversupplied, central zones undersupplied.',
        solution: 'Manual suggests closing valve P11 by 30% and opening P03 fully. Redistribute 40 L/s from Z01→Z04 via bypass.',
        faultType: 'BLOCKAGE',
        simulate(s, zone) {
          if (['Z01', 'Z02'].includes(zone.id)) { s.pressure = 3.8 + Math.random() * 0.4; s.flow = 38 + Math.random() * 8; s.loss = 5 + Math.random() * 3; }
          if (['Z04', 'Z06'].includes(zone.id)) { s.pressure = 0.9 + Math.random() * 0.3; s.flow = 6 + Math.random() * 3; s.loss = 20 + Math.random() * 6; }
        }
      },
      {
        id: 'P3', icon: '⏰', label: 'Irregular\nSupply Timing', shortLabel: 'Irregular Supply',
        color: '#0077cc', severity: 'WARNING',
        affectedZones: ['Z04', 'Z06', 'Z01'],
        affectedPipes: ['P02', 'P09', 'P14'],
        desc: 'Inconsistent flow patterns detected — supply schedule deviation from planned 06:00–22:00 window.',
        solution: 'Manual predicts demand peak at 08:00 and 19:00. Schedule automated valve open/close: P02 open 05:45, P14 close 22:15.',
        faultType: 'IRREGULAR',
        simulate(s, zone) {
          if (['Z04', 'Z06', 'Z01'].includes(zone.id)) {
            const t = tickCount * 0.15;
            s.pressure = 1.4 + Math.sin(t) * 0.8 + (Math.random() - 0.5) * 0.1;
            s.flow = 18 + Math.sin(t + 1) * 12 + (Math.random() - 0.5) * 1;
            s.loss = 8 + Math.abs(Math.sin(t)) * 12;
          }
        }
      },
      {
        id: 'P4', icon: '💧', label: 'Leakage\nDetection', shortLabel: 'Leakage',
        color: '#2563eb', severity: 'WARNING',
        affectedZones: ['Z06', 'Z08'],
        affectedPipes: ['P04', 'P02'],
        desc: 'Gradual pressure drop with flow mismatch at Budhwar Peth junction — estimated 22% water loss.',
        solution: 'Isolate pipe P04 section. Alert field team to Budhwar Peth junction. Close valve P04 30% to reduce loss.',
        faultType: 'LEAK',
        simulate(s, zone) {
          if (['Z06', 'Z08'].includes(zone.id)) {
            const drift = Math.min(tickCount * 0.005, 0.6);
            s.pressure = Math.max(0.4, 2.1 - drift + (Math.random() - 0.5) * 0.08);
            s.flow = 12 + Math.random() * 3; s.loss = 22 + drift * 20 + Math.random() * 5;
          }
        }
      },
      {
        id: 'P5', icon: '💥', label: 'Pipe Burst', shortLabel: 'Pipe Burst',
        color: '#dc2626', severity: 'CRITICAL',
        affectedZones: ['Z04'],
        affectedPipes: ['P01', 'P14'],
        desc: 'CRITICAL: Sudden flow spike +380% and pressure collapse at Station Area. Pipe P01 structural failure suspected.',
        solution: 'IMMEDIATE: Auto shut-off valve P01. Dispatch emergency team. Switch Z04 to backup feed via P14.',
        faultType: 'BURST',
        simulate(s, zone) {
          if (zone.id === 'Z04') {
            s.pressure = 0.2 + Math.random() * 0.15; s.flow = 82 + Math.random() * 18; s.loss = 65 + Math.random() * 15;
          }
          if (['Z01', 'Z01'].includes(zone.id)) {
            s.pressure = (2.5 - (zone.elevation - 440) * 0.008) * 0.68; s.flow = 14 + Math.random() * 4;
          }
        }
      },
      {
        id: 'P6', icon: '🔧', label: 'Aging\nPipeline', shortLabel: 'Aging Pipeline',
        color: '#92400e', severity: 'WARNING',
        affectedZones: ['Z08', 'Z03'],
        affectedPipes: ['P07', 'P06'],
        desc: 'Repeated micro-failures in 35-year-old CI pipe segments P06 & P07. 14 minor incidents in 30 days.',
        solution: 'Mark as HIGH-RISK zone. Schedule CIPP lining within 14 days. Reduce operating pressure by 15% to extend service life.',
        faultType: 'AGING',
        simulate(s, zone) {
          if (['Z08', 'Z03'].includes(zone.id)) {
            const drop = (Math.sin(tickCount * 0.3) * 0.2 + Math.random() * 0.15);
            s.pressure = Math.max(0.5, 1.8 - Math.abs(drop));
            s.flow = 14 + Math.random() * 4; s.loss = 25 + Math.random() * 12;
          }
        }
      },
      {
        id: 'P7', icon: '🚨', label: 'Unauthorized\nConsumption', shortLabel: 'Unauthorized Use',
        color: '#dc2626', severity: 'WARNING',
        affectedZones: ['Z05'],
        affectedPipes: ['P03', 'P12'],
        desc: 'Excessive flow at Mangalwar Peth exceeds demand by 340% — no leak pattern. Unauthorized extraction suspected.',
        solution: 'Flag for immediate inspection. Cross-reference meter readings. Deploy field investigator to Z05.',
        faultType: 'UNAUTHORIZED',
        simulate(s, zone) {
          if (zone.id === 'Z05') {
            s.pressure = 2.3 + Math.random() * 0.2;
            s.flow = 48 + Math.random() * 10; s.loss = 8 + Math.random() * 4;
          }
        }
      },
      {
        id: 'P8', icon: '⚠️', label: 'Manual\nOperation Error', shortLabel: 'Op. Error',
        color: '#f59e0b', severity: 'WARNING',
        affectedZones: ['Z01', 'Z02'],
        affectedPipes: ['P11', 'P13'],
        desc: 'Abnormal pressure surge detected post valve operation at Hotgi pump station. Operator error suspected.',
        solution: 'Auto-revert valve P11 to last stable position. Alert operator with correct valve sequence. Log incident.',
        faultType: 'HIGH_PRESSURE',
        simulate(s, zone) {
          if (['Z01', 'Z02'].includes(zone.id)) {
            s.pressure = 4.8 + Math.random() * 0.4; s.flow = 35 + Math.random() * 8; s.loss = 10 + Math.random() * 4;
          }
        }
      },
      {
        id: 'P9', icon: '📡', label: 'Real-Time\nMonitoring', shortLabel: 'SCADA Coverage',
        color: '#059669', severity: 'INFO',
        affectedZones: [],
        affectedPipes: [],
        desc: 'Full SCADA visibility active — 7 live sensors + 5 AI-estimated zones. 100% network coverage.',
        solution: 'System operating optimally. All 12 zones monitored. Dashboard, map, and analytics fully operational.',
        faultType: null,
        simulate(s, zone) { }
      },
      {
        id: 'P10', icon: '⚡', label: 'Fault Detection\nDelay', shortLabel: 'Detection Delay',
        color: '#0077cc', severity: 'INFO',
        affectedZones: ['Z04', 'Z08'],
        affectedPipes: ['P01', 'P06'],
        desc: 'Traditional systems take 6–12 hours to detect. This Manual system detects anomalies within 47ms of occurrence.',
        solution: 'Pattern change detection active. Z-score thresholding (±2.5σ) on rolling 30-reading window. Real-time alerts.',
        faultType: 'LOW_PRESSURE',
        simulate(s, zone) {
          if (['Z04', 'Z08'].includes(zone.id)) {
            s.pressure = 1.1 + Math.random() * 0.2; s.flow = 12 + Math.random() * 3; s.loss = 14 + Math.random() * 4;
          }
        }
      },
      {
        id: 'P11', icon: '📊', label: 'Demand\nForecasting', shortLabel: 'Demand Forecast',
        color: '#7c3aed', severity: 'INFO',
        affectedZones: ['Z01', 'Z04', 'Z02'],
        affectedPipes: ['P01', 'P11'],
        desc: 'Manual demand prediction running. Morning peak (08:00) +40% above baseline forecast. Pre-adjusting supply.',
        solution: 'Pre-adjust valve P01 open +15% from 07:45. Schedule pump speed ramp at PH02 from 75%→90% by 08:00.',
        faultType: 'IRREGULAR',
        simulate(s, zone) {
          if (['Z01', 'Z04', 'Z02'].includes(zone.id)) {
            const peak = Math.abs(Math.sin(tickCount * 0.08)) * 0.6;
            s.pressure = 2.2 + peak * 0.5 + Math.random() * 0.1;
            s.flow = 22 + peak * 18 + Math.random() * 2;
          }
        }
      },
      {
        id: 'P12', icon: '🤖', label: 'Manual Data\nBlind Spots', shortLabel: 'Manual Blind Spots',
        color: '#059669', severity: 'INFO',
        affectedZones: ['Z03', 'Z05', 'Z07', 'Z08', 'Z03'],
        affectedPipes: [],
        desc: 'Manual inference covering 5 manual data zones. Graph-based model with neighbor sensor data + EPANET hydraulics.',
        solution: 'Coverage: Z03 (91% conf.), Z05 (94%), Z07 (88%), Z09 (93%), Z11 (89%). Full blind-spot elimination achieved.',
        faultType: null,
        simulate(s, zone) {
          if (['Z03', 'Z05', 'Z07', 'Z08', 'Z03'].includes(zone.id)) {
            s.dataInferred = true; s.confidence = 88 + Math.random() * 8;
          }
        }
      },
    ];

    // ============================================================
    // APPLICATION STATE
    // ============================================================
    let activeProblemId = 'NORMAL';
    let isRunning = true;
    let updateInterval = 2000;
    let simTimer = null;
    let mapInstance = null;
    let mapInitialized = false;
    let pressureChart = null;
    let flowChart = null;
    let alertsList = [];
    let alertFilter = 'ALL';
    let currentPage = 'dashboard';
    let reportHistory = [];
    let tickCount = 0;
    let mapLayers = { pipes: true, tanks: true, faultMarkers: true, labels: false };
    let faultFloatMarkers = {};
    let faultCircles = {};
    let mapPipeLines = {};
    let mapZoneMarkers = {};
    let zoneTooltips = {};
    let selectedMapZone = 'ALL'; // NEW: tracks selected zone in map
    let currentAlertTab = 'live'; // NEW: tracks active alerts tab

    let zoneState = {};
    ZONES.forEach(z => {
      const base = 2.5 - (z.elevation - 440) * 0.008;
      zoneState[z.id] = {
        pressure: base + (Math.random() - 0.5) * 0.3,
        flow: 15 + Math.random() * 8,
        ph: 7.0 + (Math.random() - 0.5) * 0.4,
        status: 'NORMAL', fault: null, prevPressure: base, prevFault: null,
        loss: 3 + Math.random() * 4, dataInferred: !z.hasSensor,
        confidence: z.hasSensor ? 100 : Math.floor(88 + Math.random() * 8)};
    });

    let valveStates = {};
    PIPES.forEach(p => { valveStates[p.id] = { open: true, position: 100 }; });
    let pumpStates = {};
    PUMP_HOUSES.forEach(ph => { pumpStates[ph.id] = { running: true, speed: 80 + Math.random() * 15 }; });

    const MAX_CHART_POINTS = 30;

    // ============================================================
    // PROBLEM PANEL RENDER
    // ============================================================
    function renderProblemsPanel() {
      const grid = document.getElementById('problems-grid');
      let html = `<div class="problem-btn problem-btn-normal ${activeProblemId === 'NORMAL' ? 'active' : ''}" onclick="selectProblem('NORMAL')">
    <div class="problem-btn-icon">✅</div>
    <div class="problem-btn-num">RESET</div>
    <div>Normal Operation</div>
  </div>`;
      PROBLEMS.forEach(p => {
        const style = activeProblemId === p.id ? `background:${p.color};border-color:${p.color};` : '';
        html += `<div class="problem-btn ${activeProblemId === p.id ? 'active' : ''}" style="${style}" onclick="selectProblem('${p.id}')">
      <div class="problem-btn-icon">${p.icon}</div>
      <div class="problem-btn-num">${p.id}</div>
      <div style="text-align:center">${p.label}</div>
    </div>`;
      });
      grid.innerHTML = html;
    }

    function toggleProblemPanel() {
      const panel = document.getElementById('problem-panel');
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) renderProblemsPanel();
    }

    function selectProblem(pid) {
      activeProblemId = pid;
      renderProblemsPanel();
      ZONES.forEach(z => {
        zoneState[z.id].prevFault = null;
        zoneState[z.id].fault = null;
      });
      tickCount = 0;

      if (pid === 'NORMAL') {
        showToast('Scenario reset — Normal operation restored', 'success');
        updateActiveProblemUI(null);
      } else {
        const problem = PROBLEMS.find(p => p.id === pid);
        showToast(`Simulating: ${problem.shortLabel} — ${problem.affectedZones.length > 0 ? problem.affectedZones.length + ' zones affected' : 'System-wide'}`,
          problem.severity === 'CRITICAL' ? 'critical' : problem.severity === 'WARNING' ? 'warning' : 'info');
        updateActiveProblemUI(problem);
      }
      if (mapInitialized) updateMapFaults();

      fetch("/api/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: pid })
      }).then(res => res.json())
        .then(data => console.log("Backend SCADA synchronized with:", data.active_scenario))
        .catch(err => console.error("Could not sync with Backend", err));
    }

    function updateActiveProblemUI(problem) {
      const indicator = document.getElementById('active-prob-indicator');
      const dot = document.getElementById('active-prob-dot');
      const text = document.getElementById('active-prob-text');
      const banner = document.getElementById('active-problem-banner');

      if (!problem) {
        indicator.className = 'active-prob-indicator';
        dot.className = 'active-prob-dot';
        text.textContent = 'Normal Operation';
        banner.style.display = 'none';
        return;
      }

      indicator.className = 'active-prob-indicator has-problem';
      dot.className = 'active-prob-dot alert';
      text.textContent = problem.shortLabel;
      banner.style.display = 'flex';

      const sev = { CRITICAL: problem.color, WARNING: problem.color, INFO: '#059669' }[problem.severity] || problem.color;
      banner.className = 'active-problem-banner';
      banner.style.borderColor = sev + '55';
      banner.style.background = sev + '11';

      const zoneTagsHTML = problem.affectedZones.length > 0
        ? problem.affectedZones.map(zid => {
          const zone = ZONES.find(z => z.id === zid);
          return `<span class="apb-zone-tag">${zone ? zone.name : zid}</span>`;
        }).join('')
        : '<span class="apb-zone-tag" style="color:var(--green)">System-wide — No zone disruption</span>';

      banner.innerHTML = `
    <div class="apb-icon">${problem.icon}</div>
    <div class="apb-body">
      <div class="apb-title" style="color:${sev}">${problem.id}: ${problem.shortLabel}</div>
      <div class="apb-desc">${problem.desc}</div>
      <div class="apb-zones">${zoneTagsHTML}</div>
    </div>
    <div class="apb-solution">
      <div class="apb-solution-title">Manual SOLUTION</div>
      ${problem.solution}
    </div>`;
    }

    // ============================================================
    // SIMULATION ENGINE
    // ============================================================
    function runSimulation() {
  tickCount++;
  if (mapInitialized) updateMapFaults();

  fetch("/api/scenario", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ scenario: activeProblemId })
  }).catch(err => console.error("Scenario sync error:", err));

  fetch("/api/scada")
    .then(res => res.json())
    .then(data => {
      if (data.zoneState && Object.keys(data.zoneState).length > 0) {
        zoneState = data.zoneState;
        valveStates = data.valveStates || valveStates;
        pumpStates = data.pumpStates || pumpStates;
        if (data.tankStates && typeof RESERVOIRS !== 'undefined') {
            RESERVOIRS[0].level = data.tankStates['R01'] || RESERVOIRS[0].level;
            RESERVOIRS[1].level = data.tankStates['R02'] || RESERVOIRS[1].level;
            TANKS[0].level = data.tankStates['T01'] || TANKS[0].level;
            TANKS[1].level = data.tankStates['T02'] || TANKS[1].level;
            TANKS[2].level = data.tankStates['T03'] || TANKS[2].level;
        }
      }
      if (data.newAlerts && data.newAlerts.length > 0) {
        data.newAlerts.forEach(a => {
          if (!alertsList.some(ext => ext.id === a.id)) {
            a.time = new Date();
            alertsList.unshift(a);
            showToast(`${a.type.replace(/_/g,' ')} - ${a.zone}`, a.severity==='CRITICAL'?'critical':'warning');
          }
        });
        if (alertsList.length > 200) alertsList.length = 200;
        if (typeof updateAlertBadge === 'function') updateAlertBadge();
      }
      if (data.systemStats) {
        window.systemStats = data.systemStats;
      }
      
      updateChartData();
      updateAllUI();
      if (typeof buildReportHistory === 'function') buildReportHistory();
      if (mapInitialized && typeof updateZoneInfoPanel === 'function') {
        if (selectedMapZone !== 'ALL') updateZoneInfoPanel(selectedMapZone);
      }
    })
    .catch(e => console.error(e));
}

function calculateLoss(zid, activeProblem) {
      const s = zoneState[zid];
      let base = 3;
      if (s.pressure < 1.2) base += 7;
      if (s.flow > 40) base += 12;
      if (activeProblem) {
        if (activeProblem.id === 'P4' && ['Z06', 'Z08'].includes(zid)) base += 22;
        if (activeProblem.id === 'P5' && zid === 'Z04') base += 50;
        if (activeProblem.id === 'P6' && ['Z08', 'Z03'].includes(zid)) base += 18;
        if (activeProblem.id === 'P7' && zid === 'Z05') base += 5;
      }
      return Math.min(85, base + Math.random() * 3);
    }

    // ============================================================
    // Manual INFERENCE ENGINE
    // ============================================================
    function runai() {
      const nonSensor = ZONES.filter(z => !z.hasSensor);
      nonSensor.forEach(zone => {
        const connectedPipes = PIPES.filter(p => p.from === zone.id || p.to === zone.id);
        const neighborIds = connectedPipes.map(p => p.from === zone.id ? p.to : p.from);
        const neighbors = ZONES.filter(z => neighborIds.includes(z.id) && z.hasSensor);
        const s = zoneState[zone.id];
        s.prevPressure = s.pressure;

        const activeProblem = PROBLEMS.find(p => p.id === activeProblemId);
        const isAffectedByProblem = activeProblem && activeProblem.affectedZones.includes(zone.id);
        if (isAffectedByProblem) { s.dataInferred = true; return; }

        if (neighbors.length === 0) {
          const sz = ZONES.filter(z => z.hasSensor);
          s.pressure = avg(sz.map(z => zoneState[z.id].pressure));
          s.flow = avg(sz.map(z => zoneState[z.id].flow)) * 0.82;
          s.ph = avg(sz.map(z => zoneState[z.id].ph));
          s.confidence = 72; s.dataInferred = true;
          return;
        }

        let wP = 0, wF = 0, wPH = 0, totalW = 0;
        neighbors.forEach(nb => {
          const pipe = connectedPipes.find(p => (p.from === zone.id && p.to === nb.id) || (p.to === zone.id && p.from === nb.id));
          const w = (pipe ? pipe.diameter : 200) / pipe.length;
          const elevHead = (nb.elevation - zone.elevation) * 0.00981;
          const ns = zoneState[nb.id];
          wP += (ns.pressure + elevHead) * w; wF += ns.flow * 0.82 * w; wPH += ns.ph * w; totalW += w;
        });

        s.pressure = Math.max(0.05, (wP / totalW) + (Math.random() - 0.5) * 0.07);
        s.flow = Math.max(0, (wF / totalW) + (Math.random() - 0.5) * 0.7);
        s.ph = Math.max(5.8, Math.min(9.2, (wPH / totalW) + (Math.random() - 0.5) * 0.04));
        s.confidence = Math.min(98, 85 + neighbors.length * 4 + Math.random() * 3);
        s.dataInferred = true;
        s.loss = calculateLoss(zone.id, null);
      });
    }

    function avg(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }

    // ============================================================
    // FAULT DETECTION
    // ============================================================
    function runFaultDetection(activeProblem) {
      ZONES.forEach(zone => {
        const s = zoneState[zone.id];
        const pressureDrop = (s.prevPressure || s.pressure) - s.pressure;
        let fault = null, status = 'NORMAL';

        if (activeProblem && activeProblem.faultType && activeProblem.affectedZones.includes(zone.id)) {
          fault = activeProblem.faultType; status = activeProblem.severity;
        } else {
          if (s.flow > 50 && pressureDrop > 0.4) { fault = 'BURST'; status = 'CRITICAL'; }
          else if (pressureDrop > 0.18 && s.loss > 18) { fault = 'LEAK'; status = 'WARNING'; }
          else if (s.pressure < 0.7) { fault = 'LOW_PRESSURE'; status = 'CRITICAL'; }
          else if (s.pressure < 1.3) { fault = 'LOW_PRESSURE'; status = 'WARNING'; }
          else if (s.pressure > 4.6) { fault = 'HIGH_PRESSURE'; status = 'WARNING'; }
          else if (s.ph < 6.5 || s.ph > 8.5) { fault = 'PH_ANOMALY'; status = 'WARNING'; }
          else if (s.flow > 45 && s.pressure > 3.4) { fault = 'BLOCKAGE'; status = 'WARNING'; }
        }

        s.fault = fault; s.status = status;
        if (fault && fault !== s.prevFault) createAlert(zone, fault, status);
        s.prevFault = fault;
      });
    }

    function createAlert(zone, fault, severity) {
      const msgs = {
        BURST: 'Pipe burst — sudden flow spike and pressure collapse',
        LEAK: 'Leak detected — gradual pressure drop and flow mismatch',
        LOW_PRESSURE: 'Low pressure zone — downstream supply affected',
        HIGH_PRESSURE: 'High pressure — valve adjustment required',
        PH_ANOMALY: 'pH anomaly — water quality intervention needed',
        BLOCKAGE: 'Blockage/Uneven — upstream pressure buildup',
        AGING: 'Aging pipeline — micro-failure pattern detected',
        UNAUTHORIZED: 'Unauthorized consumption — abnormal flow without pressure drop',
        IRREGULAR: 'Irregular supply — schedule deviation detected'};
      const zoneObj = ZONES.find(z => z.id === zone.id || z.name === zone.name);
      alertsList.unshift({
        id: Date.now(), zone: zone.name, zoneId: zone.id || zoneObj?.id, type: fault, severity,
        message: msgs[fault] || 'Unknown fault', time: new Date(),
        pressure: zoneState[zone.id]?.pressure.toFixed(2), flow: zoneState[zone.id]?.flow.toFixed(1),
        acknowledged: false,
        category: zoneObj?.category || 'RESIDENTIAL'});
      if (alertsList.length > 200) alertsList.pop();
      showToast(`${fault.replace(/_/g, ' ')} — ${zone.name}`, severity === 'CRITICAL' ? 'critical' : 'warning');
      if (currentPage === 'alerts') renderAlerts();
      updateAlertBadge();
    }

    // ============================================================
    // CHARTS
    // ============================================================
    function initCharts() {
      const grid = { color: 'rgba(30,80,160,0.07)' };
      const ticks = { color: '#7090b0', font: { family: "'JetBrains Mono'", size: 9 } };
      const baseOpts = {
        responsive: true, maintainAspectRatio: true, animation: { duration: 0 },
        plugins: { legend: { display: true, labels: { color: '#3d5878', font: { family: "'JetBrains Mono'", size: 10 }, boxWidth: 12, padding: 10 } } },
        scales: { x: { ticks: { ...ticks, maxTicksLimit: 8 }, grid }, y: { ticks, grid } }
      };

      const chartColors = ['#1d5fbf', '#7c3aed', '#d97706', '#0d9488', '#059669', '#dc2626', '#ea580c', '#38bdf8'];
      
      const pressureDatasets = ZONES.map((z, i) => ({
        label: z.name,
        data: [],
        borderColor: chartColors[i % chartColors.length],
        backgroundColor: chartColors[i % chartColors.length] + '10',
        tension: 0.4, borderWidth: 2.0, pointRadius: 0
      }));

      const flowDatasets = ZONES.map((z, i) => ({
        label: z.name,
        data: [],
        borderColor: chartColors[i % chartColors.length],
        backgroundColor: chartColors[i % chartColors.length] + '10',
        tension: 0.4, borderWidth: 2.0, pointRadius: 0
      }));

      pressureChart = new Chart(document.getElementById('pressure-chart'), {
        type: 'line',
        data: { labels: [], datasets: pressureDatasets },
        options: { ...baseOpts, scales: { ...baseOpts.scales, y: { ...baseOpts.scales.y, min: 0, max: 5.5 } } }
      });

      flowChart = new Chart(document.getElementById('flow-chart'), {
        type: 'line',
        data: { labels: [], datasets: flowDatasets },
        options: { ...baseOpts, scales: { ...baseOpts.scales, y: { ...baseOpts.scales.y, min: 0, max: 90 } } }
      });
    }

    function updateChartData() {
      const t = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      pressureChart.data.labels.push(t);
      flowChart.data.labels.push(t);
      ZONES.forEach((z, i) => {
        pressureChart.data.datasets[i].data.push(+(zoneState[z.id].pressure.toFixed(2)));
        flowChart.data.datasets[i].data.push(+(zoneState[z.id].flow.toFixed(1)));
      });

      if (pressureChart.data.labels.length > MAX_CHART_POINTS) {
        pressureChart.data.labels.shift(); flowChart.data.labels.shift();
        pressureChart.data.datasets.forEach(d => d.data.shift());
        flowChart.data.datasets.forEach(d => d.data.shift());
      }
      pressureChart.update('none'); flowChart.update('none');
    }

    // ============================================================
    // MAP ENGINE — UPDATED WITH ZONE DROPDOWN
    // ============================================================
    function initMap() {
      if (mapInitialized) return;
      mapInstance = L.map('leaflet-map', { center: [17.686, 75.910], zoom: 14, zoomControl: false, attributionControl: false });
      L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapInstance);

      // Draw pipes
      PIPES.forEach(pipe => {
        const fromZ = ZONES.find(z => z.id === pipe.from);
        const toZ = ZONES.find(z => z.id === pipe.to);
        if (!fromZ || !toZ) return;
        const weight = pipe.diameter >= 300 ? 7 : pipe.diameter >= 250 ? 5 : pipe.diameter >= 200 ? 4 : 3;
        const opacity = pipe.diameter >= 250 ? 1 : 0.8;
        const color = pipe.diameter >= 300 ? '#1d5fbf' : pipe.diameter >= 200 ? '#2563eb' : '#60a5fa';
        const pl = L.polyline([[fromZ.lat, fromZ.lng], [toZ.lat, toZ.lng]],
          { color, weight, opacity, dashArray: pipe.diameter < 200 ? '8,5' : null, lineJoin: 'round' }).addTo(mapInstance);
        pl.bindPopup(`<div class="popup-title">Pipeline ${pipe.id}</div>
      <div class="popup-row"><span class="popup-label">Route</span><span class="popup-val">${fromZ.name} → ${toZ.name}</span></div>
      <div class="popup-row"><span class="popup-label">Diameter</span><span class="popup-val">${pipe.diameter} mm</span></div>
      <div class="popup-row"><span class="popup-label">Length</span><span class="popup-val">${pipe.length} km</span></div>
      <div class="popup-row"><span class="popup-label">Material</span><span class="popup-val">${pipe.material}</span></div>
      <div class="popup-row"><span class="popup-label">Valve</span><span class="popup-val">${valveStates[pipe.id]?.open ? 'OPEN' : 'CLOSED'}</span></div>`);
        mapPipeLines[pipe.id] = pl;

        if (pipe.diameter >= 250) {
          const midLat = (fromZ.lat + toZ.lat) / 2;
          const midLng = (fromZ.lng + toZ.lng) / 2;
          const pipeLabel = L.divIcon({
            className: '',
            html: `<div style="background:rgba(255,255,255,0.88);color:#1d5fbf;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;border:1px solid rgba(29,95,191,0.3);white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.1)">${pipe.id} Ø${pipe.diameter}</div>`,
            iconSize: [70, 20], iconAnchor: [35, 10]
          });
          L.marker([midLat, midLng], { icon: pipeLabel }).addTo(mapInstance);
        }
      });

      // Reservoirs
      RESERVOIRS.forEach(r => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:28px;height:28px;background:#1d4ed8;border:2px solid white;border-radius:5px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(29,78,216,0.4);font-size:14px">💧</div>`,
          iconSize: [28, 28], iconAnchor: [14, 14]
        });
        L.marker([r.lat, r.lng], { icon }).bindTooltip(`<b>${r.name}</b><br>${r.capacity.toLocaleString()} m³ · ${r.level}%`, { className: 'leaflet-tooltip' }).addTo(mapInstance);
      });

      // OHT Tanks
      TANKS.forEach(t => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:22px;height:22px;background:#059669;border:2px solid white;border-radius:4px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(5,150,105,0.4);font-size:12px">🏗</div>`,
          iconSize: [22, 22], iconAnchor: [11, 11]
        });
        L.marker([t.lat, t.lng], { icon }).bindTooltip(`<b>${t.name}</b> · ${t.level}%`).addTo(mapInstance);
      });

      // Pump Houses
      PUMP_HOUSES.forEach(ph => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:22px;height:22px;background:#d97706;border:2px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(217,119,6,0.4);font-size:11px">⚙</div>`,
          iconSize: [22, 22], iconAnchor: [11, 11]
        });
        L.marker([ph.lat, ph.lng], { icon }).bindTooltip(`<b>${ph.name}</b>`).addTo(mapInstance);
      });

      // Zone nodes — click opens zone info panel
      ZONES.forEach(zone => {
        const cat = ZONE_CATEGORIES[zone.category];
        const color = cat ? cat.mapColor : '#1d5fbf';
        const radius = zone.hasSensor ? 10 : 8;
        const weight = zone.hasSensor ? 3 : 2;
        const fillOpacity = zone.hasSensor ? 0.92 : 0.7;

        const marker = L.circleMarker([zone.lat, zone.lng],
          { radius, color: color, fillColor: color, fillOpacity, weight, className: 'zone-node' }).addTo(mapInstance);

        const labelIcon = L.divIcon({
          className: '',
          html: `<div style="background:white;color:${color};font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;padding:2px 7px;border-radius:12px;border:1.5px solid ${color};white-space:nowrap;box-shadow:0 1px 6px rgba(0,0,0,0.12);margin-top:6px">${zone.name}</div>`,
          iconSize: [120, 20], iconAnchor: [60, -4]
        });
        const label = L.marker([zone.lat, zone.lng], { icon: labelIcon }).addTo(mapInstance);

        // Click zone marker → update dropdown + show info panel
        marker.on('click', () => {
          const sel = document.getElementById('map-zone-select');
          if (sel) sel.value = zone.id;
          onMapZoneSelect(zone.id);
        });

        marker.bindPopup(buildZonePopup(zone));
        mapZoneMarkers[zone.id] = marker;
        zoneTooltips[zone.id] = label;
      });

      // Populate zone dropdown
      populateMapZoneDropdown();

      mapInitialized = true;
      updateMapFaults();
    }

    function populateMapZoneDropdown() {
      const sel = document.getElementById('map-zone-select');
      if (!sel) return;
      // Clear existing options except first
      while (sel.options.length > 1) sel.remove(1);
      // Group by category
      const order = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'MIXED'];
      order.forEach(catKey => {
        const cat = ZONE_CATEGORIES[catKey]; cat.label = t('cat_'+catKey.toLowerCase().substring(0,3));
        const catZones = ZONES.filter(z => z.category === catKey);
        if (catZones.length === 0) return;
        const og = document.createElement('optgroup');
        og.label = `── ${t('cat_' + (catKey==='RESIDENTIAL'?'res':catKey==='COMMERCIAL'?'com':catKey==='INDUSTRIAL'?'ind':'mix'))} ──`;
        catZones.forEach(zone => {
          const opt = document.createElement('option');
          opt.value = zone.id;
          opt.textContent = `${zone.id} · ${zone.name}`;
          og.appendChild(opt);
        });
        sel.appendChild(og);
      });
    }

    // Called when zone is selected from dropdown
    function onMapZoneSelect(zoneId) {
      selectedMapZone = zoneId;
      if (zoneId === 'ALL') {
        closeZoneInfoPanel();
        if (mapInstance) mapInstance.flyTo([17.686, 75.910], 14, { duration: 1 });
        // Reset all marker opacities
        ZONES.forEach(z => {
          if (mapZoneMarkers[z.id]) mapZoneMarkers[z.id].setStyle({ opacity: 1, fillOpacity: z.hasSensor ? 0.92 : 0.7 });
          if (zoneTooltips[z.id]) zoneTooltips[z.id].setOpacity(1);
        });
        Object.values(mapPipeLines).forEach(pl => pl.setStyle({ opacity: pl.options._origOpacity || 0.8 }));
        return;
      }

      const zone = ZONES.find(z => z.id === zoneId);
      if (!zone || !mapInstance) return;

      // Fly to zone
      mapInstance.flyTo([zone.lat, zone.lng], 16, { duration: 1.2 });

      // Dim other zones
      ZONES.forEach(z => {
        const isSelected = z.id === zoneId;
        const connectedPipeIds = PIPES.filter(p => p.from === zoneId || p.to === zoneId).map(p => p.id);
        const isConnected = PIPES.some(p => (p.from === zoneId || p.to === zoneId) && (p.from === z.id || p.to === z.id));
        const opacity = (isSelected || isConnected) ? 1 : 0.25;
        const fillOpacity = isSelected ? 0.95 : isConnected ? 0.6 : 0.15;
        if (mapZoneMarkers[z.id]) mapZoneMarkers[z.id].setStyle({ opacity, fillOpacity });
        if (zoneTooltips[z.id]) zoneTooltips[z.id].setOpacity(opacity);
      });

      // Highlight connected pipes
      const connectedPipeIds = new Set(PIPES.filter(p => p.from === zoneId || p.to === zoneId).map(p => p.id));
      Object.entries(mapPipeLines).forEach(([pid, pl]) => {
        pl.setStyle({ opacity: connectedPipeIds.has(pid) ? 1 : 0.1 });
      });

      // Open zone info panel
      updateZoneInfoPanel(zoneId);

      // Open popup on marker
      setTimeout(() => {
        if (mapZoneMarkers[zoneId]) mapZoneMarkers[zoneId].openPopup();
      }, 1300);
    }

    function resetMapToAll() {
      const sel = document.getElementById('map-zone-select');
      if (sel) sel.value = 'ALL';
      onMapZoneSelect('ALL');
    }

    function closeZoneInfoPanel() {
      const panel = document.getElementById('zone-info-panel');
      if (panel) panel.classList.remove('show');
      selectedMapZone = 'ALL';
      const sel = document.getElementById('map-zone-select');
      if (sel) sel.value = 'ALL';
      // Reset opacities
      ZONES.forEach(z => {
        if (mapZoneMarkers[z.id]) mapZoneMarkers[z.id].setStyle({ opacity: 1, fillOpacity: z.hasSensor ? 0.92 : 0.7 });
        if (zoneTooltips[z.id]) zoneTooltips[z.id].setOpacity(1);
      });
      Object.values(mapPipeLines).forEach(pl => pl.setStyle({ opacity: pl.options.diameter >= 250 ? 1 : 0.8 }));
      if (mapInstance) mapInstance.flyTo([17.686, 75.910], 14, { duration: 0.8 });
    }

    function updateZoneInfoPanel(zoneId) {
      const panel = document.getElementById('zone-info-panel');
      const zone = ZONES.find(z => z.id === zoneId);
      if (!zone || !panel) return;

      const s = zoneState[zone.id];
      const cat = ZONE_CATEGORIES[zone.category];
      const statusColor = { NORMAL: 'var(--green)', WARNING: 'var(--amber)', CRITICAL: 'var(--red)' }[s.status];

      document.getElementById('zip-zone-name').textContent = zone.name;
      document.getElementById('zip-zone-id').textContent = `${zone.id} · ${cat?.label || zone.category} · ${zone.hasSensor ? '📡 Live Sensor' : '🤖 Manual Inferred'} · Pop: ${(zone.population / 1000).toFixed(0)}k`;

      // Metrics
      document.getElementById('zip-metrics').innerHTML = `
    <div class="zip-metric"><div class="zip-metric-val" style="color:${s.pressure < 1.2 ? 'var(--red)' : s.pressure < 1.8 ? 'var(--amber)' : 'var(--primary)'}">${s.pressure.toFixed(2)}</div><div class="zip-metric-label">Pressure (bar)</div></div>
    <div class="zip-metric"><div class="zip-metric-val" style="color:${s.flow > 50 ? 'var(--red)' : 'var(--primary)'}">${s.flow.toFixed(1)}</div><div class="zip-metric-label">Flow (L/s)</div></div>
    <div class="zip-metric"><div class="zip-metric-val" style="color:${(s.ph < 6.5 || s.ph > 8.5) ? 'var(--red)' : 'var(--primary)'}">${s.ph.toFixed(1)}</div><div class="zip-metric-label">pH</div></div>
    <div class="zip-metric"><div class="zip-metric-val" style="color:${s.loss > 20 ? 'var(--red)' : 'var(--primary)'}">${s.loss.toFixed(1)}%</div><div class="zip-metric-label">Loss %</div></div>
    <div class="zip-metric"><div class="zip-metric-val" style="color:var(--primary)">${zone.elevation}m</div><div class="zip-metric-label">Elevation</div></div>
    <div class="zip-metric"><div class="zip-metric-val" style="color:${s.confidence < 85 ? 'var(--amber)' : 'var(--green)'}">${s.confidence != null ? s.confidence.toFixed(0) : '--'}%</div><div class="zip-metric-label">Conf %</div></div>
  `;

      // Status
      document.getElementById('zip-status').innerHTML = `
    <span class="status-chip status-${t('badge_' + s.status.toLowerCase())}" style="margin-bottom:4px">${t('badge_' + s.status.toLowerCase())}</span>
    ${s.fault ? `<span style="display:inline-block;margin-left:6px;font-family:var(--font-head);font-size:10px;font-weight:700;color:var(--red)">⚠️ ${s.fault.replace(/_/g, ' ')}</span>` : ''}
  `;

      // Faults
      const faultEl = document.getElementById('zip-faults');
      if (s.fault) {
        const faultDescs = {
          BURST: 'Pipe burst — sudden flow spike and pressure collapse',
          LEAK: 'Leak detected — gradual pressure drop and flow mismatch',
          LOW_PRESSURE: 'Low pressure zone — downstream supply affected',
          HIGH_PRESSURE: 'High pressure — valve adjustment required',
          PH_ANOMALY: 'pH anomaly — water quality intervention needed',
          BLOCKAGE: 'Blockage/Uneven — upstream pressure buildup',
          AGING: 'Aging pipeline — micro-failure pattern detected',
          UNAUTHORIZED: 'Unauthorized consumption — abnormal flow detected',
          IRREGULAR: 'Irregular supply — schedule deviation detected'};
        faultEl.innerHTML = `<div class="zip-fault-item">
      <div class="zip-fault-type">⚠️ ${s.fault.replace(/_/g, ' ')}</div>
      <div class="zip-fault-desc">${faultDescs[s.fault] || 'Fault detected'}</div>
    </div>`;
      } else {
        faultEl.innerHTML = `<div class="zip-no-fault">✅ No active faults</div>`;
      }

      // Connected pipes
      const connPipes = PIPES.filter(p => p.from === zoneId || p.to === zoneId);
      document.getElementById('zip-pipes').innerHTML = connPipes.map(p => {
        const other = ZONES.find(z => z.id === (p.from === zoneId ? p.to : p.from));
        return `<span class="zip-pipe-tag" title="${p.id}: Ø${p.diameter}mm · ${p.length}km · ${p.material}">${p.id} → ${other?.name || ''}</span>`;
      }).join('');

      // Recent alerts for this zone
      const zoneAlerts = alertsList.filter(a => a.zoneId === zoneId).slice(0, 5);
      const zipAlertsEl = document.getElementById('zip-alerts');
      if (zoneAlerts.length === 0) {
        zipAlertsEl.innerHTML = `<div style="font-size:11px;color:var(--text-dim);padding:4px 0">No recent alerts for this zone</div>`;
      } else {
        const colorMap = { CRITICAL: 'var(--red)', WARNING: 'var(--amber)', INFO: 'var(--cyan)' };
        zipAlertsEl.innerHTML = zoneAlerts.map(a => `
      <div class="zip-alert-row" style="border-left-color:${colorMap[a.severity] || 'var(--cyan)'}">
        <b>${a.type.replace(/_/g, ' ')}</b> · ${t('badge_' + a.severity.toLowerCase())}<br>
        <span style="font-family:var(--font-data);font-size:9px;color:var(--text-dim)">${a.time.toLocaleTimeString()} · P:${a.pressure}bar · Q:${a.flow}L/s</span>
      </div>`).join('');
      }

      panel.classList.add('show');
    }

    function buildZonePopup(zone) {
      const s = zoneState[zone.id];
      const cat = ZONE_CATEGORIES[zone.category];
      const statusColor = { NORMAL: '#059669', WARNING: '#d97706', CRITICAL: '#dc2626' }[s.status];
      return `<div class="popup-title">${zone.hasSensor ? '📡' : '🤖'} ${zone.name}</div>
    <div class="popup-row"><span class="popup-label">Category</span><span class="popup-val" style="color:${cat?.color}">${cat?.label || zone.category}</span></div>
    <div class="popup-row"><span class="popup-label">Zone ID</span><span class="popup-val">${zone.id}</span></div>
    <div class="popup-row"><span class="popup-label">Pressure</span><span class="popup-val">${s.pressure.toFixed(2)} bar</span></div>
    <div class="popup-row"><span class="popup-label">Flow</span><span class="popup-val">${s.flow.toFixed(1)} L/s</span></div>
    <div class="popup-row"><span class="popup-label">pH</span><span class="popup-val">${s.ph.toFixed(1)}</span></div>
    <div class="popup-row"><span class="popup-label">Elevation</span><span class="popup-val">${zone.elevation} m</span></div>
    <div class="popup-row"><span class="popup-label">Data Source</span><span class="popup-val">${zone.hasSensor ? 'Live Sensor' : `Manual Inferred (${s.confidence?.toFixed(0)}%)`}</span></div>
    ${s.fault ? `<div class="popup-row"><span class="popup-label">⚠️ Fault</span><span class="popup-val" style="color:#dc2626;font-weight:700">${s.fault.replace(/_/g, ' ')}</span></div>` : ''}
    <span class="popup-status" style="background:${statusColor}18;color:${statusColor};border:1px solid ${statusColor}40">${t('badge_' + s.status.toLowerCase())}</span>
    <div style="margin-top:8px"><button style="background:var(--primary);color:white;border:none;border-radius:5px;padding:4px 10px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;cursor:pointer" onclick="onMapZoneSelect('${zone.id}')">📊 Zone Details</button></div>`;
    }

    function updateMapFaults() {
      Object.values(faultCircles).forEach(c => { if (c && mapInstance.hasLayer(c)) mapInstance.removeLayer(c); });
      faultCircles = {};
      Object.values(faultFloatMarkers).forEach(m => { if (m && mapInstance.hasLayer(m)) mapInstance.removeLayer(m); });
      faultFloatMarkers = {};

      const activeProblem = PROBLEMS.find(p => p.id === activeProblemId);
      const faultColors = {
        BURST: '#dc2626', LEAK: '#2563eb', LOW_PRESSURE: '#d97706',
        HIGH_PRESSURE: '#7c3aed', BLOCKAGE: '#ea580c', PH_ANOMALY: '#0d9488',
        AGING: '#92400e', UNAUTHORIZED: '#dc2626', IRREGULAR: '#0077cc'};
      const faultIcons = {
        BURST: '💥', LEAK: '💧', LOW_PRESSURE: '📉', HIGH_PRESSURE: '🔴',
        BLOCKAGE: '🚧', PH_ANOMALY: '⚗️', AGING: '🔧', UNAUTHORIZED: '🚨', IRREGULAR: '⏰'};

      let hasFaults = false;

      ZONES.forEach(zone => {
        const s = zoneState[zone.id];
        const cat = ZONE_CATEGORIES[zone.category];
        const catColor = cat ? cat.mapColor : '#1d5fbf';

        if (mapZoneMarkers[zone.id]) {
          if (!s.fault) {
            mapZoneMarkers[zone.id].setStyle({ color: catColor, fillColor: catColor });
          }
        }

        if (!s.fault) return;
        hasFaults = true;

        const fColor = faultColors[s.fault] || '#dc2626';
        const fIcon = faultIcons[s.fault] || '⚠️';
        const fLabel = s.fault.replace(/_/g, ' ');

        if (mapZoneMarkers[zone.id]) {
          mapZoneMarkers[zone.id].setStyle({ color: fColor, fillColor: fColor });
          mapZoneMarkers[zone.id].setPopupContent(buildZonePopup(zone));
        }

        const circle = L.circleMarker([zone.lat, zone.lng], {
          radius: s.status === 'CRITICAL' ? 22 : 17, color: fColor, fillColor: fColor,
          fillOpacity: 0.12, weight: 2.5, dashArray: '4,3'
        }).addTo(mapInstance);
        faultCircles[zone.id] = circle;

        const floatLat = zone.lat + 0.0025;
        const cssClass = `fault-float-marker fmark-${s.fault.toLowerCase()}`;
        const floatIcon = L.divIcon({
          className: '',
          html: `<div style="display:flex;flex-direction:column;align-items:center">
        <div class="${cssClass}" style="border-color:${fColor};color:${fColor}">
          <span>${fIcon}</span> ${fLabel}
        </div>
        <div style="width:2px;height:18px;background:${fColor};opacity:0.5;margin-top:2px;border-radius:1px"></div>
      </div>`,
          iconSize: [160, 50], iconAnchor: [80, 50]
        });

        const floatMarker = L.marker([floatLat, zone.lng], { icon: floatIcon, zIndexOffset: 1000 })
          .addTo(mapInstance)
          .on('click', () => { onMapZoneSelect(zone.id); });
        faultFloatMarkers[zone.id] = floatMarker;
      });

      // Pipe fault markers
      if (activeProblem && activeProblem.affectedPipes.length > 0) {
        activeProblem.affectedPipes.forEach(pid => {
          if (faultFloatMarkers['pipe_' + pid]) return;
          const pipe = PIPES.find(p => p.id === pid);
          if (!pipe) return;
          const fromZ = ZONES.find(z => z.id === pipe.from);
          const toZ = ZONES.find(z => z.id === pipe.to);
          if (!fromZ || !toZ) return;
          const midLat = (fromZ.lat + toZ.lat) / 2 + 0.002;
          const midLng = (fromZ.lng + toZ.lng) / 2;
          const fColor = faultColors[activeProblem.faultType] || '#d97706';
          const pipeFloatIcon = L.divIcon({
            className: '',
            html: `<div style="display:flex;flex-direction:column;align-items:center">
          <div style="background:white;border:2px solid ${fColor};border-radius:16px;padding:4px 10px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;color:${fColor};white-space:nowrap;box-shadow:0 3px 12px rgba(0,0,0,0.18);display:flex;align-items:center;gap:4px">
            ⚠️ ${pipe.id} — ${activeProblem.shortLabel}
          </div>
          <div style="width:2px;height:14px;background:${fColor};opacity:0.5;margin-top:2px;border-radius:1px"></div>
        </div>`,
            iconSize: [180, 45], iconAnchor: [90, 45]
          });
          const pm = L.marker([midLat, midLng], { icon: pipeFloatIcon, zIndexOffset: 900 }).addTo(mapInstance);
          faultFloatMarkers['pipe_' + pid] = pm;
        });
      }
    }

    function flyToZone(zid) {
      const zone = ZONES.find(z => z.id === zid);
      if (zone && mapInstance) {
        mapInstance.flyTo([zone.lat, zone.lng], 16, { duration: 1.2 });
        setTimeout(() => { if (mapZoneMarkers[zid]) mapZoneMarkers[zid].openPopup(); }, 1300);
      }
    }

    function centerMap() { if (mapInstance) mapInstance.flyTo([17.686, 75.910], 14, { duration: 1 }); }
    function toggleLayer(layer) {
      mapLayers[layer] = !mapLayers[layer];
      showToast(`Layer "${layer}" ${mapLayers[layer] ? 'shown' : 'hidden'}`, 'info');
      if (layer === 'pipes') {
        Object.values(mapPipeLines).forEach(pl => { mapLayers.pipes ? mapInstance.addLayer(pl) : mapInstance.removeLayer(pl); });
      }
      if (layer === 'faultMarkers') {
        const allMarkers = { ...faultFloatMarkers, ...faultCircles };
        Object.values(allMarkers).forEach(m => { mapLayers.faultMarkers ? mapInstance.addLayer(m) : mapInstance.removeLayer(m); });
      }
    }

    // ============================================================
    // UI RENDERING
    // ============================================================
    function updateAllUI() {
      updateTopCards();
      if (currentPage === 'dashboard') { renderSCADATable(); updateInfoPanel(); }
      if (currentPage === 'zones') renderZonesPage();
      if (currentPage === 'Manual') renderManualPage();
      if (currentPage === 'alerts') renderAlerts();
      updateClock();
    }

    function updateTopCards() {
      const faults = ZONES.filter(z => zoneState[z.id].fault);
      const critical = ZONES.filter(z => zoneState[z.id].status === 'CRITICAL');
      const leaks = ZONES.filter(z => ['LEAK', 'BURST'].includes(zoneState[z.id].fault));

      const sysStatus = document.getElementById('card-system-status');
      const sysCard = sysStatus?.closest('.stat-card');

      if (critical.length > 0) {
        el('card-system-status', 'CRITICAL'); el('card-status-sub', `${critical.length} zone(s) critical`);
        if (sysCard) sysCard.style.setProperty('--card-accent', 'var(--red)');
        document.getElementById('sys-dot').style.cssText = 'background:var(--red);animation:pulse-dot 1s ease infinite';
      } else if (faults.length > 0) {
        el('card-system-status', 'WARNING'); el('card-status-sub', `${faults.length} zone(s) affected`);
        if (sysCard) sysCard.style.setProperty('--card-accent', 'var(--amber)');
        document.getElementById('sys-dot').style.cssText = 'background:var(--amber)';
      } else {
        el('card-system-status', 'OPERATIONAL'); el('card-status-sub', 'All systems nominal');
        if (sysCard) sysCard.style.setProperty('--card-accent', 'var(--green)');
        document.getElementById('sys-dot').style.cssText = 'background:var(--green);animation:pulse-dot 2s ease infinite';
      }

      el('card-last-update', new Date().toLocaleTimeString('en-IN'));
      el('card-leaks', leaks.length);
      el('card-leaks-sub', leaks.length ? `${leaks.length} active leak(s)` : 'No leaks detected');
      el('card-critical-alerts', critical.length);
      el('card-alerts-sub', critical.length ? `${critical.length} critical fault(s)` : 'System nominal');
      if (typeof systemStats !== 'undefined' && systemStats.backupPower) {
        el('card-backup-power', systemStats.backupPower.toFixed(0) + '%');
      }
    }

    function renderSCADATable() {
      const tbody = document.getElementById('scada-tbody');
      if (!tbody) return;
      let html = '';
      ZONES.forEach(zone => {
        const s = zoneState[zone.id];
        const cat = ZONE_CATEGORIES[zone.category];
        const pClass = s.pressure < 1.0 ? 'val-critical' : s.pressure < 1.6 ? 'val-warning' : 'val-normal';
        const fClass = s.flow > 55 ? 'val-critical' : s.flow > 35 ? 'val-warning' : 'val-normal';
        const lClass = s.loss > 28 ? 'val-critical' : s.loss > 14 ? 'val-warning' : 'val-normal';
        const phClass = (s.ph < 6.5 || s.ph > 8.5) ? 'val-warning' : 'val-normal';

        let actionClass = 'action-MONITOR', actionLabel = 'MONITOR';
        if (s.status === 'CRITICAL') { actionClass = s.fault === 'BURST' ? 'action-INVESTIGATE' : 'action-BOOST'; actionLabel = s.fault === 'BURST' ? 'INVESTIGATE' : 'BOOST'; }
        else if (s.status === 'WARNING') { actionClass = s.fault === 'HIGH_PRESSURE' ? 'action-DECREASE' : 'action-BOOST'; actionLabel = s.fault === 'HIGH_PRESSURE' ? 'DECREASE' : 'BOOST'; }

        html += `<tr>
      <td><span class="zone-name">${zone.name}</span><span class="cat-badge cat-${zone.category}" style="color:${cat?.color}">${cat?.label || zone.category}</span>${s.dataInferred ? '<span class="ai-badge">MANUAL</span>' : ''}</td>
      <td class="mono">${zone.elevation}</td>
      <td class="mono ${pClass}">${s.pressure.toFixed(2)}</td>
      <td class="mono ${fClass}">${s.flow.toFixed(1)}</td>
      <td class="mono ${phClass}">${s.ph.toFixed(1)}</td>
      <td><span class="status-chip status-${t('badge_' + s.status.toLowerCase())}">${t('badge_' + s.status.toLowerCase())}</span></td>
      <td class="mono ${lClass}">${s.loss.toFixed(1)}%</td>
      <td><button class="action-btn ${actionClass}" onclick="handleZoneAction('${zone.id}','${actionLabel}')">${actionLabel}</button></td>
    </tr>`;
      });
      tbody.innerHTML = html;
    }

    function updateInfoPanel() {
      const sensorZones = ZONES.filter(z => z.hasSensor);
      const totalFlow = sensorZones.reduce((a, z) => a + zoneState[z.id].flow, 0);
      const avgPressure = ZONES.reduce((a, z) => a + zoneState[z.id].pressure, 0) / ZONES.length;
      const avgPH = ZONES.reduce((a, z) => a + zoneState[z.id].ph, 0) / ZONES.length;
      el('total-flow', totalFlow.toFixed(0) + ' L/s');
      el('avg-pressure', avgPressure.toFixed(2) + ' bar');
      el('avg-ph', avgPH.toFixed(1));
      if (typeof RESERVOIRS !== 'undefined') {
        const ekrukPct = RESERVOIRS[0].level;
        const hippargaPct = RESERVOIRS[1].level;
        el('ekruk-pct', ekrukPct.toFixed(0) + '%');
        el('hipparga-pct', hippargaPct.toFixed(0) + '%');
        const ef = document.getElementById('ekruk-fill'), hf = document.getElementById('hipparga-fill');
        if (ef) ef.style.width = ekrukPct + '%';
        if (hf) hf.style.width = hippargaPct + '%';
      }
    }

    function renderZonesPage() {
      const container = document.getElementById('zones-by-category');
      if (!container) return;
      const order = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'MIXED'];
      let html = '';
      order.forEach(catKey => {
        const cat = ZONE_CATEGORIES[catKey]; cat.label = t('cat_'+catKey.toLowerCase().substring(0,3));
        const catZones = ZONES.filter(z => z.category === catKey);
        if (catZones.length === 0) return;
        html += `<div class="zones-section">
      <div class="zones-cat-header">
        <div class="zones-cat-dot" style="background:${cat.color}"></div>
        <div class="zones-cat-name" style="color:${cat.color}">${t('cat_' + (catKey==='RESIDENTIAL'?'res':catKey==='COMMERCIAL'?'com':catKey==='INDUSTRIAL'?'ind':'mix'))} Zones</div>
        <span class="zones-cat-count">${catZones.length} zones</span>
      </div>
      <div class="zones-grid">`;
        catZones.forEach(zone => {
          const s = zoneState[zone.id];
          const statusColor = { NORMAL: cat.color, WARNING: 'var(--amber)', CRITICAL: 'var(--red)' }[s.status];
          html += `<div class="zone-card" style="border-top:3px solid ${statusColor}">
        <div class="zone-card-top">
          <div>
            <div class="zone-card-name">${zone.name}</div>
            <div class="zone-card-id">${zone.id} · ${zone.elevation}m · Pop: ${(zone.population / 1000).toFixed(0)}k</div>
          </div>
          <span class="status-chip status-${t('badge_' + s.status.toLowerCase())}">${t('badge_' + s.status.toLowerCase())}</span>
        </div>
        <div class="zone-metrics">
          <div class="zone-metric"><div class="zone-metric-val" style="color:${cat.color}">${s.pressure.toFixed(2)}</div><div class="zone-metric-label">Pressure (bar)</div></div>
          <div class="zone-metric"><div class="zone-metric-val" style="color:${cat.color}">${s.flow.toFixed(1)}</div><div class="zone-metric-label">Flow (L/s)</div></div>
          <div class="zone-metric"><div class="zone-metric-val" style="color:${cat.color}">${s.ph.toFixed(1)}</div><div class="zone-metric-label">pH</div></div>
        </div>
        <div class="zone-card-footer">
          <div class="sensor-indicator">
            <div style="width:7px;height:7px;border-radius:50%;background:${zone.hasSensor ? 'var(--green)' : 'var(--purple)'}"></div>
            ${zone.hasSensor ? 'Live Sensor' : `Manual Inferred (${s.confidence?.toFixed(0)}%)`}
          </div>
          ${s.fault ? `<span style="font-size:10px;font-weight:700;color:var(--red)">${s.fault.replace(/_/g, ' ')}</span>` : `<span style="font-size:10px;color:var(--green);font-weight:600">No faults</span>`}
        </div>
      </div>`;
        });
        html += `</div></div>`;
      });
      container.innerHTML = html;
    }

    function renderPumpsPage() {
      const grid = document.getElementById('pump-grid');
      if (!grid) return;
      let html = '';
      PUMP_HOUSES.forEach(ph => {
        const ps = pumpStates[ph.id];
        html += `<div class="pump-card">
      <div class="pump-header">
        <div class="pump-name">${ph.name}</div>
        <span class="status-chip ${ps.running ? 'status-NORMAL' : 'status-CRITICAL'}">${ps.running ? 'RUNNING' : 'STOPPED'}</span>
      </div>
      <div class="pump-specs">
        <div class="pump-spec"><div class="pump-spec-val">${ph.power} kW</div><div class="pump-spec-label">Rated Power</div></div>
        <div class="pump-spec"><div class="pump-spec-val">${ph.pumps}</div><div class="pump-spec-label">Pump Units</div></div>
        <div class="pump-spec"><div class="pump-spec-val">${ph.flow}</div><div class="pump-spec-label">Design Q (m³/h)</div></div>
        <div class="pump-spec"><div class="pump-spec-val" style="color:var(--amber)">${ps.speed.toFixed(0)}%</div><div class="pump-spec-label">Speed</div></div>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-label"><span>Load</span><span class="mono">${ps.speed.toFixed(0)}%</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${ps.speed}%;background:${ps.speed > 90 ? 'var(--red)' : ps.speed > 70 ? 'var(--amber)' : 'var(--green)'}"></div></div>
      </div>
      <div class="pump-controls">
        <button class="btn ${ps.running ? 'btn-red' : 'btn-green'}" style="font-size:11px;padding:5px 12px" onclick="togglePump('${ph.id}')">${ps.running ? 'STOP' : 'START'}</button>
        <button class="btn btn-outline" style="font-size:11px;padding:5px 12px" onclick="showToast('Diagnostics: ${ph.name} — All nominal','info')">DIAGNOSTICS</button>
      </div>
    </div>`;
      });
      grid.innerHTML = html;
    }

    function renderManualPage() {
      const rows = document.getElementById('inference-rows');
      if (!rows) return;
      const nonSensor = ZONES.filter(z => !z.hasSensor);
      rows.innerHTML = nonSensor.map(zone => {
        const s = zoneState[zone.id];
        const conf = s.confidence || 88;
        return `<div class="inference-row">
      <span class="inference-zone">${zone.name}</span>
      <div class="inference-bar"><div class="inference-fill" style="width:${conf}%"></div></div>
      <span class="inference-conf">${conf.toFixed(0)}%</span>
    </div>`;
      }).join('');
      if (typeof systemStats !== 'undefined' && systemStats.dataAccuracy) {
        el('data-accuracy', systemStats.dataAccuracy.toFixed(1) + '%');
      }
    }

    // ============================================================
    // ALERTS — ZONE-GROUPED + HISTORY TAB
    // ============================================================
    function switchAlertTab(tab) {
      currentAlertTab = tab;
      document.getElementById('tab-live').classList.toggle('active', tab === 'live');
      document.getElementById('tab-history').classList.toggle('active', tab === 'history');
      document.getElementById('alerts-live-tab').classList.toggle('active', tab === 'live');
      document.getElementById('alerts-history-tab').classList.toggle('active', tab === 'history');
      document.getElementById('alert-live-controls').style.display = tab === 'live' ? 'flex' : 'none';
      if (tab === 'history') renderAlertHistory();
      else renderAlerts();
    }

    function renderAlerts() {
      if (currentAlertTab !== 'live') return;
      const container = document.getElementById('alerts-zone-grouped');
      if (!container) return;

      let filtered = alertFilter === 'ALL' ? alertsList : alertsList.filter(a => a.severity === alertFilter);

      if (filtered.length === 0) {
        container.innerHTML = `<div class="no-alerts-empty"><div>✅</div><div>No alerts in this category</div></div>`;
        return;
      }

      // Group by zone
      const zoneGroups = {};
      filtered.forEach(a => {
        const key = a.zoneId || a.zone;
        if (!zoneGroups[key]) zoneGroups[key] = { zoneName: a.zone, zoneId: a.zoneId, category: a.category, alerts: [] };
        zoneGroups[key].alerts.push(a);
      });

      const colorMap = { CRITICAL: 'var(--red)', WARNING: 'var(--amber)', INFO: 'var(--cyan)' };
      const iconsMap = {
        CRITICAL: `<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        WARNING: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        INFO: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`};

      // Sort zones: those with CRITICAL first, then WARNING, then by alert count
      const sortedZoneKeys = Object.keys(zoneGroups).sort((a, b) => {
        const aHasCrit = zoneGroups[a].alerts.some(x => x.severity === 'CRITICAL') ? 0 : 1;
        const bHasCrit = zoneGroups[b].alerts.some(x => x.severity === 'CRITICAL') ? 0 : 1;
        if (aHasCrit !== bHasCrit) return aHasCrit - bHasCrit;
        return zoneGroups[b].alerts.length - zoneGroups[a].alerts.length;
      });

      let html = '';
      sortedZoneKeys.forEach(key => {
        const group = zoneGroups[key];
        const zoneObj = ZONES.find(z => z.id === group.zoneId || z.name === group.zoneName);
        const cat = zoneObj ? ZONE_CATEGORIES[zoneObj.category] : null;
        const catColor = cat ? cat.color : '#1d5fbf';
        const hasCritical = group.alerts.some(a => a.severity === 'CRITICAL');
        const hasWarning = group.alerts.some(a => a.severity === 'WARNING');
        const topSeverity = hasCritical ? 'CRITICAL' : hasWarning ? 'WARNING' : 'INFO';
        const topColor = colorMap[topSeverity];
        const critCount = group.alerts.filter(a => a.severity === 'CRITICAL').length;
        const warnCount = group.alerts.filter(a => a.severity === 'WARNING').length;

        const badgeHtml = `
      ${critCount > 0 ? `<span class="zag-count" style="background:var(--red-dim);color:var(--red)">${critCount} CRITICAL</span>` : ''}
      ${warnCount > 0 ? `<span class="zag-count" style="background:var(--amber-dim);color:var(--amber)">${warnCount} WARNING</span>` : ''}
      ${(critCount + warnCount) === 0 ? `<span class="zag-count" style="background:var(--cyan-dim);color:var(--cyan)">${group.alerts.length} INFO</span>` : ''}
    `;

        html += `<div class="zone-alert-group">
      <div class="zag-header" onclick="toggleZoneAlertGroup('zag-${key}')">
        <div class="zag-left">
          <div class="zag-dot" style="background:${catColor}"></div>
          <div>
            <span class="zag-zone-name">${group.zoneName}</span>
            <span class="zag-zone-sub">${zoneObj ? `${zoneObj.id} · ${cat?.label || ''}` : ''} · ${group.alerts.length} alert${group.alerts.length > 1 ? 's' : ''}</span>
          </div>
        </div>
        <div class="zag-right">
          ${badgeHtml}
          <span class="zag-toggle open" id="zag-toggle-${key}">▼</span>
        </div>
      </div>
      <div class="zag-body" id="zag-${key}" style="display:flex">
        ${group.alerts.map(a => `
          <div class="alert-row severity-${t('badge_' + a.severity.toLowerCase())}">
            <div class="alert-icon-wrap" style="background:${colorMap[a.severity]}18;color:${colorMap[a.severity]}">${iconsMap[a.severity] || iconsMap.INFO}</div>
            <div class="alert-body">
              <div class="alert-title">${a.type.replace(/_/g, ' ')}</div>
              <div class="alert-meta">${a.message} · P: ${a.pressure} bar · Q: ${a.flow} L/s</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <div class="alert-time">${a.time.toLocaleTimeString()}</div>
              <span class="alert-status-chip" style="background:${colorMap[a.severity]}18;color:${colorMap[a.severity]}">${t('badge_' + a.severity.toLowerCase())}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
      });

      container.innerHTML = html;
      el('live-tab-badge', filtered.length);
    }

    function toggleZoneAlertGroup(id) {
      const body = document.getElementById(id);
      const key = id.replace('zag-', '');
      const toggle = document.getElementById(`zag-toggle-${key}`);
      if (!body) return;
      const isOpen = body.style.display !== 'none';
      body.style.display = isOpen ? 'none' : 'flex';
      if (toggle) toggle.classList.toggle('open', !isOpen);
    }

    function renderAlertHistory() {
      const tbody = document.getElementById('alert-history-tbody');
      if (!tbody) return;

      const zoneFilter = document.getElementById('history-zone-filter')?.value || 'ALL';
      const severityFilter = document.getElementById('history-severity-filter')?.value || 'ALL';

      let filtered = [...alertsList];
      if (zoneFilter !== 'ALL') filtered = filtered.filter(a => a.zoneId === zoneFilter || a.zone === zoneFilter);
      if (severityFilter !== 'ALL') filtered = filtered.filter(a => a.severity === severityFilter);

      el('history-tab-badge', filtered.length);

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--text-dim)">No alert history matching filters</td></tr>`;
        return;
      }

      const colorMap = { CRITICAL: 'var(--red)', WARNING: 'var(--amber)', INFO: 'var(--cyan)' };
      tbody.innerHTML = filtered.map((a, i) => {
        const zoneObj = ZONES.find(z => z.id === a.zoneId || z.name === a.zone);
        const cat = zoneObj ? ZONE_CATEGORIES[zoneObj.category] : null;
        return `<tr>
      <td style="color:var(--text-dim)">${filtered.length - i}</td>
      <td>${a.time.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: 'short' })}</td>
      <td style="font-family:var(--font-body);font-weight:700;color:var(--text-primary)">${a.zone}</td>
      <td><span style="font-family:var(--font-head);font-size:10px;font-weight:700;color:${cat?.color || '#1d5fbf'}">${cat?.label || '—'}</span></td>
      <td style="font-weight:600;color:var(--text-primary)">${a.type.replace(/_/g, ' ')}</td>
      <td><span class="status-chip status-${t('badge_' + a.severity.toLowerCase())}" style="font-size:9px">${t('badge_' + a.severity.toLowerCase())}</span></td>
      <td>${a.pressure} bar</td>
      <td>${a.flow} L/s</td>
      <td style="max-width:200px;white-space:normal;line-height:1.4">${a.message}</td>
    </tr>`;
      }).join('');
    }

    function populateAlertHistoryZoneFilter() {
      const sel = document.getElementById('history-zone-filter');
      if (!sel || sel.options.length > 1) return;
      ZONES.forEach(z => {
        const opt = document.createElement('option');
        opt.value = z.id;
        opt.textContent = `${z.id} · ${z.name}`;
        sel.appendChild(opt);
      });
    }

    function filterAlerts(f) {
      alertFilter = f;
      renderAlerts();
    }

    function clearAlerts() {
      alertsList = [];
      renderAlerts();
      renderAlertHistory();
      updateAlertBadge();
      showToast('All alerts cleared', 'info');
    }

    function updateAlertBadge() {
      const b = document.getElementById('alert-badge');
      if (b) b.textContent = alertsList.filter(a => !a.acknowledged).length;
      const lb = document.getElementById('live-tab-badge');
      if (lb) lb.textContent = alertsList.length;
      const hb = document.getElementById('history-tab-badge');
      if (hb) hb.textContent = alertsList.length;
    }

    // ============================================================
    // VALVE + REPORT
    // ============================================================
    function renderValvesPage() {
      const grid = document.getElementById('valve-grid');
      if (!grid) return;
      grid.innerHTML = PIPES.map(pipe => {
        const vs = valveStates[pipe.id];
        const fromZ = ZONES.find(z => z.id === pipe.from);
        const toZ = ZONES.find(z => z.id === pipe.to);
        return `<div class="valve-card">
      <div class="valve-header">
        <div class="valve-name">${pipe.id}: ${fromZ?.name || pipe.from} → ${toZ?.name || pipe.to}</div>
        <div class="valve-toggle ${vs.open ? 'open' : ''}" onclick="toggleValve('${pipe.id}')"></div>
      </div>
      <div style="font-size:11px;color:var(--text-dim);margin-bottom:8px;font-weight:500">Ø${pipe.diameter}mm · ${pipe.length}km · ${pipe.material}</div>
      <div style="font-size:11px;color:var(--text-dim);margin-bottom:4px;font-weight:500">Position: <span class="mono" style="color:var(--primary)">${vs.position}%</span></div>
      <input type="range" class="valve-slider" min="0" max="100" value="${vs.position}" oninput="updateValvePosition('${pipe.id}',this.value)">
      <div style="display:flex;justify-content:space-between;margin-top:4px">
        <span style="font-size:10px;color:var(--text-dim);font-weight:500">CLOSED</span>
        <span style="font-size:10px;color:var(--text-dim);font-weight:500">FULL OPEN</span>
      </div>
    </div>`;
      }).join('');
    }

    function renderReportsPage() {
      const tbody = document.getElementById('report-tbody');
      if (!tbody || reportHistory.length === 0) return;
      tbody.innerHTML = reportHistory.slice(0, 20).map(r => `
    <tr>
      <td>${r.time}</td>
      <td>${r.zone}</td>
      <td style="color:${r.pressure < 1.5 ? 'var(--amber)' : 'var(--text-secondary)'}">${r.pressure}</td>
      <td>${r.flow}</td>
      <td>${r.ph}</td>
      <td style="color:${r.incidents > 0 ? 'var(--red)' : 'var(--text-secondary)'}">${r.incidents}</td>
      <td style="color:${r.loss > 15 ? 'var(--amber)' : 'var(--text-secondary)'}">${r.loss}%</td>
      <td><span class="status-chip status-${r.status}">${r.status}</span></td>
    </tr>`).join('');
    }

    function buildReportHistory() {
      if (tickCount % 5 !== 0) return;
      const zone = ZONES[Math.floor(Math.random() * ZONES.length)];
      const s = zoneState[zone.id];
      reportHistory.unshift({
        time: new Date().toLocaleTimeString(), zone: zone.name,
        pressure: s.pressure.toFixed(2), flow: s.flow.toFixed(1), ph: s.ph.toFixed(1),
        incidents: s.fault ? 1 : 0, loss: s.loss.toFixed(1), status: s.status
      });
      if (reportHistory.length > 100) reportHistory.pop();
      if (currentPage === 'reports') renderReportsPage();
    }

    // ============================================================
    // ACTION HANDLERS
    // ============================================================
    function handleZoneAction(zid, action) {
      const zone = ZONES.find(z => z.id === zid);
      const actions = {
        MONITOR: `Monitoring ${zone.name} — data stream active`,
        BOOST: `Pressure boost initiated for ${zone.name}`,
        DECREASE: `Pressure reduction for ${zone.name}`,
        INVESTIGATE: `Field team dispatched to ${zone.name}`};
      showToast(actions[action] || `Action ${action} applied`, action === 'INVESTIGATE' ? 'critical' : 'info');
    }

    function togglePump(phid) {
      pumpStates[phid].running = !pumpStates[phid].running;
      const ph = PUMP_HOUSES.find(p => p.id === phid);
      showToast(`${ph.name} ${pumpStates[phid].running ? 'started' : 'stopped'}`, pumpStates[phid].running ? 'success' : 'warning');
      renderPumpsPage();
    }

    function toggleValve(vid) {
      valveStates[vid].open = !valveStates[vid].open;
      valveStates[vid].position = valveStates[vid].open ? 100 : 0;
      showToast(`Valve ${vid} ${valveStates[vid].open ? 'opened' : 'closed'}`, 'info');
      renderValvesPage();
    }

    function updateValvePosition(vid, val) {
      valveStates[vid].position = parseInt(val);
      valveStates[vid].open = parseInt(val) > 0;
    }

    function runAIOptimize() {
      const faults = ZONES.filter(z => zoneState[z.id].fault);
      const criticalZones = ZONES.filter(z => zoneState[z.id].status === 'CRITICAL');
      const lowPressure = ZONES.filter(z => zoneState[z.id].pressure < 1.5);
      let recs = [];
      if (criticalZones.length > 0) recs.push({ priority: 'HIGH', color: 'var(--red)', label: 'Emergency Response', text: `Dispatch field teams to ${criticalZones.map(z => z.name).join(', ')}. Isolate affected segments.` });
      if (lowPressure.length > 0) recs.push({ priority: 'MED', color: 'var(--amber)', label: 'Pressure Balancing', text: `Increase pump speed at Central Pump Station by 15%. Open bypass valve P03 → reroute through Mangalwar Peth.` });
      recs.push({ priority: 'LOW', color: 'var(--cyan)', label: 'Network Optimization', text: `Redistribute flow from Akkalkot Rd (high) to Station Area (low) via P05. Est. 12% efficiency gain.` });
      recs.push({ priority: 'LOW', color: 'var(--green)', label: 'Predictive Maintenance', text: `Manual predicts P08 (Bijapur→Shivaji) showing 67% friction increase — schedule inspection within 72 hours.` });
      recs.push({ priority: 'LOW', color: 'var(--purple)', label: 'Demand Forecast', text: `Morning peak demand forecast +40% at 08:00. Pre-adjusting PH02 pump speed to 90% from 07:45.` });

      document.getElementById('ai-recommendations').innerHTML = recs.map(r => `<div class="rec-item">
    <div class="rec-priority" style="background:${r.color}18;color:${r.color}">${r.priority}</div>
    <div class="rec-body"><div class="rec-title">${r.label}</div><div class="rec-desc">${r.text}</div></div>
  </div>`).join('');
      document.getElementById('ai-modal').classList.add('show');
    }

    function applyOptimizations() {
      closeModal('ai-modal');
      showToast('Manual optimizations applied — Network reconfiguring', 'success');
      setTimeout(() => showToast('Pressure balancing complete — 8 zones improved', 'success'), 2000);
    }

    function emergencyStop() { document.getElementById('estop-modal').classList.add('show'); }

    function confirmEmergencyStop() {
      closeModal('estop-modal');
      isRunning = false; clearInterval(simTimer);
      el('card-system-status', 'E-STOP');
      document.getElementById('sys-dot').style.cssText = 'background:var(--red)';
      showToast('⚠️ EMERGENCY STOP ACTIVATED — All pumps halted', 'critical');
      setTimeout(() => { showToast('Backup generator online — monitoring continues', 'warning'); isRunning = true; startSimulation(); }, 4000);
    }

    function refreshNow() { runSimulation(); showToast('Manual refresh complete', 'info'); }
    function changeInterval(val) { updateInterval = parseInt(val); clearInterval(simTimer); simTimer = setInterval(runSimulation, updateInterval); }
    function generateReport() { showToast('Generating report...', 'info'); setTimeout(() => showToast('Report: SMC_Water_' + Date.now() + '.pdf generated', 'success'), 1500); }

    // ============================================================
    // NAVIGATION
    // ============================================================
    function showPage(page) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      const pageEl = document.getElementById(`page-${page}`);
      if (pageEl) pageEl.classList.add('active');
      document.querySelectorAll('.nav-item').forEach(n => { if (n.getAttribute('onclick')?.includes(page)) n.classList.add('active'); });
      currentPage = page;
      const titles = { dashboard: 'DASHBOARD', zones: 'ZONE MANAGEMENT', pumps: 'PUMP HOUSES', alerts: 'ALERT MANAGEMENT', Manual: 'Manual ANALYTICS', map: 'PIPELINE NETWORK', valves: 'VALVE CONTROLS', reports: 'REPORTS', forecast: 'PREDICTIVE FORECASTING' };
      el('page-title', titles[page] || page.toUpperCase());

      if (page === 'map') {
        setTimeout(() => { initMap(); if (mapInstance) mapInstance.invalidateSize(); }, 100);
      }
      if (page === 'pumps') renderPumpsPage();
      if (page === 'zones') renderZonesPage();
      if (page === 'alerts') {
        populateAlertHistoryZoneFilter();
        renderAlerts();
        renderAlertHistory();
      }
      if (page === 'estimation') renderManualPage();
      if (page === 'valves') renderValvesPage();
      if (page === 'reports') renderReportsPage();
    }

    // ============================================================
    // TOAST
    // ============================================================
    function showToast(text, type = 'info') {
      const container = document.getElementById('toast-container');
      const colors = { info: 'var(--cyan)', success: 'var(--green)', warning: 'var(--amber)', critical: 'var(--red)' };
      const icons = {
        info: `<svg viewBox="0 0 24 24" stroke="var(--cyan)" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
        success: `<svg viewBox="0 0 24 24" stroke="var(--green)" fill="none" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
        warning: `<svg viewBox="0 0 24 24" stroke="var(--amber)" fill="none" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        critical: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`};
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `<div class="toast-icon" style="color:${colors[type]}">${icons[type] || icons.info}</div><div class="toast-text">${text}</div><div class="toast-time">${new Date().toLocaleTimeString()}</div>`;
      container.appendChild(toast);
      setTimeout(() => { toast.style.animation = 'toast-out 0.3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 4000);
    }

    // ============================================================
    // MODAL + CLOCK
    // ============================================================
    function closeModal(id) { document.getElementById(id)?.classList.remove('show'); }
    document.querySelectorAll('.modal-overlay').forEach(m => m.addEventListener('click', e => { if (e.target === m) m.classList.remove('show'); }));
    function updateClock() { el('current-time', new Date().toLocaleTimeString('en-IN', { hour12: false })); }
    setInterval(updateClock, 1000);
    function el(id, val) { const e = document.getElementById(id); if (e && val !== undefined) e.textContent = val; return e; }

    // ============================================================
    // SIMULATION LOOP
    // ============================================================
    function startSimulation() {
      clearInterval(simTimer);
      simTimer = setInterval(() => { runSimulation(); }, updateInterval);
    }

    // ============================================================
    // INIT
    // ============================================================
    function init() {
      renderSCADATable(); updateInfoPanel(); renderPumpsPage();
      renderZonesPage(); renderManualPage(); renderValvesPage();
      initCharts(); updateClock(); updateTopCards();
      updateActiveProblemUI(null);
      populateAlertHistoryZoneFilter();
      startSimulation();
      setTimeout(() => showToast('SMC Water Management System online — SCADA connected', 'success'), 400);
      setTimeout(() => showToast('Zone-wise map & alert grouping active · Problem Simulator ready', 'info'), 1600);
    }

    document.addEventListener('DOMContentLoaded', init);

    // ============================================================
    // AI PUMP AUTOMATION TERMINAL (22-STEP DEMO)
    // ============================================================
    function openPumpAutoModal() {
        document.getElementById('pump-auto-modal').classList.add('show');
        const term = document.getElementById('pump-terminal');
        document.getElementById('pump-init-btn').style.display = 'inline-block';
        term.innerHTML = `
<div style="color:#64748b; margin-bottom:4px">> System monitoring all zones continuously via SCADA... [OK]</div>
<div style="color:#ef4444; font-weight:bold; margin-bottom:4px">> ⚠️ ALERT: Pressure drop detected in Zone 5 — below 7 metres (0.68 bar)</div>
<div style="color:#eab308; margin-bottom:4px">> System diagnoses — demand-based issue confirmed</div>
<div style="color:#eab308; margin-bottom:15px">> Control room dashboard alert fired [LOGGED]</div>
<div style="color:#38bdf8; animation: pulse-dot 1.5s infinite">Awaiting operator authorization for EPANET Auto-Adjust protocol...</div>`;
    }

    async function startPumpAutoAdjust() {
        document.getElementById('pump-init-btn').style.display = 'none';
        const term = document.getElementById('pump-terminal');
        term.innerHTML += `<div style="color:#38bdf8; margin-bottom:4px; margin-top:15px">> Operator clicked 'Auto-Adjust' on dashboard -> Initiating Protocol...</div>`;
        
        const steps = [
            { t: "System pulls latest live flow readings from SCADA...", c: "#94a3b8", d: 800 },
            { t: "Live flow readings fed into EPANET as current demand values", c: "#94a3b8", d: 600 },
            { t: "EPANET runs baseline physics simulation — captures current pressure at all zones", c: "#c084fc", d: 1300 },
            { t: "System proposes initial pump setpoint (PH01 -> 98% Hz)", c: "#38bdf8", d: 700 },
            { t: "EPANET simulates with proposed setpoint...", c: "#c084fc", d: 1000 },
            { t: "System checks — are all intermediate zones safe?", c: "#94a3b8", d: 600 },
            { t: "NO -> CPHEEO limit exceeded at Zone 4 (2.3 bar)", c: "#ef4444", d: 1000 },
            { t: "Setpoint reduced to 92% -> re-simulating -> repeat from Step 10", c: "#eab308", d: 1200 },
            { t: "EPANET simulates with new proposed setpoint (92%)...", c: "#c084fc", d: 1000 },
            { t: "System checks — are all intermediate zones safe?", c: "#94a3b8", d: 600 },
            { t: "YES -> setpoint locked ✅", c: "#22c55e", d: 500 },
            { t: "Final safety check — all zones within CPHEEO limits confirmed", c: "#22c55e", d: 600 },
            { t: "Optimal setpoint sent to SCADA via REST API", c: "#38bdf8", d: 400 },
            { t: "SCADA RTU forwards setpoint to VFD at PH01 pump station", c: "#94a3b8", d: 800 },
            { t: "VFD adjusts pump speed to match setpoint...", c: "#eab308", d: 1300 },
            { t: "Pressure hydraulically rising across network...", c: "#64748b", d: 1000 },
            { t: "After 60 seconds — SCADA sends back live sensor readings", c: "#94a3b8", d: 1000 },
            { t: "Dashboard confirms Zone 5 restored ✅ intermediate unaffected ✅", c: "#22c55e", d: 700 },
            { t: "Action logged with timestamp.", c: "#64748b", d: 300 },
            { t: "System continues monitoring — AI will reduce pump speed when demand normalises", c: "#38bdf8", d: 0 }
        ];

        for (let i = 0; i < steps.length; i++) {
            const span = document.createElement('div');
            span.style.color = steps[i].c;
            span.style.marginBottom = "4px";
            span.innerHTML = `> ${steps[i].t}`;
            term.appendChild(span);
            term.scrollTop = term.scrollHeight;
            if (steps[i].d > 0) {
                await new Promise(r => setTimeout(r, steps[i].d));
            }
        }
        
        // Actually execute network fix in the backend simulator
        fetch("/api/scenario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ scenario: "NORMAL" })
        }).then(() => {
            showToast("Pump Automation Complete — System Restored", "success");
        });
    }

    // ============================================================
    // AI PREDICTIVE FORECASTING (LSTM TRAINING SIMULATION)
    // ============================================================
    async function startForecastTraining() {
        document.getElementById('train-model-btn').style.display = 'none';
        document.getElementById('forecast-results-panel').style.display = 'none';
        
        const panel = document.getElementById('forecast-training-panel');
        const term = document.getElementById('forecast-terminal-output');
        const bar = document.getElementById('forecast-progress-bar');
        
        panel.style.display = 'flex';
        term.innerHTML = '';
        bar.style.width = '0%';
        
        const steps = [
            { t: "Connecting to SCADA Historical Database...", d: 500, p: 5 },
            { t: "Extracting 5 years of telemetry data (4.2M records)..", d: 800, p: 15 },
            { t: "Normalizing temporal datasets (Pressure, Flow, Valve states)..", d: 600, p: 25 },
            { t: "Initializing LSTM Recurrent Neural Network..", d: 500, p: 30 },
            { t: "EPOCH 1/5 [======>               ] loss: 0.8432 - accuracy: 0.6214", d: 900, p: 40 },
            { t: "EPOCH 2/5 [==========>           ] loss: 0.5120 - accuracy: 0.7681", d: 800, p: 55 },
            { t: "EPOCH 3/5 [===============>      ] loss: 0.3214 - accuracy: 0.8544", d: 800, p: 70 },
            { t: "EPOCH 4/5 [===================>  ] loss: 0.1802 - accuracy: 0.9123", d: 700, p: 85 },
            { t: "EPOCH 5/5 [======================] loss: 0.0914 - accuracy: 0.9641", d: 900, p: 95 },
            { t: "Training complete. Validating against test set...", d: 600, p: 98 },
            { t: "Validation OK. Generating 7-day Risk Matrix predictions...", d: 600, p: 100 }
        ];

        for (let i = 0; i < steps.length; i++) {
            const span = document.createElement('div');
            span.innerHTML = `> ${steps[i].t}`;
            term.appendChild(span);
            term.scrollTop = term.scrollHeight;
            bar.style.width = steps[i].p + '%';
            await new Promise(r => setTimeout(r, steps[i].d));
        }

        setTimeout(() => {
            panel.style.display = 'none';
            document.getElementById('forecast-results-panel').style.display = 'flex';
            document.getElementById('train-model-btn').style.display = 'inline-block';
            document.getElementById('train-model-btn').innerHTML = `
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:6px">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.22-10.27l-3.26 3.26"/>
              </svg> RETRAIN MODEL`;
            renderForecastTable();
            showToast("AI Predictive Model Successfully Trained", "success");
        }, 800);
    }

    function renderForecastTable() {
        const tbody = document.getElementById('forecast-table-body');
        
        const predictions = [
            {
                target: "Z04 (Station Area)",
                anomaly: "P11: Demand Anomaly Peak",
                conf: 94.2,
                eta: "Tomorrow, 08:30 AM",
                action: "Pre-adjust PH02 pump curve to 88% at 08:00 AM",
                btn: "PRE-SCHEDULE"
            },
            {
                target: "Budhwar Peth Jct",
                anomaly: "P4: Pipe Rupture / Leak",
                conf: 87.5,
                eta: "3 Days, 14 Hours",
                action: "Dispatch field inspection to check structural integrity of P04",
                btn: "CREATE TICKET"
            },
            {
                target: "Z03 (Solapur MIDC)",
                anomaly: "P6: CI Micro-failure",
                conf: 82.1,
                eta: "6 Days, 5 Hours",
                action: "Schedule CIPP lining. Lower local pressure setpoint by 0.2 bar.",
                btn: "LOWER PRESSURE"
            }
        ];

        let html = '';
        predictions.forEach(p => {
            const confColor = p.conf > 90 ? 'var(--red)' : p.conf > 85 ? 'var(--orange)' : 'var(--amber)';
            html += `<tr>
                <td style="font-weight:700; color:var(--text);">${p.target}</td>
                <td><span style="color:${confColor}; font-weight:600;">${p.anomaly}</span></td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="mono" style="color:${confColor}">${p.conf}%</span>
                        <div style="width:50px; height:4px; background:var(--bg-card2); border-radius:2px; overflow:hidden;">
                            <div style="height:100%; width:${p.conf}%; background:${confColor}"></div>
                        </div>
                    </div>
                </td>
                <td class="mono">${p.eta}</td>
                <td style="color:var(--text-secondary); font-size:12px;">${p.action}</td>
                <td><button class="action-btn action-INVESTIGATE" onclick="showToast('Action Scheduled', 'success')">${p.btn}</button></td>
            </tr>`;
        });
        
        tbody.innerHTML = html;
    }
