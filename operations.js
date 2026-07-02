import {
  state,
  scenarios,
  inject,
  riskLevel,
  solutions,
  getCascadeCount
} from "./engine.js";

window.addEventListener("DOMContentLoaded", () => {

  // -----------------------------
  // UI REFERENCES
  // -----------------------------
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
  function render() {

    // FX SYSTEM
    el.FX.innerText = state.FX;
    el.DC.innerText = state.DC;
    el.CYB.innerText = state.CYB;
    el.INF.innerText = state.INF;

    // BIODIESEL
    el.blend.innerText = state.biodiesel.toFixed(1);
    el.cpo.innerText = state.cpoReserve;

    // RISK
    const risk = riskLevel();

    el.riskPanel.innerHTML = `
      <h3>RISK PANEL</h3>
      Risk: ${risk}
    `;

    // SOLUTIONS
    const list = solutions(risk);

    el.solutionPanel.innerHTML = `
      <h3>SOLUTION PANEL</h3>
      ${list.map(x => `• ${x}`).join("<br>")}
    `;

    // ACTION SEQUENCE
    el.actionPanel.innerHTML = `
      <h3>ACTION SEQUENCE</h3>
      1. Detect input<br>
      2. Cascade: ${getCascadeCount()}<br>
      3. Mitigate<br>
      4. Stabilize
    `;

    // SCENARIO INFO
    const scenario = scenarios[activeScenario];

    el.scenarioInfo.innerHTML = `
      <b>${scenario.name}</b><br>
      <small>${scenario.description}</small><br>
      <i>${scenario.impact}</i>
    `;
  }

  // -----------------------------
  // SCENARIO BUTTONS
  // -----------------------------
  function initScenarios() {

    el.scenarioButtons.innerHTML = "";

    Object.entries(scenarios).forEach(([key, s]) => {

      const btn = document.createElement("button");
      btn.className = "scenario-btn";

      btn.innerHTML = `<b>${s.name}</b>`;

      btn.onclick = () => {
        activeScenario = key;
        inject(key);
        render();
      };

      el.scenarioButtons.appendChild(btn);
    });
  }

  // -----------------------------
  // GLOBAL CONTROLS
  // -----------------------------
  window.trigger = function(type) {
    activeScenario = type;
    inject(type);
    render();
  };

  // -----------------------------
  // STARTUP SEQUENCE
  // -----------------------------
  function boot() {
    initScenarios();
    render();
  }

  boot();
});