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

    decisionPanel: document.getElementById("decisionPanel"),

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

    // BIODIESEL
    if (el.blend) el.blend.innerText = state.biodiesel.toFixed(1);
    if (el.cpo) el.cpo.innerText = state.cpoReserve;
    if (el.imp) el.imp.innerText = "—";
    if (el.stab) el.stab.innerText = "SYSTEM MODE";

    renderPanels();
  }

  function renderPanels() {

    const risk = riskLevel();
    const scenario = scenarios[activeScenario] || {
      name: "NO SCENARIO",
      description: "Awaiting input",
      impact: ""
    };

    const list = solutions(risk);

    el.riskPanel.innerHTML = `
      <h3>RISK PANEL</h3>
      Risk: ${risk}
    `;

    el.solutionPanel.innerHTML = `
      <h3>SOLUTION PANEL</h3>
      ${list.map(x => `• ${x}`).join("<br>")}
    `;

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

  function renderScenarioInfo(scenario) {
    el.scenarioInfo.innerHTML = `
      <div style="margin-top:10px;">
        <b>${scenario.name}</b><br>
        <small>${scenario.description}</small><br>
        <small><i>${scenario.impact || ""}</i></small>
      </div>
    `;
  }

  function renderScenarioButtons() {

    el.scenarioButtons.innerHTML = "";

    Object.entries(scenarios).forEach(([key, s]) => {

      const btn = document.createElement("button");
      btn.className = "scenario-btn";
      btn.innerHTML = s.name;

      btn.onclick = () => trigger(key);

      el.scenarioButtons.appendChild(btn);
    });
  }

  function renderDecisionPanel(risk, scenario) {

    if (!el.decisionPanel) return;

    let verdict, reason, action;

    if (risk === "CRITICAL") {
      verdict = "CRITICAL SYSTEM FAILURE";
      reason = "Multi-layer cascade detected";
      action = "Emergency shutdown + isolation";
    } 
    else if (risk === "HIGH") {
      verdict = "HIGH STRESS STATE";
      reason = "Cascade propagation active";
      action = "Reduce load + activate reserves";
    } 
    else if (risk === "MEDIUM") {
      verdict = "STRESSED BUT STABLE";
      reason = "Partial imbalance detected";
      action = "Monitor + balancing";
    } 
    else {
      verdict = "STABLE OPERATION";
      reason = "No significant instability detected";
      action = "Normal operations continue";
    }

    el.decisionPanel.innerHTML = `
      <h3>DECISION PANEL</h3>

      <b>${verdict}</b><br><br>
      <b>Reason:</b> ${reason}<br><br>
      <b>Action:</b> ${action}<br><br>
      <b>Scenario:</b> ${scenario.name}
    `;
  }

  window.trigger = function(type) {
    activeScenario = type;
    inject(type);
    renderAll();
  };

  renderScenarioButtons();
  renderAll();
});