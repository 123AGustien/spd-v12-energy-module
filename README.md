# 🧠 SPD v12 // SCENARIO ANALYSIS MODULE

## 📌 Overview

The SPD v12 system simulates energy stability under combined pressure from:

- FX volatility  
- Infrastructure load (INF)  
- Domestic fuel availability (CPO)  
- External oil price movement  
- Import dependency exposure  

The system does not treat variables independently — it evaluates **combined systemic behavior**.

---

# ⚙️ CORE SCENARIO RULES

## 🟠 Case A: Domestic Supply is Low

### 📉 Condition
- CPO Stock decreases

### 🧠 System Impact
- Internal fuel buffer weakens  
- Blend Ratio increases (compensation behavior)  
- Import Dependency increases  
- Stability shifts toward WATCH or STRESSED  

### 📌 Interpretation
> System is forced to compensate for weak domestic resilience.

---

## 🟢 Case B: Oil Prices Decline

### 📉 Condition
- External oil becomes cheaper  
- FX pressure reduces  

### 🧠 System Impact
- Import exposure becomes less risky  
- Blend pressure stabilizes  
- Stability improves gradually  

### 📌 Interpretation
> External environment absorbs part of system stress.

---

## ⚖️ Case C: Domestic Supply Low + Oil Prices Decline

### 📉 Condition Combination
- Weak internal supply  
- Favorable external pricing  

### 🧠 System Behavior
- Blend Ratio increases moderately (not aggressively)  
- Import Dependency increases but becomes less harmful  
- Stability holds at WATCH (not collapse)  

### 📌 Interpretation
> System enters a **balanced but fragile equilibrium state**

---

# 🧠 KEY INSIGHT (IMPORTANT)

Import Dependency is NOT inherently negative.

Its impact depends on external conditions:

```text
System Risk = Import Dependency × FX Pressure × Oil Price Pressure
🟢 1. Reduce Import Dependency (<55 target)
🟢 2. Increase buffer smoothing (blend volatility reduction)

🛢 SPD v12 // BIODIESEL LAYER MODULE
📌 Overview
The Biodiesel Layer is a dynamic energy buffer system inside SPD v12.
It simulates how internal fuel blending responds to:
FX volatility (currency pressure)
INF stress (infrastructure/logistics load)
System risk level (LOW → CRITICAL)
It is NOT static — it adjusts in real time based on system pressure.
⚙️ CURRENT STATE MODEL
Blend Ratio: 35.0
CPO Stock: 100
Import Dependency: 60.0
Stability: NORMAL
🧠 WHAT EACH VALUE MEANS
🛢 Blend Ratio
Represents internal biodiesel mix level.
Higher = more internal fuel substitution
Lower = dependency on external oil
Range:
30 → 85
🌴 CPO Stock
Palm oil reserve index (internal supply buffer).
100 = full reserve
0 = depleted stress state
Behavior:
decreases under HIGH / CRITICAL stress
recovers slowly under LOW risk
🌍 Import Dependency
External fuel reliance level.
60 = moderate dependency baseline
increases under stress (system exposure rises)
Meaning:
higher value = more sensitive to global oil price and FX shocks
🟢 Stability
System health indicator:
State
Meaning
NORMAL
stable operations
WATCH
early stress detected
STRESSED
active pressure
EMERGENCY
critical instability
⚙️ HOW THE ENGINE WORKS
🧠 Core Logic
The system calculates pressure:
Pressure = FX × 0.25 + INF × 0.35
Then applies a buffer multiplier:
Buffer = Pressure × 0.4
This buffer controls how strongly biodiesel responds.
🔄 RESPONSE BEHAVIOR
🟢 LOW RISK
Blend resets to baseline (35)
System stabilizes
Import dependency normalised
🟡 MEDIUM RISK
Slight increase in blend ratio
Early buffer activation
Mild dependency fluctuation
🟠 HIGH RISK
Strong blend increase
CPO depletion begins
Import dependency rises
🔴 CRITICAL RISK
Maximum buffer activation
Rapid blend escalation
Emergency stability state
📊 HOW TO MONITOR THE SYSTEM
1. Watch Blend Ratio
Rising steadily = system compensating for stress
Sudden spike = high FX or INF shock
2. Monitor Import Dependency
Increasing value = rising external vulnerability
Key early warning indicator
3. Track CPO Stock
Falling stock = internal buffer depletion
If below 30 → system entering fatigue state
4. Stability Indicator
Pattern
Meaning
NORMAL
stable equilibrium
WATCH
early volatility
STRESSED
active correction mode
EMERGENCY
buffer overloaded
5. Pressure Index (hidden driver)
Calculated internally:
FX + INF → system pressure
If pressure rises:
Blend increases
Stability degrades gradually
Import dependency shifts upward
⚠️ IMPORTANT BEHAVIOR RULES
System is adaptive, not static
Blend is auto-regulated by pressure
Risk does NOT instantly break system (it cascades gradually)
Stability is emergent, not manually set
🧭 SUMMARY
The Biodiesel Layer acts as:
🧠 a real-time energy buffer simulation that absorbs FX and infrastructure stress by dynamically adjusting fuel blending and dependency exposure.
If you want next upgrade, I can add:
📈 live dashboard README diagram
⚡ risk-to-blend visual flowchart
🧠 predictive warning layer (before MEDIUM risk triggers)
🔁 recovery logic explanation section
Just tell me.


Your site is live at https://123agustien.github.io/spd-v12-energy-module/
lePD v12 Energy Module cockpit for adaptive energy scenario simulation, risk evaluation, and policy response modelling (biodiesel, solar, and energy resilience logic).

🛰 SPD v12 // ENERGY MODULE SIMULATOR
Frontend-only resilience simulation module for modeling adaptive energy policy decisions under dynamic global conditions.


In your SPD v12 cockpit, “Scenarios” are the predefined system stress events that simulate real-world disturbances across FX, INF, DC, CYB, and energy layers (including biodiesel impact).
Think of them as controlled chaos inputs that activate your Rule Engine + Risk Engine + Solution Engine.
🔧 CORE SCENARIO TYPES (SPD v12)
💱 1. FX VOLATILITY SCENARIOS
These stress your FX / currency stability layer:
Sudden SGD→IDR spike/dip
Liquidity freeze in FX conversion
Cross-border settlement delay
FX decoupling event (rate becomes unstable)
👉 Impacts: FX, INF cascade, solution routing delays
🌐 2. INF (INFRASTRUCTURE) SCENARIOS
These simulate system or operational failure:
API downtime / backend collapse
Data corruption in simulation engine
GitHub workflow failure (branch sync broken)
UI module freeze (buttons non-responsive)
👉 Impacts: DC + CYB + system integrity score
⚡ 3. DC (DATA CENTER / LOAD) SCENARIOS
These simulate energy + compute stress:
CPU load spike (80% → 99%)
Cooling inefficiency event
Power instability
Overclock simulation failure
👉 Impacts: Energy module + stability graph
🛡️ 4. CYB (CYBER / RISK ATTACK) SCENARIOS
These simulate threat and risk injection:
Cyber intrusion attempt (low/high severity)
Unauthorized API access
Data poisoning event
Rule Engine bypass attempt
👉 Impacts: Risk Panel + Solution Engine activation
🔋 5. ENERGY + BIODIESEL SCENARIOS (your custom layer)
This is your unique SPD layer:
Biodiesel depletion event → CPO stock drops below threshold
Import dependency shock → External supply disrupted (60 → 90+)
Blend ratio instability → Fuel mix no longer optimal (35% breaks efficiency)
Sustainability override event → System forces fallback to synthetic energy mode
👉 Impacts: Energy stability + FX dependency + DC load balancing
🔄 COMBINED CASCADE SCENARIOS (advanced)
These are the real SPD v12 “boss-level” simulations:
FX crash → import cost spike → biodiesel instability
Cyber attack → infrastructure slowdown → energy overload
DC overload → FX liquidity freeze → risk escalation loop
Biodiesel shortage → DC throttling → INF degradation
🧠 HOW SCENARIOS WORK IN YOUR COCKPIT
When you click a scenario:
Inject Event → FX / INF / DC / CYB changes instantly
Rule Engine Runs → Evaluates thresholds (OK / WARNING / FAIL)
Risk Engine Updates → LOW → MEDIUM → HIGH
Solution Engine Activates → Generates mitigation steps
Cascade Graph Updates → Shows system-wide propagation
🚀 EXAMPLE FOR YOUR CURRENT STATE
Your current system:
FX: 0
INF: 0
DC: 0
CYB: 0
Biodiesel: 35 / 100
Import Dependency: 60
Stability: NORMAL
👉 Best scenarios to test first:
FX VOLATILITY: “SGD shock”
ENERGY STRESS: “Import dependency spike”
INF FAILURE: “GitHub sync break”
CYBER LOW: “API probe attack”
If you want, I can next:
generate actual JavaScript scenario engine code for SPD v12
or wire these scenarios into your button system (GitHub branch-ready)
or design a “Scenario Tree Map UI” for your cockpit
Just tell me 👍
This module implements a scenario-based energy strategy simulator using FX, DC, CYB, and INF stress domains.
🎯 Purpose
The Energy Module simulates adaptive energy policy responses based on:
Global oil price conditions
CPO (Crude Palm Oil) availability
Currency volatility (FX)
Infrastructure and cyber stability
It demonstrates how energy strategy shifts under normal vs crisis conditions using a risk-based decision model.
⚙️ Simulation Logic
🟢 1. Normal Conditions (Low Oil Prices)
Prioritize conventional fuel usage
Reduce biodiesel share if subsidy cost is high
Maintain biodiesel production readiness
Objective: Cost efficiency + system readiness
🟠 2. Contingency Conditions (Energy Crisis / Oil Spike)
Increase biodiesel usage (e.g., B35 → B50+)
Reduce fuel import dependency
Activate domestic CPO reserves
Objective: Energy security + supply stability
🟡 3. Strategic Reserves Management
Maintain national diesel reserves
Maintain CPO stockpile for biodiesel conversion
Allocate flexible subsidy buffers
Objective: Crisis preparedness
🔵 4. Continuous Evaluation Layer
System evaluates:
Global oil price trend
CPO market price
FX (currency volatility)
National fiscal capacity
Energy stock levels
Objective: Real-time adaptive policy adjustment
📊 System Outputs
The simulator produces:
🧭 Scenario Panel
Displays active energy condition and triggered event
⚠️ Risk Panel
Classifies system state:
LOW
MEDIUM
HIGH
CRITICAL
🧩 Solution Engine
Suggests adaptive policy responses based on risk level
🔁 Action Sequence Prompt
Step-by-step operational response logic:
Detect condition
Evaluate risk impact
Apply mitigation strategy
Stabilize system
🧠 Design Principle
This module is built on:
Adaptive policy logic instead of fixed policy rules
Meaning:
No static energy strategy
Always reactive to system state
Risk-based decision switching
🏗 Architecture Role
Sextant Protocol
      ↓
Rule Library
      ↓
Energy Module Simulator
      ↓
Risk & Decision Engine
      ↓
Output: Policy Scenario Response
🚀 Status
Frontend: Active
Simulation Engine: Lightweight
Backend: None (pure HTML/JS)
Mode: Deterministic scenario simulation
📌 Key Concept
This module demonstrates:
Energy policy as a dynamic risk-adaptive system, not a fixed regulatory framework.
