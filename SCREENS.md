# 🖥 SPD v12 // SYSTEM SCREENS

## 📌 Overview

This document defines the two core visualization screens used in SPD v12:

1. 🛢 Biodiesel Economy Screen  
2. ⛽ Diesel Economy Screen  

Both screens simulate **energy cost distribution, subsidy allocation, and consumer burden under 100% demand coverage**.

---

# 🛢 SCREEN 1 — BIODIESEL ECONOMY DASHBOARD

## 📌 Purpose

This screen models:
- Biodiesel blending system (CPO-based fuel mix)
- Domestic energy buffer usage
- Import dependency reduction strategy
- Government subsidy distribution logic

---

## ⚙️ SYSTEM ASSUMPTION

- Total demand = 100% supplied
- Supply mix = Biodiesel + controlled imports
- Government adjusts subsidy dynamically

---

## 🧮 COST MODEL

```text id="biodiesel_cost_model"
Total Cost per Liter = Base Energy Cost + FX Pressure + Supply Adjustment
