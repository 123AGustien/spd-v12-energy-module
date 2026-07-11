/* SPD v12 BIODIESEL ENGINE v3
   SINGLE SOURCE OF TRUTH LAYER
   + METHANOL RESILIENCE DEPENDENCY
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
   METHANOL INTERNAL LAYER
   Critical biodiesel input
------------------------------*/
export const methanolState = {
  supply: 100,
  storage: 100,
  importDependency: 80,
  price: "NORMAL",
  status: "NORMAL"
};


/* -----------------------------
   INTERNAL CALC ENGINE
------------------------------*/
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}


/* -----------------------------
   METHANOL EVENTS
------------------------------*/

export function triggerMethanolShortage(){

  methanolState.supply =
    clamp(methanolState.supply - 50, 0, 100);

  methanolState.storage =
    clamp(methanolState.storage - 30, 0, 100);

  methanolState.status = "CONSTRAINED";

}


export function triggerMethanolPriceSpike(){

  methanolState.price = "HIGH";

}


export function restoreMethanol(){

  methanolState.supply = 100;
  methanolState.storage = 100;
  methanolState.price = "NORMAL";
  methanolState.status = "NORMAL";

}


/* -----------------------------
   MAIN UPDATE FUNCTION
   (called by UI after inject)
------------------------------*/
export function updateBiodieselLayer(risk) {

  // pressure derived from system stress
  const pressure =
    (state.FX * 0.25 + state.INF * 0.35);


  // Methanol penalty
  let methanolPressure = 0;

  if (methanolState.supply < 50) {
    methanolPressure += 10;
    methanolState.status = "CONSTRAINED";
  }

  if (methanolState.price === "HIGH") {
    methanolPressure += 5;
  }


  switch (risk) {

    case "LOW":

      biodieselState.blendRatio = 35;

      biodieselState.cpoStock =
        clamp(biodieselState.cpoStock + 1, 0, 100);

      biodieselState.importDependency = 60;

      biodieselState.stability =
        methanolPressure > 0
        ? "WATCH"
        : "NORMAL";

      break;


    case "MEDIUM":

      biodieselState.blendRatio =
        40 + Math.min(2, pressure)
        + methanolPressure;

      biodieselState.importDependency =
        62 + Math.min(3, pressure);

      biodieselState.stability = "STABLE";

      break;


    case "HIGH":

      biodieselState.blendRatio =
        50 + Math.min(4, pressure)
        + methanolPressure;

      biodieselState.importDependency =
        68 + Math.min(5, pressure);

      biodieselState.cpoStock =
        clamp(biodieselState.cpoStock - 2, 0, 100);

      biodieselState.stability =
        methanolPressure > 0
        ? "METHANOL STRESS"
        : "STRESSED";

      break;


    case "CRITICAL":

      biodieselState.blendRatio =
        55 + Math.min(6, pressure)
        + methanolPressure;

      biodieselState.importDependency =
        75 + Math.min(8, pressure);

      biodieselState.cpoStock =
        clamp(biodieselState.cpoStock - 5, 0, 100);

      biodieselState.stability =
        "CRITICAL";

      break;
  }


  // final safety bounds
  biodieselState.blendRatio =
    clamp(biodieselState.blendRatio, 35, 65);

  biodieselState.importDependency =
    clamp(biodieselState.importDependency, 0, 100);

}