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
  // ELEMENT BINDING
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

    decisionPanel: document.getElementById("decisionPanel"),

    blend: document.getElementById("blend"),
    cpo: document.getElementById("cpo"),
    imp: document.getElementById("imp"),
    stab: document.getElementById("stab"),

    bioButtons: document.getElementById("bioButtons")
  };

  let activeScenario = "FX";
  let bioMode = "NORMAL";

  // -----------------------------
  // CORE RENDER
  // -----------------------------
  function renderAll() {

    // FX SYSTEM
    if (el.FX) el.FX.innerText = state.FX;
    if (el.DC) el.DC.innerText = state.DC;
    if (el.CYB) el.CYB.innerText = state.CYB;
    if (el.INF) el.INF.innerText = state.INF;

    // BIODIESEL SYSTEM
    if (el.blend) el.blend.innerText = state.biodiesel.toFixed(1);
    if (el.cpo) el.cpo.innerText = state.cpoReserve;
    if (el.imp) el.imp.innerText = "—";
    if (el.stab) el.stab.innerText = bioMode;

    renderPanels();
  }

  // -----------------------------
  // PANEL RENDER
  // -----------------------------
  function renderPanels() {

    const risk = riskLevel();

    const scenario = scenarios?.[activeScenario] || {
      name: "NO SCENARIO",
      description: "Awaiting input",
      impact: ""
    };

    const list = solutions(risk) || ["Normal operations"];

    // -----------------------------
    // RISK PANEL
    // -----------------------------
    el.riskPanel.innerHTML = `
      <h3>RISK PANEL</h3>
      Risk: ${risk}
    `;

    // -----------------------------
    // SOLUTION PANEL
    // -----------------------------
    el.solutionPanel.innerHTML = `
      <h3>SOLUTION PANEL</h3>
      ${list.map(x => `• ${x}`).join("<br>")}
    `;

    // -----------------------------
    // ACTION PANEL
    // -----------------------------
    el.actionPanel.innerHTML = `
      <h3>ACTION SEQUENCE</h3>
      1. Detect input<br>
      2. Cascade: ${getCascadeCount()}<br>
      3. Mitigate<br>
      4. Stabilize
    `;

    renderScenarioInfo(scenario);
    renderDecisionPanel(risk, scenario);
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
  // BIODIESEL MODE BUTTONS
  // -----------------------------
  function renderBioButtons() {

    if (!el.bioButtons) return;

    el.bioButtons.innerHTML = "";

    const modes = [
      { key: "NORMAL", label: "Normal Mode" },
      { key: "SHORT", label: "Biodiesel Short Supply" },
      { key: "OIL_LOW", label: "Oil Prices Low" }
    ];

    modes.forEach(m => {

      const btn = document.createElement("button");
      btn.className = "scenario-btn";
      btn.innerText = m.label;

      btn.onclick = () => setBioMode(m.key);

      el.bioButtons.appendChild(btn);
    });
  }

  // -----------------------------
  // BIODIESEL MODE ENGINE
  // -----------------------------
  function setBioMode(mode) {

    bioMode = mode;

    if (mode === "NORMAL") {
      state.biodiesel = 35;
      state.cpoReserve = 100;
    }

    if (mode === "SHORT") {
      state.biodiesel = 55;
      state.cpoReserve = 40;
    }

    if (mode === "OIL_LOW") {
      state.biodiesel = 25;
      state.cpoReserve = 120;
    }

    renderAll();
  }

  // -----------------------------
  // DECISION ENGINE
  // -----------------------------
  function renderDecisionPanel(risk, scenario) {

    if (!el.decisionPanel) return;

    let verdict = "";
    let reason = "";
    let action = "";

    switch (risk) {

      case "CRITICAL":
        verdict = "CRITICAL SYSTEM FAILURE";
        reason = "Multi-layer cascade detected across FX/DC/INF";
        action = "Emergency shutdown + isolation";
        break;

      case "HIGH":
        verdict = "HIGH STRESS STATE";
        reason = "Cascade propagation active across subsystems";
        action = "Reduce load + activate reserves";
        break;

      case "MEDIUM":
        verdict = "STRESSED BUT STABLE";
        reason = "Partial imbalance detected";
        action = "Monitor + balancing";
        break;

      default:
        verdict = "STABLE OPERATION";
        reason = "No significant instability detected";
        action = "Normal operations continue";
        break;
    }

    el.decisionPanel.innerHTML = `
      <h3>DECISION PANEL</h3>

      <b>${verdict}</b><br><br>

      <b>Reason:</b><br>
      ${reason}<br><br>

      <b>Action:</b><br>
      ${action}<br><br>

      <b>Scenario:</b><br>
      ${scenario.name}
    `;
  }

  // -----------------------------
  // ENGINE TRIGGER
  // -----------------------------
  window.trigger = function(type) {

    activeScenario = type;

    inject(type);

    renderAll();
  };

  // -----------------------------
  // INIT
  // -----------------------------
  renderScenarioButtons();
  renderBioButtons();
  renderAll();

});