import { state } from "./engine.js";

/* -----------------------------
   BIODIESEL STATE LAYER
------------------------------*/
export const biodieselState = {
  blendRatio: 35,
  cpoStock: 100,
  importDependency: 60,
  stability: "NORMAL"
};

/* -----------------------------
   INTERNAL BUFFER CALC
------------------------------*/
function calcPressure() {
  return (state.FX * 0.25 + state.INF * 0.35);
}

/* -----------------------------
   BIODIESEL RESPONSE ENGINE v3
------------------------------*/
export function updateBiodieselLayer(risk) {

  const pressure = calcPressure();

  // buffer response (small automatic stabilization)
  const buffer = pressure * 0.4;

  switch (risk) {

    case "LOW":
      biodieselState.blendRatio = 35 + buffer * 0.2;
      biodieselState.cpoStock = Math.min(100, biodieselState.cpoStock + 1);
      biodieselState.importDependency = 60;
      biodieselState.stability = "NORMAL";
      break;

    case "MEDIUM":
      biodieselState.blendRatio = 38 + buffer * 0.6;
      biodieselState.cpoStock = Math.max(0, biodieselState.cpoStock - 1);
      biodieselState.importDependency = 60 + buffer * 0.3;
      biodieselState.stability = "WATCH";
      break;

    case "HIGH":
      biodieselState.blendRatio = 45 + buffer;
      biodieselState.cpoStock = Math.max(0, biodieselState.cpoStock - 2);
      biodieselState.importDependency = 65 + buffer * 0.5;
      biodieselState.stability = "STRESSED";
      break;

    case "CRITICAL":
      biodieselState.blendRatio = 50 + buffer * 1.2;
      biodieselState.cpoStock = Math.max(0, biodieselState.cpoStock - 5);
      biodieselState.importDependency = 70 + buffer;
      biodieselState.stability = "EMERGENCY";
      break;

    default:
      biodieselState.blendRatio = 35;
      biodieselState.stability = "NORMAL";
  }

  /* -----------------------------
     SAFETY BOUNDS (FIXED)
  ------------------------------*/
  biodieselState.blendRatio = Math.min(85, Math.max(30, biodieselState.blendRatio));
  biodieselState.importDependency = Math.min(100, Math.max(40, biodieselState.importDependency));
  biodieselState.cpoStock = Math.min(100, Math.max(0, biodieselState.cpoStock));

  return biodieselState;
}

/* -----------------------------
   BIODIESEL IMPACT INDEX v2
------------------------------*/
export function biodieselImpactIndex() {

  const fxPressure = state.FX * 0.3;
  const infraPressure = state.INF * 0.4;
  const cpoPressure = (100 - biodieselState.cpoStock) * 0.3;
  const importPressure = biodieselState.importDependency * 0.2;

  return fxPressure + infraPressure + cpoPressure + importPressure;
}

/* -----------------------------
   EXPORT MODULE
------------------------------*/
export default {
  biodieselState,
  updateBiodieselLayer,
  biodieselImpactIndex
};