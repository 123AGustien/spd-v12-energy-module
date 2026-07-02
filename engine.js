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
}