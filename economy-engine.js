export const econState = {
  supply: 100,
  demand: 100,
  subsidy: 0,
  consumerCost: 50
};

export function updateEconomy(risk, biodieselState) {

  if (risk === "HIGH") {
    econState.supply -= 6;
    econState.demand += 4;
  }

  const dependencyFactor = biodieselState.importDependency * 0.4;

  econState.consumerCost =
    50 +
    dependencyFactor +
    ((100 - econState.supply) * 0.3);

  if (econState.consumerCost > 60) {
    econState.subsidy += 5;
  }

  econState.supply = Math.max(0, Math.min(100, econState.supply));
}