# ⚙️ SPD v12 // SCENARIO LIBRARY

## 📌 Overview

This file defines all scenario inputs used in SPD v12.

Scenarios are **controlled system stress events** that trigger:
- FX / INF / DC / CYB changes  
- Risk recalculation  
- Biodiesel response adjustment  
- System-wide cascade effects  

---

# 🧠 SCENARIO SYSTEM LOGIC

Each scenario acts as:

```text id="scenario_logic"
Input → State Change → Risk Engine → Response Engine → UI Update
