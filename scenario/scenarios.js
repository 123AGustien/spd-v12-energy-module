export const scenarios = {
  FX_SHOCK_SGD: {
    id: "FX_SHOCK_SGD",
    name: "SGD FX Volatility Shock",
    description: "Sudden currency instability affects FX conversion rates",

    effects: {
      FX: -25,
      INF: 0,
      DC: 0,
      CYB: 0
    },

    energyImpact: {
      biodiesel: 0,
      importDependency: 10,
      cpoReserve: -5
    },

    riskLevel: "MEDIUM"
  },

  INFRA_GITHUB_FAIL: {
    id: "INFRA_GITHUB_FAIL",
    name: "Infrastructure GitHub Sync Failure",
    description: "Repository sync disruption causes system desync",

    effects: {
      FX: 0,
      INF: -30,
      DC: -10,
      CYB: 0
    },

    energyImpact: {
      biodiesel: 0,
      importDependency: 0,
      cpoReserve: 0
    },

    riskLevel: "HIGH"
  },

  DC_POWER_SPIKE: {
    id: "DC_POWER_SPIKE",
    name: "Data Center Load Spike",
    description: "Compute overload triggers energy stress",

    effects: {
      FX: 0,
      INF: 0,
      DC: -35,
      CYB: 0
    },

    energyImpact: {
      biodiesel: -10,
      importDependency: 5,
      cpoReserve: -8
    },

    riskLevel: "HIGH"
  },

  CYB_INTRUSION_LOW: {
    id: "CYB_INTRUSION_LOW",
    name: "Low-Level Cyber Probe",
    description: "External probing detected in system APIs",

    effects: {
      FX: 0,
      INF: -10,
      DC: 0,
      CYB: -20
    },

    energyImpact: {
      biodiesel: 0,
      importDependency: 0,
      cpoReserve: 0
    },

    riskLevel: "MEDIUM"
  },

  BIODIESEL_SUPPLY_CRISIS: {
    id: "BIODIESEL_SUPPLY_CRISIS",
    name: "Biodiesel Supply Disruption",
    description: "CPO shortage impacts energy stability",

    effects: {
      FX: 0,
      INF: -10,
      DC: -20,
      CYB: 0
    },

    energyImpact: {
      biodiesel: -30,
      importDependency: 25,
      cpoReserve: -40
    },

    riskLevel: "CRITICAL"
  }
};