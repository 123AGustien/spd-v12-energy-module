/* SPD v12 BIODIESEL LAYER (SAFE VERSION) */

export const biodieselState = {
  blendRatio: 35,
  cpoStock: 100,
  importDependency: 60,
  stability: "NORMAL"
};

/* -----------------------------
   UPDATE ENGINE
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
   IMPACT INDEX (NO DEPENDENCY ON ENGINE.JS)
------------------------------*/
export function biodieselImpactIndex(state) {

  const fxPressure = state.FX * 0.3;
  const infraPressure = state.INF * 0.4;
  const cpoPressure = (100 - biodieselState.cpoStock) * 0.3;

  const score = fxPressure + infraPressure + cpoPressure;

  return Math.min(100, Math.max(0, score));
}