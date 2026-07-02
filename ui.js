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

/* -----------------------------
   DOM ELEMENTS
------------------------------*/
const el = {
FX: document.getElementById("FX"),
DC: document.getElementById("DC"),
CYB: document.getElementById("CYB"),
INF: document.getElementById("INF"),

EN: document.getElementById("EN"),
PS: document.getElementById("PS"),
RK: document.getElementById("RK"),
CS: document.getElementById("CS"),

statusBar: document.getElementById("statusBar"),

scenarioPanel: document.getElementById("scenarioPanel"),
riskPanel: document.getElementById("riskPanel"),
solutionPanel: document.getElementById("solutionPanel"),
actionPanel: document.getElementById("actionPanel"),

log: document.getElementById("log")
};

/* -----------------------------
   LOG SYSTEM
------------------------------*/
let log = [];

function addLog(msg){
log.push(msg);
el.log.innerHTML =
log.slice(-12).map(x => "→ " + x).join("<br>");
}

/* -----------------------------
   RENDER ENGINE
------------------------------*/
function render(){

el.FX.innerText = state.FX;
el.DC.innerText = state.DC;
el.CYB.innerText = state.CYB;
el.INF.innerText = state.INF;

el.EN.innerText = energyIndex().toFixed(1);
el.RK.innerText = riskLevel();
el.PS.innerText = policyState(riskLevel());
el.CS.innerText = cascadeCount;

el.statusBar.innerText =
"STATUS: " + riskLevel() +
" | POLICY: " + policyState(riskLevel());
}

/* -----------------------------
   UPDATE SCENARIO VIEW
------------------------------*/
function updatePanels(type){

const s = scenarios[type];

el.scenarioPanel.innerHTML =
"<b>SCENARIO PANEL</b><br>" +
s.name + "<br>" + s.impact;

el.riskPanel.innerHTML =
"<b>RISK PANEL</b><br>Risk: " + riskLevel();

el.solutionPanel.innerHTML =
"<b>SOLUTION OPTIONS</b><br>" +
solutions(riskLevel()).map(x => "• " + x).join("<br>");

el.actionPanel.innerHTML =
"<b>ACTION SEQUENCE</b><br>" +
"Step 1: Detect " + type + "<br>" +
"Step 2: Cascade propagation active<br>" +
"Step 3: Apply mitigation → " + s.impact;
}

/* -----------------------------
   PUBLIC ACTION WRAPPER
------------------------------*/
export function trigger(type){

const result = inject(state, type);

addLog("INJECT " + type + " | CASCADE=" + cascadeCount);

updatePanels(type);
render();

return result;
}

/* -----------------------------
   RESET UI
------------------------------*/
export function resetUI(){

addLog("SYSTEM RESET");

render();

el.scenarioPanel.innerHTML =
"<b>SCENARIO PANEL</b><br>Idle";

el.riskPanel.innerHTML =
"<b>RISK PANEL</b><br>Risk: LOW";

el.solutionPanel.innerHTML =
"<b>SOLUTION OPTIONS</b><br>- None";

el.actionPanel.innerHTML =
"<b>ACTION SEQUENCE</b><br>- Awaiting input";
}

/* -----------------------------
   AUTO RENDER LOOP
------------------------------*/
setInterval(render, 500);
render();