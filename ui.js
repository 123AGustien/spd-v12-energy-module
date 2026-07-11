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


    blend:
      document.getElementById("blend"),

    cpo:
      document.getElementById("cpo"),

    imp:
      document.getElementById("imp"),

    stab:
      document.getElementById("stab")

  };


  let activeScenario = "FX";


  // -----------------------------
  // CORE RENDER
  // -----------------------------

  function render(){


    // SYSTEM VALUES

    el.FX.innerText = state.FX.toFixed(1);
    el.DC.innerText = state.DC.toFixed(1);
    el.CYB.innerText = state.CYB.toFixed(1);
    el.INF.innerText = state.INF.toFixed(1);



    // BIODIESEL

    el.blend.innerText =
      state.biodiesel.toFixed(1);


    el.cpo.innerText =
      state.cpoReserve;



    // IMPORT DEPENDENCY

    if(el.imp){

      el.imp.innerText =
        state.methanolSupply !== undefined
        ? state.methanolSupply
        : 60;

    }



    // STABILITY

    if(el.stab){

      el.stab.innerText =
        riskLevel();

    }



    // RISK PANEL

    const risk =
      riskLevel();


    el.riskPanel.innerHTML = `

      <h3>RISK PANEL</h3>

      Risk: ${risk}

    `;



    // SOLUTION PANEL

    const list =
      solutions(risk);


    el.solutionPanel.innerHTML = `

      <h3>SOLUTION PANEL</h3>

      ${list.map(x => `• ${x}`).join("<br>")}

    `;



    // ACTION PANEL

    el.actionPanel.innerHTML = `

      <h3>ACTION SEQUENCE</h3>

      1. Detect input<br>

      2. Cascade: ${getCascadeCount()}<br>

      3. Evaluate resilience<br>

      4. Apply stabilization

    `;



    // SCENARIO INFO

    const scenario =
      scenarios[activeScenario];


    if(scenario){

      el.scenarioInfo.innerHTML = `

        <b>${scenario.name}</b><br>

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



  // -----------------------------
  // SCENARIO BUTTONS
  // -----------------------------

  function initScenarios(){


    el.scenarioButtons.innerHTML = "";


    Object.entries(scenarios)
    .forEach(([key,scenario])=>{


      const btn =
        document.createElement("button");


      btn.className =
        "scenario-btn";


      btn.innerHTML =
        `<b>${scenario.name}</b>`;


      btn.onclick = () => {

        activeScenario = key;

        inject(key);

        render();

      };


      el.scenarioButtons
      .appendChild(btn);


    });


  }



  // -----------------------------
  // GLOBAL CONTROL
  // -----------------------------

  window.trigger =
    function(type){

      activeScenario = type;

      inject(type);

      render();

    };



  // -----------------------------
  // STARTUP
  // -----------------------------

  function boot(){

    initScenarios();

    render();

  }


  boot();


});