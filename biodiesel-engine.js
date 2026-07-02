/* SPD v12 ENERGY MODULE v2 // BIODIESEL SIMULATION LAYER */

import { state } from "./engine.js";

/* -----------------------------
   BIODIESEL STATE LAYER
------------------------------*/
export const biodieselState = {
blendRatio: 35,        // B35 baseline
cpoStock: 100,         // Crude Palm Oil reserve index
importDependency: 60,  // fuel import dependency %
stability: "NORMAL"
};

/* -----------------------------
   BIODIESEL RESPONSE ENGINE
------------------------------*/
export function updateBiodieselLayer(risk) {

switch (risk) {

case "CRITICAL":
biodieselState.blendRatio = 55;
biodieselState.importDependency = Math.max(0, biodieselState.importDependency - 20);
biodieselState.cpoStock = Math.max(0, biodieselState.cpoStock - 15);
biodieselState.stability = "EMERGENCY";
break;

case "HIGH":
biodieselState.blendRatio = 50;
biodieselState.importDependency = Math.max(0, biodieselState.importDependency - 10);
biodieselState.cpoStock = Math.max(0, biodieselState.cpoStock - 8);
biodieselState.stability = "STRESSED";
break;

case "MEDIUM":
biodieselState.blendRatio = 40;
biodieselState.stability = "WATCH";
break;

default:
biodieselState.blendRatio = 35;
biodieselState.stability = "NORMAL";
break;
}

return biodieselState;
}

/* -----------------------------
   BIODIESEL ENERGY IMPACT SCORE
------------------------------*/
export function biodieselImpactIndex() {

const fxPressure = state.FX * 0.3;
const infraPressure = state.INF * 0.4;
const cpoPressure = (100 - biodieselState.cpoStock) * 0.3;

return fxPressure + infraPressure + cpoPressure;
}

/* -----------------------------
   EXPORT FOR INTEGRATION
------------------------------*/
export default {
biodieselState,
updateBiodieselLayer,
biodieselImpactIndex
};