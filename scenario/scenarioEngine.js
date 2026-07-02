import { scenarios } from "./scenarios.js";

export const state = {
  FX: 0,
  INF: 0,
  DC: 0,
  CYB: 0
};

export let cascadeCount = 0;

export function inject(type) {
  const scenario = scenarios[type];
  if (!scenario) return null;

  // Apply effects
  Object.keys(scenario.effects).forEach(key => {
    state[key] += scenario.effects[key];
  });

  cascadeCount++;

  return {
    scenario,
    risk: calculateRisk()
  };
}

export function riskLevel() {
  return calculateRisk();
}

function calculateRisk() {
  const total =
    state.FX +
    state.INF +
    state.DC +
    state.CYB;

  if (total > 120) return "HIGH";
  if (total > 60) return "MEDIUM";
  return "LOW";
}