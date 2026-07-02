/* SPD v12 SCENARIO ENGINE v2
   DECISION + INTERPRETATION LAYER
*/

import { state, scenarios, energyIndex } from "./engine.js";

/* -----------------------------
   DECISION STRUCTURE OUTPUT
------------------------------*/
export function buildDecisionPacket(activeType, risk) {

  const scenario = scenarios?.[activeType];

  if (!scenario) {
    return {
      title: "NO SCENARIO",
      summary: "System idle",
      decision: "STANDBY",
      cascadeInterpretation: 0,
      riskSignal: risk
    };
  }

  /* -----------------------------
     CASCADE INTERPRETER
     (translates raw numbers → meaning)
  ------------------------------*/
  const cascadePressure =
    (state.FX * 1.2) +
    (state.DC * 1.1) +
    (state.CYB * 1.4) +
    (state.INF * 1.3);

  const energyPressure = energyIndex();

  const cascadeInterpretation =
    Math.round((cascadePressure + energyPressure) / 10);

  /* -----------------------------
     DECISION LOGIC LAYER
  ------------------------------*/
  let decision = "STABLE";

  if (risk === "CRITICAL") decision = "FULL OVERRIDE";
  else if (risk === "HIGH") decision = "CRISIS CONTAINMENT";
  else if (risk === "MEDIUM") decision = "CONTROLLED BALANCE";
  else decision = "NORMAL OPERATIONS";

  /* -----------------------------
     HUMAN READABLE OUTPUT
  ------------------------------*/
  return {
    title: scenario.name,
    summary: scenario.description,
    impact: scenario.impact,

    decision,
    riskSignal: risk,

    cascadeInterpretation,

    energyIndex: energyPressure,

    systemSnapshot: {
      FX: state.FX,
      DC: state.DC,
      CYB: state.CYB,
      INF: state.INF
    }
  };
}

/* -----------------------------
   SIMPLE TEXT REPORT (OPTIONAL UI USE)
------------------------------*/
export function renderDecisionText(packet) {

  return `
  ▶ DECISION PANEL v1

  SCENARIO: ${packet.title}
  SUMMARY: ${packet.summary}
  IMPACT: ${packet.impact || "—"}

  RISK: ${packet.riskSignal}
  DECISION: ${packet.decision}

  CASCADE INDEX: ${packet.cascadeInterpretation}
  ENERGY INDEX: ${packet.energyIndex}

  SNAPSHOT:
  FX=${packet.systemSnapshot.FX}
  DC=${packet.systemSnapshot.DC}
  CYB=${packet.systemSnapshot.CYB}
  INF=${packet.systemSnapshot.INF}
  `;
}