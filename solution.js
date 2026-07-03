(function () {

  // 🔹 SYSTEM STATE (adjust later if you already have engine.js)
  const state = {
    biodiesel: 35,
    oilPrice: 90
  };

  // 🔹 RULE ENGINE
  function getSolution() {

    if (state.biodiesel < 40) {
      return "DIESEL_EXPORT";
    }

    if (state.oilPrice < 50) {
      return "OIL_EXPORT";
    }

    if (state.oilPrice > 80) {
      return "BIODIESEL";
    }

    return "STABLE";
  }

  // 🔹 UI BIND (connects to EXISTING HTML buttons)
  function updateUI() {

    const solution = getSolution();

    const dieselBtn = document.getElementById("btn-diesel");
    const oilBtn = document.getElementById("btn-oil");
    const bioBtn = document.getElementById("btn-biodiesel");

    if (dieselBtn) {
      dieselBtn.classList.toggle("active", solution === "DIESEL_EXPORT");
    }

    if (oilBtn) {
      oilBtn.classList.toggle("active", solution === "OIL_EXPORT");
    }

    if (bioBtn) {
      bioBtn.classList.toggle("active", solution === "BIODIESEL");
    }
  }

  // 🔹 RUN ON LOAD
  document.addEventListener("DOMContentLoaded", function () {
    updateUI();
  });

})();
