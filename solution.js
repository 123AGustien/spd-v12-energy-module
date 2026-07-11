/* =============================
   SPD v12.2 // SOLUTION ENGINE
   AUTONOMOUS RESPONSE LAYER
   + METHANOL RESILIENCE LOGIC
============================= */


/* -----------------------------
   SOLUTION DATABASE
------------------------------*/

const solutionMap = {

  LOW: [
    "Normal operations",
    "Continue system monitoring",
    "Maintain energy reserves"
  ],


  MEDIUM: [
    "Increase monitoring frequency",
    "Apply soft balancing adjustments",
    "Review supply chain exposure"
  ],


  HIGH: [
    "Activate strategic reserves",
    "Reduce external dependency",
    "Increase operational controls"
  ],


  CRITICAL: [
    "Emergency stabilization protocol",
    "Activate contingency reserves",
    "Execute systemic recovery plan"
  ]

};


/* -----------------------------
   ENERGY SOLUTIONS
------------------------------*/

function energySolutions(state){

  let actions = [];


  if(state.cpoReserve < 40){

    actions.push(
      "Protect remaining CPO reserves"
    );

  }


  if(state.methanolSupply < 50){

    actions.push(
      "Secure alternative methanol supply"
    );

    actions.push(
      "Prioritize methanol allocation for biodiesel production"
    );

  }


  if(state.methanolStorage < 50){

    actions.push(
      "Increase methanol strategic storage buffer"
    );

  }


  if(state.methanolPrice === "HIGH"){

    actions.push(
      "Monitor biodiesel production cost pressure"
    );

  }


  return actions;

}


/* -----------------------------
   MAIN SOLUTION ENGINE
------------------------------*/

export function generateSolutions(level, state){

  let solutions = [];


  if(solutionMap[level]){

    solutions.push(
      ...solutionMap[level]
    );

  }


  solutions.push(
    ...energySolutions(state)
  );


  return solutions;

}


/* -----------------------------
   DECISION SUMMARY
------------------------------*/

export function decisionSummary(level, state){

  const solutions =
    generateSolutions(level,state);


  return {

    riskLevel: level,

    actions: solutions,

    timestamp:
      new Date().toISOString()

  };

}


/* -----------------------------
   LEGACY UI COMPATIBILITY
------------------------------*/

export function solutions(level){

  return solutionMap[level] || [
    "Awaiting analysis"
  ];

}