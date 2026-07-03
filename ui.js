import {
  state,
  scenarios,
  inject,
  riskLevel,
  solutions
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

  /* -----------------------------
     MAIN RENDER
  ------------------------------*/
  function renderAll() {

    // CORE STATE
    if (el.FX) el.FX.innerText = state.FX.toFixed(0);
    if (el.DC) el.DC.innerText = state.DC.toFixed(0);
    if (el.CYB) el.CYB.innerText = state.CYB.toFixed(0);
    if (el.INF) el.INF.innerText = state.INF.toFixed(0);

    // BIODIESEL
    if (el.blend) el.blend.innerText = state.biodiesel.toFixed(1);
    if (el.cpo) el.cpo.innerText = state.cpoReserve;
    if (el.imp) el.imp.innerText = "—";
    if (el.stab) el.stab.innerText = "SYSTEM MODE";

    renderPanels();
  }

  /* -----------------------------
     PANELS
  ------------------------------*/
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
      Risk: <b>${risk}</b>
    `;

    el.solutionPanel.innerHTML = `
      <h3>SOLUTION PANEL</h3>
      ${list.map(x => `• ${x}`).join("<br>")}
    `;

    el.actionPanel.innerHTML = `
      <h3>ACTION SEQUENCE</h3>
      1. Detect input<br>
      2. Cascade executed<br>
      3. Risk evaluated<br>
      4. Stabilisation applied
    `;

    renderScenarioInfo(scenario);
    renderDecisionPanel(risk, scenario);
  }

  /* -----------------------------
     SCENARIO INFO
  ------------------------------*/
  function renderScenarioInfo(scenario) {
    el.scenarioInfo.innerHTML = `
      <div style="margin-top:10px;">
        <b>${scenario.name}</b><br>
        <small>${scenario.description}</small><br>
        <small><i>${scenario.impact || ""}</i></small>
      </div>
    `;
  }

  /* -----------------------------
     SCENARIO BUTTONS
  ------------------------------*/
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

  /* -----------------------------
     DECISION PANEL
  ------------------------------*/
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

  /* -----------------------------
     FLASH FEEDBACK SYSTEM
  ------------------------------*/
  function flashUI(type) {

    const panel = document.getElementById("riskPanel");
    if (!panel) return;

    panel.style.transition = "0.2s";
    panel.style.boxShadow = "0 0 20px #00ff88";

    setTimeout(() => {
      panel.style.boxShadow = "none";
    }, 250);

    const scenarioInfo = document.getElementById("scenarioInfo");
    if (scenarioInfo) {
      scenarioInfo.innerHTML = `
        <div>
          <b>ACTIVE INPUT:</b> ${type}
        </div>
      `;
    }
  }

  /* -----------------------------
     GLOBAL TRIGGER (FIXED)
  ------------------------------*/
  window.trigger = function(type) {

    activeScenario = type;

    inject(type);

    renderAll();

    flashUI(type);
  };

  /* -----------------------------
     INIT
  ------------------------------*/
  renderScenarioButtons();
  renderAll();
});