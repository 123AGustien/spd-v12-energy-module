/* SPD v12 ENERGY MODULE v2 // ENGINE CORE */

export const state = {
FX: 0,
DC: 0,
CYB: 0,
INF: 0
};

export let cascadeCount = 0;

/* -----------------------------
   SCENARIO DEFINITIONS
------------------------------*/
export const scenarios = {
FX: {
name: "FX Volatility Spike",
impact: "Triggers DC liquidity stress"
},
DC: {
name: "Data Centre Overload",
impact: "Amplifies INF strain"
},
CYB: {
name: "Cyber Disruption",
impact: "Reduces systemic trust and FX stability"
},
INF: {
name: "Infrastructure Stress",
impact: "Feeds FX instability loop"
}
};

/* -----------------------------
   ENERGY MODEL (FX + INF coupling)
------------------------------*/
export function energyIndex() {
let oilShock = state.FX * 0.6;
let cpoStress = state.INF * 0.4;
return oilShock + cpoStress;
}

/* -----------------------------
   CASCADE ENGINE (NON-LINEAR SYSTEM)
------------------------------*/
export function applyCascade(type) {

if (type === "FX") {
state.DC += 3;
state.INF += 2;
}

if (type === "DC") {
state.INF += 3;
state.CYB += 1;
}

if (type === "CYB") {
state.FX += 2;
state.INF += 1;
}

if (type === "INF") {
state.FX += 3;
state.DC += 1;
}

cascadeCount++;
}

/* -----------------------------
   RISK ENGINE (SYSTEMIC SCORING)
------------------------------*/
export function riskLevel() {

let total =
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
   POLICY ENGINE (DECISION STATES)
------------------------------*/
export function policyState(risk) {

if (risk === "CRITICAL") return "FULL_OVERRIDE";
if (risk === "HIGH") return "CRISIS_MODE";
if (risk === "MEDIUM") return "ENERGY_SECURITY";
return "COST_OPTIMISATION";
}

/* -----------------------------
   SOLUTION ENGINE
------------------------------*/
export function solutions(level) {

if (level === "CRITICAL") {
return [
"Emergency shutdown buffers",
"Auto load shedding activated",
"System isolation engaged"
];
}

if (level === "HIGH") {
return [
"Activate strategic reserves",
"Reduce external dependency",
"Stabilisation protocols engaged"
];
}

if (level === "MEDIUM") {
return [
"Monitoring intensified",
"Minor balancing active"
];
}

return ["Normal operations maintained"];
}

/* -----------------------------
   ACTION: inject stress event
------------------------------*/
export function inject(stateRef, type) {

stateRef[type] += 10;
applyCascade(type);

return {
risk: riskLevel(),
policy: policyState(riskLevel()),
energy: energyIndex(),
cascadeCount
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
cascadeCount = 0;
}