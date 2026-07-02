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
  biodieselImpactIndex
} from "./biodiesel-engine.js";

/* -----------------------------
   SAFE DOM GETTER (prevents crash)
------------------------------*/
function get(id) {
  return document.getElementById(id);
}

/* -----------------------------
   DOM ELEMENTS
------------------------------*/
const el = {
  FX: get("FX"),
  DC: get("DC"),
  CYB: get("CYB"),
  INF: get("INF"),

  EN: get("EN"),
  PS: get("PS"),
  RK: get("RK"),
  CS: get("CS"),

  statusBar: get("statusBar"),

  scenarioPanel: get("scenarioPanel"),
  riskPanel: get("riskPanel"),
  solutionPanel: get("solutionPanel"),
  actionPanel: get("actionPanel"),

  bioBlend: get("bioBlend"),
  bioCPO: get("bioCPO"),
  bioImport: get("bioImport"),
  bioStatus: get("bioStatus"),
  bioImpact: get("bioImpact"),

  log: get("log")
};

/* -----------------------------
   SAFE LOG (won’t break UI)
------------------------------*/
let log = [];

function addLog(msg) {
  log.push(msg);

  if (el.log) {
    el.log.innerHTML =
      log.slice(-12).map(x => "→ " + x).join("<br>");
  }
}

/* -----------------------------
   BIODIESEL RENDER (SAFE)
------------------------------*/
function renderBiodiesel() {
  if (!el.bioBlend) return;

  el.bioBlend.innerText = "B" + biodieselState.blendRatio.toFixed(0);
  el.bioCPO.innerText = biodieselState.cpoStock.toFixed(0);
  el.bioImport.innerText = biodieselState.importDependency.toFixed(0) + "%";
  el.bioStatus.innerText = biodieselState.stability;
  el.bioImpact.innerText = biodieselImpactIndex().toFixed(1);
}

/* -----------------------------
   MAIN RENDER ENGINE
------------------------------*/
function render() {

  if (el.FX) el.FX.innerText = state.FX;
  if (el.DC) el.DC.innerText = state.DC;
  if (el.CYB) el.CYB.innerText = state.CYB;
  if (el.INF) el.INF.innerText = state.INF;

  const risk = riskLevel();
  const policy = policyState(risk);

  if (el.RK) el.RK.innerText = risk;
  if (el.PS) el.PS.innerText = policy;
  if (el.CS) el.CS.innerText = cascadeCount;

  if (el.statusBar) {
    el.statusBar.innerText =
      "STATUS: " + risk + " | POLICY: " + policy;
  }

  renderBiodiesel();
}

/* -----------------------------
   SCENARIO PANEL UPDATE
------------------------------*/
function updatePanels(type) {

  const s = scenarios[type];

  if (!s) return;

  const risk = riskLevel();

  if (el.scenarioPanel) {
    el.scenarioPanel.innerHTML =
      "<b>SCENARIO PANEL</b><br>" +
      s.name + "<br>" + s.impact;
  }

  if (el.riskPanel) {
    el.riskPanel.innerHTML =
      "<b>RISK PANEL</b><br>Risk: " + risk;
  }

  if (el.solutionPanel) {
    el.solutionPanel.innerHTML =
      "<b>SOLUTION OPTIONS</b><br>" +
      solutions(risk).map(x => "• " + x).join("<br>");
  }

  if (el.actionPanel) {
    el.actionPanel.innerHTML =
      "<b>ACTION SEQUENCE</b><br>" +
      "Step 1: Detect " + type + "<br>" +
      "Step 2: Cascade propagation active<br>" +
      "Step 3: Apply mitigation → " + s.impact;
  }
}

/* -----------------------------
   PUBLIC TRIGGER
------------------------------*/
export function trigger(type) {

  const result = inject(type);

  addLog("INJECT " + type + " | CASCADE=" + cascadeCount);

  updatePanels(type);
  render();

  return result;
}

/* -----------------------------
   RESET UI
------------------------------*/
export function resetUI() {

  addLog("SYSTEM RESET");

  render();

  if (el.scenarioPanel)
    el.scenarioPanel.innerHTML = "<b>SCENARIO PANEL</b><br>Idle";

  if (el.riskPanel)
    el.riskPanel.innerHTML = "<b>RISK PANEL</b><br>Risk: LOW";

  if (el.solutionPanel)
    el.solutionPanel.innerHTML = "<b>SOLUTION OPTIONS</b><br>- None";

  if (el.actionPanel)
    el.actionPanel.innerHTML = "<b>ACTION SEQUENCE</b><br>- Awaiting input";
}

/* -----------------------------
   AUTO LOOP
------------------------------*/
setInterval(render, 500);
render();