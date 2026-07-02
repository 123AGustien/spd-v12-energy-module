export function applyScenario(state, scenario) {
  const updated = { ...state };

  updated.FX += scenario.effects.FX || 0;
  updated.INF += scenario.effects.INF || 0;
  updated.DC += scenario.effects.DC || 0;
  updated.CYB += scenario.effects.CYB || 0;

  updated.biodiesel = Math.max(
    0,
    (updated.biodiesel || 0) + (scenario.energyImpact.biodiesel || 0)
  );

  updated.importDependency =
    (updated.importDependency || 0) +
    (scenario.energyImpact.importDependency || 0);

  updated.cpoReserve =
    (updated.cpoReserve || 0) +
    (scenario.energyImpact.cpoReserve || 0);

  return updated;
}