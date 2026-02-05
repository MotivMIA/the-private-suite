(function () {
  const CONSENT_KEY = "tps_consent";

  window.guardDashboard = function () {
    if (!sessionStorage.getItem(CONSENT_KEY)) {
      window.location.href = "/apply";
    }
  };
})();