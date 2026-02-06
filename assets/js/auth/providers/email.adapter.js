// ██████████████████████████████████████████████████
// auth/providers/email.adapter.js
// Email authentication adapter (design-only)
// ██████████████████████████████████████████████████

import emailAuth from './email.adapter.js';

export default {
  id: 'email',
  label: 'Continue with Email',

  init() {
    // reserved for Phase 3
  },

  isAvailable() {
    return true; // Set to true if email auth is ready
  },

  start(credentials) {
    if (!this.isAvailable()) {
      throw new Error('Email authentication not enabled yet');
    }

    console.log('Starting email authentication with:', credentials);
    // Add your email auth logic here
  }
};
