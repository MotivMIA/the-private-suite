/* ██████████████████████████████████████████████████
   CONFIG VALIDATOR
   Enforces SITE_CONFIG against SITE_CONFIG_SCHEMA
   ██████████████████████████████████████████████████ */

   (function () {
    if (!window.SITE_CONFIG || !window.SITE_CONFIG_SCHEMA) {
      renderFatalError("Missing SITE_CONFIG or SITE_CONFIG_SCHEMA");
      throw new Error("Config system missing");
    }
  
    const errors = [];
  
    function validateNode(schemaNode, configNode, path = "") {
      Object.entries(schemaNode).forEach(([key, rules]) => {
        const fullPath = path ? `${path}.${key}` : key;
        const value = configNode?.[key];
  
        if (rules.required && value === undefined) {
          errors.push(`Missing required config: ${fullPath}`);
          return;
        }
  
        if (value === undefined) return;
  
        if (rules.type) {
          if (rules.type === "array") {
            if (!Array.isArray(value)) {
              errors.push(`Expected array at ${fullPath}`);
            }
          } else if (typeof value !== rules.type) {
            errors.push(`Expected ${rules.type} at ${fullPath}`);
          }
        }
  
        if (rules.allowed && !rules.allowed.includes(value)) {
          errors.push(`Invalid value for ${fullPath}`);
        }
  
        if (typeof rules === "object" && !rules.type) {
          validateNode(rules, value, fullPath);
        }
      });
    }
  
    validateNode(window.SITE_CONFIG_SCHEMA, window.SITE_CONFIG);
  
    if (errors.length) {
      renderFatalError(errors.join("<br>"));
      throw new Error("Config validation failed");
    }
  
    function renderFatalError(message) {
      document.body.innerHTML = `
        <div class="config-fatal-error">
          <h1>Configuration Error</h1>
          <p>${message}</p>
        </div>
      `;
    }
  })();
  