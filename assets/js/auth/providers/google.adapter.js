// ██████████████████████████████████████████████████
// auth/providers/google.adapter.js
// Google OAuth adapter (design-only)
// ██████████████████████████████████████████████████

export default {
  id: 'google',
  label: 'Continue with Google',

  init() {
    // reserved for OAuth bootstrap
  },

  isAvailable() {
    return false;
  },

  start() {
    throw new Error('Google authentication not enabled yet');
  }
};
