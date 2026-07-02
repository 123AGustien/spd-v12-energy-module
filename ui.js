import {
  state,
  scenarios,
  inject,
  riskLevel,
  solutions,
  getCascadeCount
} from "./engine.js";

window.addEventListener("DOMContentLoaded", () => {

  const el = {
    FX: document.getElementById("FX"),
    DC: document.getElementById("DC"),
    CYB: document.getElementById("CYB"),
    INF: document.getElementById("INF"),

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
  // CORE RENDER
  // -----------------------------
  function renderAll() {

    // FX SYSTEM
    if (el.FX) el.FX.innerText = state.FX;
    if (el.DC) el.DC.innerText = state.DC;
    if (el.CYB) el.CYB.innerText = state.CYB;
    if (el.INF) el.INF.innerText = state.INF;

    // BIODIESEL (FIXED: single source of truth)
    if (el.blend) el.blend.innerText = state.biodiesel.toFixed(1);
    if (el.cpo) el.cpo.innerText = state.cpoReserve;
    if (el.imp) el.imp.innerText = "—";
    if (el.stab) el.stab.innerText = "SYSTEM MODE";

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

    const list = solutions(risk);

    // RISK PANEL
    el.riskPanel.innerHTML = `
      <h3>RISK PANEL</h3>
      Risk: ${risk}
    `;

    // SOLUTION PANEL
    el.solutionPanel.innerHTML = `
      <h3>SOLUTION PANEL</h3>
      ${list.map(x => `• ${x}`).join("<br>")}
    `;

    // ACTION PANEL
    el.actionPanel.innerHTML = `
      <h3>ACTION SEQUENCE</h3>
      1. Detect input<br>
      2. Cascade: ${getCascadeCount()}<br>
      3. Mitigate<br>
      4. Stabilize
    `;

    renderScenarioInfo(scenario);
  }

  // -----------------------------
  // SCENARIO INFO
  // -----------------------------
  function renderScenarioInfo(scenario) {

    el.scenarioInfo.innerHTML = `
      <div style="margin-top:10px;">
        <b>${scenario.name}</b><br>
        <small>${scenario.description}</small><br>
        <small><i>${scenario.impact || ""}</i></small>
      </div>
    `;
  }

  // -----------------------------
  // SCENARIO BUTTONS
  // -----------------------------
  function renderScenarioButtons() {

    el.scenarioButtons.innerHTML = "";

    Object.entries(scenarios).forEach(([key, s]) => {

      const btn = document.createElement("button");
      btn.className = "scenario-btn";

      btn.innerHTML = `<b>${s.name}</b>`;

      btn.onclick = () => trigger(key);

      el.scenarioButtons.appendChild(btn);
    });
  }

  // -----------------------------
  // ENGINE TRIGGER
  // -----------------------------
  window.trigger = function(type) {

    activeScenario = type;

    const result = inject(type);

    renderAll();

    return result;
  };

  // -----------------------------
  // INIT
  // -----------------------------
  renderScenarioButtons();
  renderAll();

});