/* SPD v12 ENERGY MODULE v2 // BIODIESEL ENGINE LAYER */

import { state } from "./engine.js";

/* -----------------------------
   BIODIESEL STATE LAYER
------------------------------*/
export const biodieselState = {
  blendRatio: 35,        // Base B35
  cpoStock: 100,         // Palm oil reserve index
  importDependency: 60,  // Fuel import dependency %
  stability: "NORMAL"
};

/* -----------------------------
   BIODIESEL RESPONSE ENGINE
------------------------------*/
export function updateBiodieselLayer(risk) {

  // internal pressure signal from system state
  const pressure = (state.FX * 0.2 + state.INF * 0.3);

  switch (risk) {

    case "LOW":
      biodieselState.blendRatio = 35;
      biodieselState.cpoStock = Math.min(100, biodieselState.cpoStock + 1);
      biodieselState.importDependency = 60;
      biodieselState.stability = "NORMAL";
      break;

    case "MEDIUM":
      biodieselState.blendRatio = 40 + Math.min(2, pressure);
      biodieselState.stability = "WATCH";
      break;

    case "HIGH":
      biodieselState.blendRatio = 50 + Math.min(3, pressure);
      biodieselState.cpoStock = Math.max(0, biodieselState.cpoStock - 2);
      biodieselState.importDependency = Math.max(0, biodieselState.importDependency - 10);
      biodieselState.stability = "STRESSED";
      break;

    case "CRITICAL":
      biodieselState.blendRatio = 55 + Math.min(5, pressure);
      biodieselState.cpoStock = Math.max(0, biodieselState.cpoStock - 5);
      biodieselState.importDependency = Math.max(0, biodieselState.importDependency - 20);
      biodieselState.stability = "EMERGENCY";
      break;

    default:
      biodieselState.blendRatio = 35;
      biodieselState.stability = "NORMAL";
  }

  // safety bounds
  biodieselState.blendRatio = Math.min(65, Math.max(35, biodieselState.blendRatio));

  return biodieselState;
}

/* -----------------------------
   BIODIESEL IMPACT INDEX
------------------------------*/
export function biodieselImpactIndex() {

  const fxPressure = state.FX * 0.3;
  const infraPressure = state.INF * 0.4;
  const cpoPressure = (100 - biodieselState.cpoStock) * 0.3;

  return fxPressure + infraPressure + cpoPressure;
}

/* -----------------------------
   EXPORT MODULE
------------------------------*/
export default {
  biodieselState,
  updateBiodieselLayer,
  biodieselImpactIndex
};