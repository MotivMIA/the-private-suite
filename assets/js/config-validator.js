/* ██████████████████████████████████████████████████
   CONFIG VALIDATOR
   Enforces SITE_CONFIG against SITE_CONFIG_SCHEMA
   ██████████████████████████████████████████████████ */

import SITE_CONFIG from './config/site.config.js';

function waitForConfigAndValidate() {
  if (!window.SITE_CONFIG || !window.SITE_CONFIG_SCHEMA) {
    console.warn('Waiting for SITE_CONFIG and SITE_CONFIG_SCHEMA...');
    setTimeout(waitForConfigAndValidate, 50); // Retry every 50ms
    return;
  }

  const errors = [];

  function validateNode(schemaNode, configNode, path = '') {
    Object.entries(schemaNode).forEach(([key, rules]) => {
      const fullPath = path ? `${path}.${key}` : key;
      const value = configNode?.[key];

      if (rules.required && value === undefined) {
        errors.push(`Missing required config: ${fullPath}`);
        return;
      }

      if (value === undefined) return;

      if (rules.type) {
        if (rules.type === 'array') {
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

      if (typeof rules === 'object' && !rules.type) {
        validateNode(rules, value, fullPath);
      }
    });
  }

  validateNode(window.SITE_CONFIG_SCHEMA, window.SITE_CONFIG);

  if (errors.length) {
    renderFatalError(errors.join('<br>'));
    throw new Error('Config validation failed');
  }

  console.log('SITE_CONFIG validated:', SITE_CONFIG);

  function renderFatalError(message) {
    if (!document.body) {
      console.error('Fatal error: document.body is not available');
      return;
    }

    document.body.innerHTML = `
      <div class="config-fatal-error">
        <h1>Configuration Error</h1>
        <p>${message}</p>
      </div>
    `;
  }
}

// Start validation after DOM is loaded
document.addEventListener('DOMContentLoaded', waitForConfigAndValidate);
