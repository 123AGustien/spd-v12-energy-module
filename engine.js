 /* SPD v12 ENERGY MODULE v2 // ENGINE CORE (FIXED + BIODIESEL LAYER) */

export const state = {
FX: 0,
DC: 0,
CYB: 0,
INF: 0,

// 🟡 BIODIESEL LAYER
biodiesel: 35,
cpoReserve: 100
};

export let cascadeCount = 0;

/* -----------------------------
   SCENARIOS
------------------------------*/
export const scenarios = {
FX: { name: "FX Volatility Spike", impact: "Triggers DC liquidity stress" },
DC: { name: "Data Centre Overload", impact: "Amplifies INF strain" },
CYB:{ name: "Cyber Disruption", impact: "Reduces FX stability" },
INF:{ name: "Infrastructure Stress", impact: "Feeds FX loop" }
};

/* -----------------------------
   ENERGY MODEL
------------------------------*/
export function energyIndex() {
return state.FX * 0.6 + state.INF * 0.4;
}

/* -----------------------------
   BIODIESEL ENGINE (NEW LAYER)
------------------------------*/
export function updateBiodieselLevel(risk) {

switch(risk){

case "LOW":
state.biodiesel = 35;
state.cpoReserve += 1;
break;

case "MEDIUM":
state.biodiesel = 40;
break;

case "HIGH":
state.biodiesel = 50;
state.cpoReserve -= 2;
break;

case "CRITICAL":
state.biodiesel = 60;
state.cpoReserve -= 5;
break;
}
}

/* -----------------------------
   CASCADE ENGINE
------------------------------*/
export function applyCascade(type) {

switch(type){

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

switch(risk){
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

if(level === "CRITICAL") return [
"Emergency shutdown buffers",
"Auto load shedding",
"System isolation"
];

if(level === "HIGH") return [
"Activate reserves",
"Reduce dependency",
"Stabilise system"
];

if(level === "MEDIUM") return [
"Monitor volatility",
"Minor balancing"
];

return ["Normal operations"];
}

/* -----------------------------
   MAIN ACTION (FIXED + BIO HOOK)
------------------------------*/
export function inject(type) {

state[type] += 10;
applyCascade(type);

const risk = riskLevel();

// 🟡 NEW: update energy mix
updateBiodieselLevel(risk);

return {
state: { ...state },
risk,
policy: policyState(risk),
energy: energyIndex(),
cascadeCount,
scenario: scenarios[type]
};
}

/* -----------------------------
   RESET
------------------------------*/
export function reset() {
state.FX = 0;
state.DC = 0;
state.CYB = 0;
state.INF = 0;

// reset biodiesel layer
state.biodiesel = 35;
state.cpoReserve = 100;

cascadeCount = 0;
}