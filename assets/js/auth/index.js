// ██████████████████████████████████████████████████
// index.js
// Auth Orchestration
// ██████████████████████████████████████████████████

import emailAdapter from './providers/email.adapter.js';
import googleAdapter from './providers/google.adapter.js';
import xAdapter from './providers/x.adapter.js';

const providers = {
  email: emailAdapter,
  google: googleAdapter,
  x: xAdapter,
};

export function startAuth(provider, credentials = {}) {
  const adapter = providers[provider];
  if (!adapter) {
    console.error(`No adapter found for provider: ${provider}`);
    return;
  }

  adapter.start(credentials);
}