export const state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0,

  biodiesel: 35,
  cpoReserve: 100
};

/* -----------------------------
   CASCADE COUNTER (SAFE)
------------------------------*/
let cascadeCount = 0;

export function getCascadeCount() {
  return cascadeCount;
}

/* -----------------------------
   SCENARIOS
------------------------------*/
export const scenarios = {
  FX: {
    name: "FX Volatility Spike",
    description: "Currency instability propagates into liquidity stress layers.",
    impact: "Triggers DC liquidity stress"
  },
  DC: {
    name: "Data Centre Overload",
    description: "Compute infrastructure saturation under load pressure.",
    impact: "Amplifies INF strain"
  },
  CYB: {
    name: "Cyber Disruption",
    description: "Security degradation reduces FX stability and trust layers.",
    impact: "Reduces FX stability"
  },
  INF: {
    name: "Infrastructure Stress",
    description: "Physical infrastructure degradation feeds FX volatility loop.",
    impact: "Feeds FX loop"
  }
};

/* -----------------------------
   UTIL
------------------------------*/
function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

/* -----------------------------
   ENERGY MODEL
------------------------------*/
export function energyIndex() {
  return state.FX * 0.6 + state.INF * 0.4;
}

/* -----------------------------
   BIODIESEL ENGINE
------------------------------*/
export function updateBiodieselLevel(risk) {

  const pressure = state.FX * 0.2 + state.INF * 0.3;

  switch (risk) {

    case "LOW":
      state.biodiesel = 35;
      state.cpoReserve = clamp(state.cpoReserve + 1);
      break;

    case "MEDIUM":
      state.biodiesel = 40 + Math.min(2, pressure);
      break;

    case "HIGH":
      state.biodiesel = 50 + Math.min(3, pressure);
      state.cpoReserve = clamp(state.cpoReserve - 2);
      break;

    case "CRITICAL":
      state.biodiesel = 55 + Math.min(5, pressure);
      state.cpoReserve = clamp(state.cpoReserve - 5);
      break;
  }

  state.biodiesel = clamp(state.biodiesel, 35, 65);
}

/* -----------------------------
   CASCADE ENGINE
------------------------------*/
export function applyCascade(type) {

  switch (type) {

    case "FX":
      state.DC += 3;
      state.INF += 2;
      break;

    case "DC":
      state.INF += 3;
      state.CYB += 1;
      break;

    case "CYB":
      state.FX += 2;
      state.INF += 1;
      break;

    case "INF":
      state.FX += 3;
      state.DC += 1;
      break;
  }

  cascadeCount++;
}

/* -----------------------------
   RISK ENGINE
------------------------------*/
export function riskLevel() {

  const total =
    state.FX * 1.2 +
    state.DC * 1.1 +
    state.CYB * 1.4 +
    state.INF * 1.3 +
    energyIndex() * 0.8;

  if (total > 120) return "CRITICAL";
  if (total > 70) return "HIGH";
  if (total > 35) return "MEDIUM";
  return "LOW";
}

/* -----------------------------
   POLICY ENGINE
------------------------------*/
export function policyState(risk) {
  switch (risk) {
    case "CRITICAL": return "FULL_OVERRIDE";
    case "HIGH": return "CRISIS_MODE";
    case "MEDIUM": return "ENERGY_SECURITY";
    default: return "COST_OPTIMISATION";
  }
}

/* -----------------------------
   SOLUTION ENGINE
------------------------------*/
export function solutions(level) {

  if (level === "CRITICAL") return [
    "Emergency shutdown buffers",
    "Auto load shedding",
    "System isolation"
  ];

  if (level === "HIGH") return [
    "Activate reserves",
    "Reduce dependency",
    "Stabilise system"
  ];

  if (level === "MEDIUM") return [
    "Monitor volatility",
    "Minor balancing actions"
  ];

  return ["Normal operations"];
}

/* -----------------------------
   MAIN ENGINE
------------------------------*/
export function inject(type) {

  state[type] += 10;

  applyCascade(type);

  const risk = riskLevel();

  updateBiodieselLevel(risk);

  return {
    state: { ...state },
    risk,
    policy: policyState(risk),
    energy: energyIndex(),
    cascade: cascadeCount,
    scenario: scenarios[type]
  };
}

/* -----------------------------
   RESET ENGINE
------------------------------*/
export function reset() {

  state.FX = 0;
  state.DC = 0;
  state.CYB = 0;
  state.INF = 0;

  state.biodiesel = 35;
  state.cpoReserve = 100;

  cascadeCount = 0;

/* =============================
   SPD v12 // INTELLIGENCE LAYER v2.1
============================= */

export const state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0,

  biodiesel: 35,
  cpoReserve: 100,

  // NEW ECONOMIC LAYER
  oilPrice: 70,        // baseline index
  supply: 100,
  demand: 100,
  subsidy: 0,
  consumerCost: 50
};

/* -----------------------------
   MEMORY (TREND TRACKING)
------------------------------*/
let history = [];

export function getHistory() {
  return history;
}

/* -----------------------------
   CASCADE COUNTER
------------------------------*/
let cascadeCount = 0;
export function getCascadeCount() {
  return cascadeCount;
}

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
   CORE INDEXES
------------------------------*/
export function energyIndex() {
  return state.FX * 0.6 + state.INF * 0.4;
}

/* -----------------------------
   ECONOMIC IMBALANCE ENGINE
------------------------------*/
function economicGap() {
  return state.demand - state.supply;
}

/* -----------------------------
   OIL PRICE ENGINE (DYNAMIC)
------------------------------*/
function updateOilPrice() {

  const stress =
    state.FX * 0.3 +
    state.INF * 0.4 +
    economicGap() * 0.2;

  state.oilPrice = Math.max(
    40,
    Math.min(140, 70 + stress)
  );
}

/* -----------------------------
   BIODIESEL PRESSURE ENGINE
------------------------------*/
function updateBiodiesel(risk) {

  const pressure =
    state.FX * 0.2 +
    state.INF * 0.3 +
    Math.abs(economicGap()) * 0.2;

  if (risk === "LOW") {
    state.biodiesel = 35;
    state.cpoReserve = Math.min(100, state.cpoReserve + 1);
  }

  if (risk === "MEDIUM") {
    state.biodiesel = 40 + pressure * 0.1;
  }

  if (risk === "HIGH") {
    state.biodiesel = 50 + pressure * 0.2;
    state.cpoReserve = Math.max(0, state.cpoReserve - 2);
  }

  if (risk === "CRITICAL") {
    state.biodiesel = 55 + pressure * 0.3;
    state.cpoReserve = Math.max(0, state.cpoReserve - 5);
  }

  state.biodiesel = Math.max(35, Math.min(70, state.biodiesel));
}

/* -----------------------------
   RISK ENGINE (ENHANCED)
------------------------------*/
export function riskLevel() {

  const total =
    state.FX * 1.2 +
    state.DC * 1.1 +
    state.CYB * 1.4 +
    state.INF * 1.3 +
    energyIndex() * 0.6 +
    Math.abs(economicGap()) * 1.2 +
    (100 - state.cpoReserve) * 0.5;

  if (total > 140) return "CRITICAL";
  if (total > 90) return "HIGH";
  if (total > 50) return "MEDIUM";
  return "LOW";
}

/* -----------------------------
   CASCADE ENGINE
------------------------------*/
export function applyCascade(type) {

  switch (type) {
    case "FX":
      state.DC += 3;
      state.INF += 2;
      break;

    case "DC":
      state.INF += 3;
      state.CYB += 1;
      break;

    case "CYB":
      state.FX += 2;
      state.INF += 1;
      break;

    case "INF":
      state.FX += 3;
      state.DC += 1;
      break;
  }

  cascadeCount++;
}

/* -----------------------------
   DECISION ENGINE v2.1
------------------------------*/
export function decisionEngine() {

  const risk = riskLevel();
  const gap = economicGap();

  updateOilPrice();

  const signal = {
    risk,
    oilPrice: state.oilPrice,
    gap,
    biodiesel: state.biodiesel,
    cpo: state.cpoReserve
  };

  let verdict = "";
  let reason = [];
  let action = [];

  // --- RISK LOGIC ---
  if (risk === "CRITICAL") {
    verdict = "SYSTEM CRITICAL";

    reason.push("Multi-layer cascade active");
    reason.push("CPO depletion pressure high");
    reason.push("Economic instability amplified");

    action.push("Emergency stabilization protocol");
    action.push("Activate reserves");
    action.push("Force load shedding");
  }

  else if (risk === "HIGH") {
    verdict = "HIGH SYSTEM STRESS";

    reason.push("FX + INF cascade active");
    reason.push("Oil price volatility detected");
    reason.push("Supply-demand imbalance growing");

    action.push("Reduce system load");
    action.push("Increase subsidy support");
    action.push("Stabilise biodiesel blending");
  }

  else if (risk === "MEDIUM") {
    verdict = "MODERATE PRESSURE";

    reason.push("Partial imbalance in energy layers");
    reason.push("Oil price drifting upward");

    action.push("Monitor system drift");
    action.push("Minor corrections");
  }

  else {
    verdict = "STABLE SYSTEM";

    reason.push("All indicators within range");

    action.push("Normal operations");
  }

  return {
    verdict,
    reason,
    action,
    signal
  };
}

/* -----------------------------
   MAIN INJECT
------------------------------*/
export function inject(type) {

  state[type] += 10;

  applyCascade(type);

  const risk = riskLevel();

  updateOilPrice();
  updateBiodiesel(risk);

  history.push({
    type,
    risk,
    oilPrice: state.oilPrice,
    cpo: state.cpoReserve
  });

  return {
    state: { ...state },
    risk,
    cascadeCount,
    scenario: scenarios[type]
  };
}

}