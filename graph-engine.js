/* SPD v12 // GRAPH ENGINE (CASCADE VISUAL NETWORK) */

/* -----------------------------
   NODE SYSTEM
------------------------------*/
export const nodes = {
FX: { id: "FX", label: "FX STRESS", value: 0 },
DC: { id: "DC", label: "DATA CENTRE", value: 0 },
CYB:{ id: "CYB", label: "CYBER", value: 0 },
INF:{ id: "INF", label: "INFRASTRUCTURE", value: 0 }
};

/* -----------------------------
   EDGE MAP (CASCADE LINKS)
------------------------------*/
export const edges = [
{ from: "FX", to: "DC", weight: 0.6 },
{ from: "FX", to: "INF", weight: 0.4 },

{ from: "DC", to: "INF", weight: 0.7 },
{ from: "DC", to: "CYB", weight: 0.3 },

{ from: "CYB", to: "FX", weight: 0.5 },
{ from: "CYB", to: "INF", weight: 0.2 },

{ from: "INF", to: "FX", weight: 0.6 },
{ from: "INF", to: "DC", weight: 0.3 }
];

/* -----------------------------
   APPLY STRESS TO NODE
------------------------------*/
export function injectNode(type, intensity = 10) {
nodes[type].value += intensity;
propagate(type, intensity);
}

/* -----------------------------
   CASCADE PROPAGATION ENGINE
------------------------------*/
export function propagate(source, intensity) {

edges
.filter(e => e.from === source)
.forEach(e => {
const impact = intensity * e.weight;

nodes[e.to].value += impact;

/* recursive weak propagation (prevents infinite loops) */
if (impact > 5) {
edges
.filter(x => x.from === e.to)
.forEach(next => {
nodes[next.to].value += impact * 0.3;
});
}
});
}

/* -----------------------------
   RISK FIELD CALCULATION
------------------------------*/
export function computeRiskField() {

let total =
nodes.FX.value +
nodes.DC.value +
nodes.CYB.value +
nodes.INF.value;

if (total > 120) return "CRITICAL";
if (total > 70) return "HIGH";
if (total > 35) return "MEDIUM";
return "LOW";
}

/* -----------------------------
   ENERGY COUPLING FIELD
------------------------------*/
export function energyField() {

return {
oilPressure: nodes.FX.value * 0.5,
infrastructureLoad: nodes.INF.value * 0.7,
cyberInstability: nodes.CYB.value * 0.6
};
}

/* -----------------------------
   GRAPH SNAPSHOT (FOR UI RENDERING)
------------------------------*/
export function getGraphState() {

return {
nodes,
edges,
risk: computeRiskField(),
energy: energyField()
};
}

/* -----------------------------
   RESET GRAPH
------------------------------*/
export function resetGraph() {

Object.keys(nodes).forEach(k => {
nodes[k].value = 0;
});
}