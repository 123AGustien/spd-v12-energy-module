/* =============================
   SPD v12 // INTELLIGENCE ENGINE v2.1 (FULL CLEAN BUILD)
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
   ACCESSORS
------------------------------*/
export function getCascadeCount() {
  return cascadeCount;
}

export function getHistory() {
  return history;
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
   UTILITIES
------------------------------*/
function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function economicGap() {
  return state.demand - state.supply;
}

/* -----------------------------
   ENERGY INDEX
------------------------------*/
export function energyIndex() {
  return state.FX * 0.6 + state.INF * 0.4;
}

/* -----------------------------
   OIL PRICE ENGINE
------------------------------*/
function updateOilPrice() {
  const stress =
    state.FX * 0.3 +
    state.INF * 0.4 +
    economicGap() * 0.2;

  state.oilPrice = clamp(70 + stress, 40, 140);
}

/* -----------------------------
   BIODIESEL ENGINE
------------------------------*/
function updateBiodiesel(risk) {

  const pressure =
    state.FX * 0.2 +
    state.INF * 0.3 +
    Math.abs(economicGap()) * 0.2;

  if (risk === "LOW") {
    state.biodiesel = 35;
    state.cpoReserve = clamp(state.cpoReserve + 1, 0, 100);
  }

  if (risk === "MEDIUM") {
    state.biodiesel = 40 + pressure * 0.1;
  }

  if (risk === "HIGH") {
    state.biodiesel = 50 + pressure * 0.2;
    state.cpoReserve = clamp(state.cpoReserve - 2, 0, 100);
  }

  if (risk === "CRITICAL") {
    state.biodiesel = 55 + pressure * 0.3;
    state.cpoReserve = clamp(state.cpoReserve - 5, 0, 100);
  }

  state.biodiesel = clamp(state.biodiesel, 35, 70);
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
    energyIndex() * 0.6 +
    Math.abs(economicGap()) * 1.2 +
    (100 - state.cpoReserve) * 0.5;

  if (total > 140) return "CRITICAL";
  if (total > 90) return "HIGH";
  if (total > 50) return "MEDIUM";
  return "LOW";
}

/* -----------------------------
   SOLUTIONS
------------------------------*/
export function solutions(level) {

  if (level === "CRITICAL") {
    return [
      "Emergency shutdown buffers",
      "Auto load shedding",
      "System isolation"
    ];
  }

  if (level === "HIGH") {
    return [
      "Activate reserves",
      "Reduce dependency",
      "Stabilise system"
    ];
  }

  if (level === "MEDIUM") {
    return [
      "Monitor volatility",
      "Minor corrections"
    ];
  }

  return ["Normal operations"];
}

/* -----------------------------
   MAIN INJECT ENGINE (FULL ROUTER)
------------------------------*/
export function inject(type) {

  /* ---------------- MARKET COMMANDS ---------------- */

  if (type === "OIL_HIGH") {
    state.oilPrice = clamp(state.oilPrice + 20, 40, 140);
  }

  if (type === "OIL_LOW") {
    state.oilPrice = clamp(state.oilPrice - 20, 40, 140);
  }

  if (type === "BIODIESEL_SHORT") {
    state.cpoReserve = clamp(state.cpoReserve - 15, 0, 100);
    state.biodiesel = clamp(state.biodiesel - 10, 35, 70);
  }

  /* ---------------- SYSTEM COMMANDS ---------------- */

  if (state[type] !== undefined) {
    state[type] += 10;
    applyCascade(type);
  }

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
    scenario: scenarios[type] || { name: type }
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

  state.oilPrice = 70;
  state.supply = 100;
  state.demand = 100;

  cascadeCount = 0;
  history = [];
}