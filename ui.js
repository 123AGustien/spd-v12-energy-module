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

    // FIXED: split UI targets (IMPORTANT)
    scenarioButtons: document.getElementById("scenarioButtons"),
    scenarioInfo: document.getElementById("scenarioInfo"),

    riskPanel: document.getElementById("riskPanel"),
    solutionPanel: document.getElementById("solutionPanel"),
    actionPanel: document.getElementById("actionPanel"),

    blend: document.getElementById("blend"),
    cpo: document.getElementById("cpo"),
    imp: document.getElementById("imp"),
    stab: document.getElementById("stab")
  };

  let activeScenario = "FX";

  // -----------------------------
  // CORE SYSTEM RENDER
  // -----------------------------
  function renderAll() {

    // FX SYSTEM
    if (el.FX) el.FX.innerText = state.FX;
    if (el.DC) el.DC.innerText = state.DC;
    if (el.CYB) el.CYB.innerText = state.CYB;
    if (el.INF) el.INF.innerText = state.INF;

    // BIODIESEL SYSTEM
    if (el.blend) el.blend.innerText = biodieselState.blendRatio.toFixed(1);
    if (el.cpo) el.cpo.innerText = biodieselState.cpoStock;
    if (el.imp) el.imp.innerText = biodieselState.importDependency.toFixed(1);
    if (el.stab) el.stab.innerText = biodieselState.stability;

    renderPanels();
  }

  // -----------------------------
  // PANEL RENDER
  // -----------------------------
  function renderPanels() {

    const risk = riskLevel();

    const scenario = scenarios?.[activeScenario] || {
      name: "NO SCENARIO",
      description: "Awaiting input"
    };

    const list = typeof solutions === "function"
      ? solutions(risk)
      : [];

    // RISK PANEL
    if (el.riskPanel) {
      el.riskPanel.innerHTML = `
        <h3>RISK PANEL</h3>
        Risk: ${risk}
      `;
    }

    // SOLUTION PANEL
    if (el.solutionPanel) {
      el.solutionPanel.innerHTML = `
        <h3>SOLUTION PANEL</h3>
        ${list.length ? list.map(x => `• ${x}`).join("<br>") : "No solutions"}
      `;
    }

    // ACTION PANEL
    if (el.actionPanel) {
      el.actionPanel.innerHTML = `
        <h3>ACTION SEQUENCE</h3>
        1. Detect input<br>
        2. Cascade: ${cascadeCount}<br>
        3. Mitigate<br>
        4. Stabilize
      `;
    }

    renderScenarioInfo(scenario);
  }

  // -----------------------------
  // SCENARIO INFO (SELECTED)
  // -----------------------------
  function renderScenarioInfo(scenario) {

    if (!el.scenarioInfo) return;

    el.scenarioInfo.innerHTML = `
      <div style="margin-top:10px;">
        <b>${scenario.name}</b><br>
        <small>${scenario.description || "No description available"}</small>
      </div>
    `;
  }

  // -----------------------------
  // SCENARIO BUTTONS (LIST)
  // -----------------------------
  function renderScenarioButtons() {

    if (!el.scenarioButtons) return;

    el.scenarioButtons.innerHTML = "";

    Object.keys(scenarios).forEach(key => {

      const btn = document.createElement("button");
      btn.className = "scenario-btn";
      btn.innerText = scenarios[key].name || key;

      btn.onclick = () => trigger(key);

      el.scenarioButtons.appendChild(btn);
    });
  }

  // -----------------------------
  // GLOBAL TRIGGER ENGINE
  // -----------------------------
  window.trigger = function(type) {

    activeScenario = type;

    const result = inject(type) || {};

    updateBiodieselLayer(result.risk || riskLevel());

    renderAll();

    return result;
  };

  // -----------------------------
  // INIT
  // -----------------------------
  renderScenarioButtons();
  renderAll();

});