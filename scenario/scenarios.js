export const scenarios = {
  FX: {
    id: "FX",
    name: "FX Volatility Spike",
    description: "Currency volatility spike impacting system stability",
    effects: {
      FX: 20,
      INF: 5,
      DC: 0,
      CYB: 2
    }
  },

  INF: {
    id: "INF",
    name: "Infrastructure Stress",
    description: "Physical infrastructure load increases across nodes",
    effects: {
      FX: 0,
      INF: 25,
      DC: 10,
      CYB: 0
    }
  },

  DC: {
    id: "DC",
    name: "Data Centre Overload",
    description: "Compute saturation detected in core nodes",
    effects: {
      FX: 5,
      INF: 10,
      DC: 30,
      CYB: 5
    }
  },

  CYB: {
    id: "CYB",
    name: "Cyber Disruption",
    description: "Security anomalies detected in system layer",
    effects: {
      FX: 10,
      INF: 5,
      DC: 10,
      CYB: 30
    }
  }
};