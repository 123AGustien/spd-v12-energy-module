import { scenarios } from "./scenarios.js";
import { applyScenario } from "./scenarioEngine.js";

export function runScenario(state, scenarioId) {
  const scenario = scenarios[scenarioId];

  if (!scenario) {
    return state;
  }

  const newState = applyScenario(state, scenario);

  return {
    state: newState,
    risk: scenario.riskLevel,
    activeScenario: scenario.id
  };
}