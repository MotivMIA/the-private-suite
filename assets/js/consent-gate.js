(function () {
  const CONSENT_KEY = "tps_consent";

  window.requireConsent = function (onAccept) {
    if (sessionStorage.getItem(CONSENT_KEY)) {
      onAccept();
      return;
    }

    fetch("/sections/legal-consent.html")
      .then(res => res.text())
      .then(html => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);

        wrapper.querySelector("#consent-accept").onclick = () => {
          sessionStorage.setItem(CONSENT_KEY, "true");
          wrapper.remove();
          onAccept();
        };

        wrapper.querySelector("#consent-decline").onclick = () => {
          wrapper.remove();
        };
      });
  };
})();
