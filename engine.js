/* =============================
   SPD v12.2 // AUTONOMOUS STABILIZATION ENGINE
   FIXED: INJECTION VISIBILITY + CONTROLLED STABILISATION
============================= */

/* -----------------------------
   STATE
------------------------------*/
export const state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0,

  biodiesel: 35,
  cpoReserve: 100,

  oilPrice: 70,
  supply: 100,
  demand: 100,
  subsidy: 0,
  consumerCost: 50
};

/* -----------------------------
   MEMORY
------------------------------*/
let history = [];
let cascadeCount = 0;

/* -----------------------------
   CONSTANTS
------------------------------*/
const MAX_HISTORY = 200;
const DECAY_RATE = 0.92;

/* -----------------------------
   SCENARIOS
------------------------------*/
export const scenarios = {
  FX: { name: "FX Volatility Spike", impact: "Liquidity shock propagation" },
  DC: { name: "Data Centre Overload", impact: "Compute saturation pressure" },
  CYB: { name: "Cyber Disruption", impact: "Trust + FX destabilisation" },
  INF: { name: "Infrastructure Stress", impact: "Supply chain degradation" }
};

/* -----------------------------
   UTILITIES
------------------------------*/
function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function randomShock() {
  return (Math.random() * 2 - 1) * 2;
}

function economicGap() {
  return state.demand - state.supply;
}

/* -----------------------------
   SYSTEM VALIDATION
------------------------------*/
function isSystemType(type) {
  return ["FX", "DC", "CYB", "INF"].includes(type);
}

/* -----------------------------
   ENERGY INDEX
------------------------------*/
export function energyIndex() {
  return state.FX * 0.5 + state.INF * 0.3 + state.DC * 0.2;
}

/* -----------------------------
   CASCADE ENGINE
------------------------------*/
export function applyCascade(type) {
  switch (type) {
    case "FX":
      state.DC += 2;
      state.INF += 1;
      break;

    case "DC":
      state.INF += 2;
      state.CYB += 1;
      break;

    case "CYB":
      state.FX += 2;
      state.INF += 1;
      break;

    case "INF":
      state.FX += 2;
      state.DC += 1;
      break;
  }

  cascadeCount++;
}

/* -----------------------------
   OIL ENGINE
------------------------------*/
function updateOilPrice() {
  const stress =
    state.FX * 0.25 +
    state.INF * 0.35 +
    Math.abs(economicGap()) * 0.2;

  state.oilPrice = clamp(70 + stress + randomShock(), 40, 140);
}

/* -----------------------------
   BIODIESEL ENGINE
------------------------------*/
function updateBiodiesel(risk) {
  const pressure =
    state.FX * 0.2 +
    state.INF * 0.25 +
    Math.abs(economicGap()) * 0.15;

  const baseMap = {
    LOW: 35,
    MEDIUM: 42,
    HIGH: 50,
    CRITICAL: 58
  };

  state.biodiesel = clamp(
    baseMap[risk] + pressure * 0.15,
    35,
    70
  );

  if (risk === "HIGH") state.cpoReserve -= 2;
  if (risk === "CRITICAL") state.cpoReserve -= 5;
  if (risk === "LOW") state.cpoReserve += 1;

  state.cpoReserve = clamp(state.cpoReserve);
}

/* -----------------------------
   RISK ENGINE
------------------------------*/
export function riskLevel() {
  const total =
    state.FX * 1.0 +
    state.DC * 1.0 +
    state.CYB * 1.1 +
    state.INF * 1.0 +
    energyIndex() * 0.4 +
    Math.abs(economicGap()) * 0.8 +
    (100 - state.cpoReserve) * 0.4;

  if (total > 150) return "CRITICAL";
  if (total > 95) return "HIGH";
  if (total > 55) return "MEDIUM";
  return "LOW";
}

/* -----------------------------
   STABILISER (kept but controlled)
------------------------------*/
function stabilizeSystem() {
  const risk = riskLevel();

  const damping = {
    LOW: 0.98,
    MEDIUM: 0.95,
    HIGH: 0.92,
    CRITICAL: 0.88
  }[risk];

  state.FX *= damping;
  state.DC *= damping;
  state.CYB *= damping;
  state.INF *= damping;
}

/* -----------------------------
   DECAY SYSTEM
------------------------------*/
function applyDecay() {
  state.FX *= DECAY_RATE;
  state.DC *= DECAY_RATE;
  state.CYB *= DECAY_RATE;
  state.INF *= DECAY_RATE;
}

/* -----------------------------
   SOLUTIONS ENGINE
------------------------------*/
export function solutions(level) {
  const map = {
    CRITICAL: [
      "Emergency isolation protocol",
      "Auto load shedding",
      "System fragmentation mode"
    ],
    HIGH: [
      "Reserve activation",
      "Demand throttling",
      "Risk containment layer"
    ],
    MEDIUM: [
      "Monitoring reinforcement",
      "Soft balancing adjustments"
    ],
    LOW: ["Normal operations"]
  };

  return map[level];
}

/* -----------------------------
   MAIN ENGINE
------------------------------*/
export function inject(type) {
  if (isSystemType(type)) {
    state[type] = clamp(state[type] + 10);
    applyCascade(type);
  }

  if (type === "OIL_HIGH") state.oilPrice += 15;
  if (type === "OIL_LOW") state.oilPrice -= 15;

  const risk = riskLevel();

  updateOilPrice();
  updateBiodiesel(risk);

  // IMPORTANT FIX:
  // Do NOT immediately cancel injection visibility
  // stabilizeSystem();
  // applyDecay();

  history.push({
    type,
    risk,
    oilPrice: state.oilPrice,
    cpo: state.cpoReserve
  });

  if (history.length > MAX_HISTORY) history.shift();

  return {
    state: { ...state },
    risk,
    cascadeCount,
    scenario: scenarios[type] || { name: type }
  };
}

/* -----------------------------
   RESET
------------------------------*/
export function reset() {
  Object.assign(state, {
    FX: 0, DC: 0, CYB: 0, INF: 0,
    biodiesel: 35,
    cpoReserve: 100,
    oilPrice: 70,
    supply: 100,
    demand: 100,
    subsidy: 0,
    consumerCost: 50
  });

  history = [];
  cascadeCount = 0;
}