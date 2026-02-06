/* ██████████████████████████████████████████████████
   SITE CONFIG SCHEMA
   Defines the required shape of site.config.js
   ██████████████████████████████████████████████████ */
/**
 * SITE_CONFIG_SCHEMA
 * - Validates shape of window.SITE_CONFIG
 * - Template-safe (no business assumptions)
 * - Forks may EXTEND but must not BREAK this schema
 */
   window.SITE_CONFIG_SCHEMA = {

    /* ==================================================
       Environment
       ================================================== */
    env: {
      mode: {
        type: 'string',
        required: true,
        allowed: ['template', 'development', 'production']
      },
      debug: {
        type: 'boolean',
        required: false,
        default: false
      }
    },
  
    /* ==================================================
       Brand
       ================================================== */
    brand: {
  
      /* ---------- Identity ---------- */
      identity: {
        name: {
          type: 'string',
          required: true
        },
        tagline: {
          type: 'string',
          required: false
        },
        description: {
          type: 'string',
          required: true
        }
      },
  
      /* ---------- Contact ---------- */
      contact: {
        address: {
          type: 'string',
          required: false
        },
        email: {
          type: 'string',
          required: false,
          format: 'email'
        },
        phone: {
          type: 'string',
          required: false
        }
      },
  
      /* ---------- Social ---------- */
      social: {
        instagram: { type: 'string', required: false },
        x:         { type: 'string', required: false },
        tiktok:    { type: 'string', required: false },
        youtube:   { type: 'string', required: false }
      }
    },
  
    /* ==================================================
       Metadata / SEO
       ================================================== */
    meta: {
      title: {
        type: 'string',
        required: true
      },
      description: {
        type: 'string',
        required: true
      },
      keywords: {
        type: 'array',
        required: false,
        items: { type: 'string' }
      }
    },
  
    /* ==================================================
       Legal
       ================================================== */
    legal: {
      privacyUrl: {
        type: 'string',
        required: true
      },
      termsUrl: {
        type: 'string',
        required: true
      },
      copyrightYear: {
        type: 'string',
        required: false
      }
    },
  
    /* ==================================================
       Calls to Action
       ================================================== */
    cta: {
      primary: {
        type: 'string',
        required: false
      },
      applyUrl: {
        type: 'string',
        required: false
      }
    },
  
    /* ==================================================
       Feature Flags (Future)
       ================================================== */
    features: {
      authEnabled: {
        type: 'boolean',
        required: false,
        default: false
      },
      dashboardEnabled: {
        type: 'boolean',
        required: false,
        default: false
      }
    },
  
    /* ==================================================
       Auth (Future, Stub Only)
       ================================================== */
    auth: {
      provider: {
        type: 'string',
        required: false
      },
      allowRegistration: {
        type: 'boolean',
        required: false
      }
    }
  };
  