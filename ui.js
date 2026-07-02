import {
  state,
  scenarios,
  inject,
  riskLevel,
  solutions,
  cascadeCount
} from "./engine.js";

import {
  biodieselState,
  updateBiodieselLayer
} from "./biodiesel-engine.js";

window.addEventListener("DOMContentLoaded", () => {

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

  let activeScenario = "FX";

  function renderAll() {

    // CORE STATE
    if (el.FX) el.FX.innerText = state.FX;
    if (el.DC) el.DC.innerText = state.DC;
    if (el.CYB) el.CYB.innerText = state.CYB;
    if (el.INF) el.INF.innerText = state.INF;

    // BIODIESEL LAYER
    if (el.blend) el.blend.innerText = biodieselState.blendRatio;
    if (el.cpo) el.cpo.innerText = biodieselState.cpoStock;
    if (el.imp) el.imp.innerText = biodieselState.importDependency;
    if (el.stab) el.stab.innerText = biodieselState.stability;

    renderPanels();
  }

  function renderPanels() {

    const risk = riskLevel();

    const scenario = scenarios?.[activeScenario] || {
      name: "NO SCENARIO",
      description: "Awaiting input"
    };

    const list = Array.isArray(solutions?.(risk))
      ? solutions(risk)
      : [];

    if (el.scenarioPanel) {
      el.scenarioPanel.innerHTML =
        "<h3>SCENARIO PANEL</h3>" +
        scenario.name + "<br>" +
        (scenario.description || scenario.impact || "No description");
    }

    if (el.riskPanel) {
      el.riskPanel.innerHTML =
        "<h3>RISK PANEL</h3>Risk: " + risk;
    }

    if (el.solutionPanel) {
      el.solutionPanel.innerHTML =
        "<h3>SOLUTION PANEL</h3>" +
        (list.length ? list.map(x => "• " + x).join("<br>") : "No solutions");
    }

    if (el.actionPanel) {
      el.actionPanel.innerHTML =
        "<h3>ACTION SEQUENCE</h3>" +
        "1. Detect input<br>" +
        "2. Cascade: " + cascadeCount + "<br>" +
        "3. Mitigate<br>" +
        "4. Stabilize";
    }
  }

  // GLOBAL SCENARIO TRIGGER
  window.trigger = function(type) {

    activeScenario = type;

    const result = inject(type);

    if (result?.risk) {
      updateBiodieselLayer(result.risk);
    }

    renderAll();

    return result;
  };

  // INITIAL RENDER (NO LOOP → FIXES GITHUB TIMEOUT)
  renderAll();

});