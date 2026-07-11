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

    scenarioButtons:
      document.getElementById("scenarioButtons"),

    scenarioInfo:
      document.getElementById("scenarioInfo"),

    riskPanel:
      document.getElementById("riskPanel"),

    solutionPanel:
      document.getElementById("solutionPanel"),

    actionPanel:
      document.getElementById("actionPanel"),

    decisionPanel:
      document.getElementById("decisionPanel"),


    blend:
      document.getElementById("blend"),

    cpo:
      document.getElementById("cpo"),

    imp:
      document.getElementById("imp"),

    stab:
      document.getElementById("stab"),


    supply:
      document.getElementById("supply"),

    demand:
      document.getElementById("demand"),

    subsidy:
      document.getElementById("subsidy"),

    cost:
      document.getElementById("cost")

  };


  let activeScenario = "FX";



  function render(){


    // SYSTEM

    if(el.FX) el.FX.innerText = state.FX.toFixed(1);
    if(el.DC) el.DC.innerText = state.DC.toFixed(1);
    if(el.CYB) el.CYB.innerText = state.CYB.toFixed(1);
    if(el.INF) el.INF.innerText = state.INF.toFixed(1);



    // ENERGY

    if(el.blend)
      el.blend.innerText =
        state.biodiesel.toFixed(1);


    if(el.cpo)
      el.cpo.innerText =
        state.cpoReserve;


    if(el.imp)
      el.imp.innerText =
        state.methanolSupply ?? 60;


    if(el.stab)
      el.stab.innerText =
        riskLevel();



    // ECONOMIC

    if(el.supply)
      el.supply.innerText =
        state.supply;


    if(el.demand)
      el.demand.innerText =
        state.demand;


    if(el.subsidy)
      el.subsidy.innerText =
        state.subsidy;


    if(el.cost)
      el.cost.innerText =
        state.consumerCost;



    const risk = riskLevel();



    // RISK PANEL

    if(el.riskPanel)

    el.riskPanel.innerHTML = `

      <h3>RISK PANEL</h3>

      Risk:
      <b>${risk}</b>

    `;



    // SOLUTION PANEL

    const list = solutions(risk);



    if(el.solutionPanel)

    el.solutionPanel.innerHTML = `

      <h3>SOLUTION PANEL</h3>

      ${list.map(x=>`• ${x}`).join("<br>")}

    `;



    // ACTION PANEL

    if(el.actionPanel)

    el.actionPanel.innerHTML = `

      <h3>ACTION SEQUENCE</h3>

      1. Detect input<br>

      2. Cascade count:
      ${getCascadeCount()}<br>

      3. Evaluate resilience<br>

      4. Apply stabilization

    `;



    // DECISION PANEL

    if(el.decisionPanel){

      let action;


      if(risk==="CRITICAL")
        action="Emergency stabilization protocol";


      else if(risk==="HIGH")
        action="Activate reserves and containment";


      else if(risk==="MEDIUM")
        action="Monitor and rebalance system";


      else
        action="Normal operations continue";



      el.decisionPanel.innerHTML = `

        <h3>DECISION PANEL</h3>

        Status:
        <b>${risk}</b>

        <br><br>

        Recommended Action:

        <br>

        ${action}

      `;

    }



    // SCENARIO

    const scenario =
      scenarios[activeScenario];


    if(scenario && el.scenarioInfo){

      el.scenarioInfo.innerHTML = `

        <b>${scenario.name}</b>

        <br>

        <small>
        ${scenario.description || ""}
        </small>

        <br>

        <i>
        ${scenario.impact || ""}
        </i>

      `;

    }

  }




  function initScenarios(){


    if(!el.scenarioButtons)
      return;


    el.scenarioButtons.innerHTML="";


    Object.entries(scenarios)
    .forEach(([key,scenario])=>{


      const btn =
        document.createElement("button");


      btn.className =
        "scenario-btn";


      btn.innerHTML =
        scenario.name;


      btn.onclick=()=>{

        activeScenario=key;

        inject(key);

        render();

      };


      el.scenarioButtons
      .appendChild(btn);


    });

  }



  window.trigger=function(type){

    activeScenario=type;

    inject(type);

    render();

  };



  function boot(){

    initScenarios();

    render();

  }


  boot();


});