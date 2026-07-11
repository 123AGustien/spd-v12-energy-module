/* =============================
   SPD v12 SCENARIO ENGINE v2
   DECISION + INTERPRETATION LAYER
   SYSTEM RESILIENCE ANALYSIS
============================= */


import { state, energyIndex } from "../engine.js";
import { scenarios } from "./scenarios.js";



/* =============================
   BUILD DECISION PACKET
============================= */

export function buildDecisionPacket(activeType, risk) {


  const scenario =
    scenarios?.[activeType];



  if(!scenario){

    return {

      title:"NO SCENARIO",

      summary:"System idle",

      impact:"—",

      decision:"STANDBY",

      cascadeInterpretation:0,

      energyIndex:0,

      riskSignal:risk,

      systemSnapshot:{

        FX:state.FX,
        DC:state.DC,
        CYB:state.CYB,
        INF:state.INF

      }

    };

  }



  /* =============================
     CASCADE INTERPRETER
     RAW VALUE → SYSTEM MEANING
  ============================== */


  const cascadePressure =

      (state.FX * 1.2)

    + (state.DC * 1.1)

    + (state.CYB * 1.4)

    + (state.INF * 1.3);



  const energyPressure =
    energyIndex();



  const cascadeInterpretation =
    Math.round(
      (cascadePressure + energyPressure) / 10
    );




  /* =============================
     DECISION LOGIC
  ============================== */


  let decision;



  switch(risk){


    case "CRITICAL":

      decision =
        "FULL OVERRIDE";

      break;



    case "HIGH":

      decision =
        "CRISIS CONTAINMENT";

      break;



    case "MEDIUM":

      decision =
        "CONTROLLED BALANCE";

      break;



    default:

      decision =
        "NORMAL OPERATIONS";

  }




  /* =============================
     DECISION OUTPUT
  ============================== */


  return {


    title:
      scenario.name,


    summary:
      scenario.description || "",


    impact:
      scenario.impact || "",



    decision,


    riskSignal:
      risk,



    cascadeInterpretation,



    energyIndex:
      energyPressure,



    systemSnapshot:{


      FX:
        state.FX,


      DC:
        state.DC,


      CYB:
        state.CYB,


      INF:
        state.INF

    }


  };


}





/* =============================
   TEXT REPORT OUTPUT
   FOR DECISION PANEL
============================= */

export function renderDecisionText(packet){


  return `

▶ SPD v12 DECISION PANEL


SCENARIO:
${packet.title}


SUMMARY:
${packet.summary}


IMPACT:
${packet.impact || "—"}



RISK:
${packet.riskSignal}


DECISION:
${packet.decision}



CASCADE INDEX:
${packet.cascadeInterpretation}


ENERGY INDEX:
${packet.energyIndex}



SYSTEM SNAPSHOT:

FX  = ${packet.systemSnapshot.FX}

DC  = ${packet.systemSnapshot.DC}

CYB = ${packet.systemSnapshot.CYB}

INF = ${packet.systemSnapshot.INF}


`;

}