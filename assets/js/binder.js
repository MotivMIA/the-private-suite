/**
 * Template Binder
 * Replaces {placeholders} with values from site.config.js
 * Unresolved tokens are highlighted visibly (bind-error)
 */

(function () {
  if (!window.SITE_CONFIG) {
    console.error("SITE_CONFIG is missing.");
    return;
  }

  const CONFIG = window.SITE_CONFIG;

  function resolvePath(obj, path) {
    return path.split('.').reduce((acc, key) => {
      if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
        return acc[key];
      }
      return undefined;
    }, obj);
  }

  function bindText(node) {
    const pattern = /\{([^}]+)\}/g;
    const text = node.nodeValue;
    let match;
    let fragments = [];
    let lastIndex = 0;

    while ((match = pattern.exec(text)) !== null) {
      const key = match[1].trim();
      const value = resolvePath(CONFIG, key);

      fragments.push(
        document.createTextNode(text.slice(lastIndex, match.index))
      );

      if (value !== undefined && value !== null && value !== "") {
        fragments.push(document.createTextNode(value));
      } else {
        const span = document.createElement("span");
        span.className = "bind-error";
        span.textContent = `{${key}}`;
        fragments.push(span);
      }

      lastIndex = pattern.lastIndex;
    }

    if (fragments.length) {
      fragments.push(document.createTextNode(text.slice(lastIndex)));
      fragments.forEach(f => node.parentNode.insertBefore(f, node));
      node.parentNode.removeChild(node);
    }
  }

  function bindAttributes(root) {
    const nodes = root.querySelectorAll('[data-bind\\:]');
  
    nodes.forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (!attr.name.startsWith('data-bind:')) return;
  
        const realAttr = attr.name.replace('data-bind:', '');
        const key = attr.value.trim();
        const value = resolvePath(CONFIG, key);
  
        if (value !== undefined && value !== "") {
          el.setAttribute(realAttr, value);
        } else {
          el.setAttribute(realAttr, '');
          el.classList.add('bind-error');
        }
  
        el.removeAttribute(attr.name);
      });
    });
  }  
  
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      bindText(node);
      return;
    }
    node.childNodes.forEach(walk);
  }

  function runBinder() {
    bindAttributes(document.body);
    walk(document.body);
  }
  

  // Initial + dynamic hydration
  document.addEventListener("DOMContentLoaded", runBinder);
  window.addEventListener("content:loaded", runBinder);
  window.addEventListener("content:hydrated", runBinder);

})();
