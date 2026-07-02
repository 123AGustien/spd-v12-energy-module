/* SPD v12 BIODIESEL ENGINE v2
   SINGLE SOURCE OF TRUTH LAYER
*/

import { state } from "./engine.js";

/* -----------------------------
   BIODIESEL UI STATE MIRROR
------------------------------*/
export const biodieselState = {
  blendRatio: 35,
  cpoStock: 100,
  importDependency: 60,
  stability: "NORMAL"
};

/* -----------------------------
   INTERNAL CALC ENGINE
------------------------------*/
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/* -----------------------------
   MAIN UPDATE FUNCTION
   (called by UI after inject)
------------------------------*/
export function updateBiodieselLayer(risk) {

  // pressure derived from system stress
  const pressure = (state.FX * 0.25 + state.INF * 0.35);

  switch (risk) {

    case "LOW":
      biodieselState.blendRatio = 35;
      biodieselState.cpoStock = clamp(biodieselState.cpoStock + 1, 0, 100);
      biodieselState.importDependency = 60;
      biodieselState.stability = "NORMAL";
      break;

    case "MEDIUM":
      biodieselState.blendRatio = 40 + Math.min(2, pressure);
      biodieselState.importDependency = 62 + Math.min(3, pressure);
      biodieselState.stability = "STABLE";
      break;

    case "HIGH":
      biodieselState.blendRatio = 50 + Math.min(4, pressure);
      biodieselState.importDependency = 68 + Math.min(5, pressure);
      biodieselState.cpoStock = clamp(biodieselState.cpoStock - 2, 0, 100);
      biodieselState.stability = "STRESSED";
      break;

    case "CRITICAL":
      biodieselState.blendRatio = 55 + Math.min(6, pressure);
      biodieselState.importDependency = 75 + Math.min(8, pressure);
      biodieselState.cpoStock = clamp(biodieselState.cpoStock - 5, 0, 100);
      biodieselState.stability = "CRITICAL";
      break;
  }

  // final safety bounds
  biodieselState.blendRatio = clamp(biodieselState.blendRatio, 35, 65);
  biodieselState.importDependency = clamp(biodieselState.importDependency, 0, 100);
}