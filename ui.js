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

  /* =============================
     RENDER SYSTEM
  ==============================*/
  function renderAll() {

    if (el.FX) el.FX.innerText = state.FX.toFixed(0);
    if (el.DC) el.DC.innerText = state.DC.toFixed(0);
    if (el.CYB) el.CYB.innerText = state.CYB.toFixed(0);
    if (el.INF) el.INF.innerText = state.INF.toFixed(0);

    if (el.blend) el.blend.innerText = state.biodiesel.toFixed(1);
    if (el.cpo) el.cpo.innerText = state.cpoReserve;
    if (el.imp) el.imp.innerText = "—";
    if (el.stab) el.stab.innerText = "SYSTEM MODE";

    renderPanels();
  }

  /* =============================
     PANELS
  ==============================*/
  function renderPanels() {

    const risk = riskLevel();

    const scenario = scenarios[activeScenario] || {
      name: "NO SCENARIO",
      description: "",
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

    el.scenarioInfo.innerHTML = `
      <div style="margin-top:10px;">
        <b>${scenario.name}</b><br>
        <small>${scenario.impact || ""}</small>
      </div>
    `;

    renderDecisionPanel(risk, scenario);
  }

  /* =============================
     DECISION PANEL
  ==============================*/
  function renderDecisionPanel(risk, scenario) {

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

  /* =============================
     CONTROL ROOM FX ENGINE
  ==============================*/
  function controlRoomFX(type, risk) {

    const intensityMap = {
      LOW: 1,
      MEDIUM: 1.5,
      HIGH: 2,
      CRITICAL: 3
    };

    const intensity = intensityMap[risk] || 1;

    const panels = document.querySelectorAll(".panel");

    panels.forEach(p => {
      p.style.transition = "0.15s";
    });

    switch (type) {

      case "FX":
        document.body.style.boxShadow =
          `inset 0 0 ${80 * intensity}px rgba(255,0,0,0.4)`;
        break;

      case "INF":
        document.body.style.boxShadow =
          `inset 0 0 ${80 * intensity}px rgba(0,150,255,0.4)`;
        break;

      case "CYB":
        document.body.style.filter = "contrast(1.2) hue-rotate(90deg)";
        setTimeout(() => document.body.style.filter = "", 250);
        break;

      case "DC":
        panels.forEach(p => {
          const x = (Math.random() * 2 - 1) * intensity;
          const y = (Math.random() * 2 - 1) * intensity;
          p.style.transform = `translate(${x}px, ${y}px)`;
        });
        break;
    }

    setTimeout(() => {
      document.body.style.boxShadow = "none";
      panels.forEach(p => p.style.transform = "none");
    }, 300);
  }

  /* =============================
     FLASH FEEDBACK
  ==============================*/
  function flashUI(type) {

    const panel = document.getElementById("riskPanel");
    if (panel) {
      panel.style.transition = "0.2s";
      panel.style.boxShadow = "0 0 20px #00ff88";

      setTimeout(() => {
        panel.style.boxShadow = "none";
      }, 250);
    }

    const scenarioInfo = document.getElementById("scenarioInfo");
    if (scenarioInfo) {
      scenarioInfo.innerHTML = `<b>ACTIVE INPUT:</b> ${type}`;
    }
  }

  /* =============================
     TRIGGER SYSTEM
  ==============================*/
  window.trigger = function(type) {

    activeScenario = type;

    inject(type);

    renderAll();

    flashUI(type);

    controlRoomFX(type, riskLevel());
  };

  /* =============================
     INIT
  ==============================*/
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

  renderScenarioButtons();
  renderAll();
});