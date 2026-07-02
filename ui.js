import {
  state,
  scenarios,
  inject,
  riskLevel,
  policyState,
  solutions,
  energyIndex,
  cascadeCount
} from "./engine.js";

import {
  biodieselState,
  biodieselImpactIndex,
  updateBiodieselLayer
} from "./biodiesel-engine.js";

/* -----------------------------
   SAFE DOM ACCESS
------------------------------*/
const el = {
  FX: document.getElementById("FX"),
  DC: document.getElementById("DC"),
  CYB: document.getElementById("CYB"),
  INF: document.getElementById("INF"),

  scenarioPanel: document.getElementById("scenarioPanel"),
  riskPanel: document.getElementById("riskPanel"),
  solutionPanel: document.getElementById("solutionPanel"),
  actionPanel: document.getElementById("actionPanel"),

  blend: document.getElementById("blend"),
  cpo: document.getElementById("cpo"),
  imp: document.getElementById("imp"),
  stab: document.getElementById("stab")
};

/* -----------------------------
   CORE RENDER
------------------------------*/
function render() {

  if (el.FX) el.FX.innerText = state.FX;
  if (el.DC) el.DC.innerText = state.DC;
  if (el.CYB) el.CYB.innerText = state.CYB;
  if (el.INF) el.INF.innerText = state.INF;

  if (el.blend) el.blend.innerText = biodieselState.blendRatio;
  if (el.cpo) el.cpo.innerText = biodieselState.cpoStock;
  if (el.imp) el.imp.innerText = biodieselState.importDependency;
  if (el.stab) el.stab.innerText = biodieselState.stability;

  renderPanels();
}

/* -----------------------------
   PANEL ENGINE
------------------------------*/
function renderPanels(type = "FX") {

  const risk = riskLevel();

  const scenario = scenarios?.[type] || {
    name: "UNKNOWN SCENARIO",
    impact: "No data available"
  };

  if (el.scenarioPanel) {
    el.scenarioPanel.innerHTML =
      "<h3>SCENARIO PANEL</h3>" +
      scenario.name + "<br>" +
      scenario.impact;
  }

  if (el.riskPanel) {
    el.riskPanel.innerHTML =
      "<h3>RISK PANEL</h3>" +
      "Risk: " + risk;
  }

  if (el.solutionPanel) {

    const list = typeof solutions === "function"
      ? solutions(risk)
      : [];

    el.solutionPanel.innerHTML =
      "<h3>SOLUTION PANEL</h3>" +
      (list.length ? list.map(x => "• " + x).join("<br>") : "- No solutions");
  }

  if (el.actionPanel) {
    el.actionPanel.innerHTML =
      "<h3>ACTION SEQUENCE</h3>" +
      "1. Detect input<br>" +
      "2. Cascade (" + cascadeCount + ")<br>" +
      "3. Apply mitigation<br>" +
      "4. Stabilize system";
  }
}

/* -----------------------------
   GLOBAL TRIGGER (FIXED)
------------------------------*/
window.trigger = function(type) {

  const result = inject(type);   // ✅ FIXED

  if (result?.risk) {
    updateBiodieselLayer(result.risk);
  }

  renderPanels(type);
  render();

  return result;
};

/* -----------------------------
   AUTO LOOP
------------------------------*/
setInterval(render, 500);
render();