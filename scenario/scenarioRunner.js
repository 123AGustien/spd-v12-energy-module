/* =============================
   SPD v12 SCENARIO RUNNER v2
   EXECUTION + DECISION CONNECTOR
============================= */


import { scenarios } from "./scenarios.js";
import {
  buildDecisionPacket
} from "./scenarioEngine.js";



/* =============================
   RUN SCENARIO
============================= */

export function runScenario(
  state,
  scenarioId,
  risk = "LOW"
){


  const scenario =
    scenarios[scenarioId];



  if(!scenario){

    return {

      state,

      risk,

      activeScenario:"IDLE",

      decision:
        null

    };

  }



  const newState = {
    ...state
  };



  /*
     Apply scenario effects
  */

  if(scenario.effects){

    Object.entries(
      scenario.effects
    )
    .forEach(
      ([key,value])=>{

        if(newState[key] !== undefined){

          newState[key] += value;

        }

      }
    );

  }



  /*
     Apply energy effects
  */

  if(scenario.energyEffect){

    Object.entries(
      scenario.energyEffect
    )
    .forEach(
      ([key,value])=>{


        if(typeof value === "number"){

          newState[key] =
            (newState[key] || 0)
            + value;

        }


        else {

          newState[key] = value;

        }


      }
    );

  }




  const decision =
    buildDecisionPacket(
      scenarioId,
      risk
    );



  return {


    state:newState,


    risk,


    activeScenario:
      scenario.id,


    decision


  };


}