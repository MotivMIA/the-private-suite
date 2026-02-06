// ██████████████████████████████████████████████████
// auth/providers/x.adapter.js
// X (Twitter) OAuth adapter (design-only)
// ██████████████████████████████████████████████████

export default {
  id: 'x',
  label: 'Continue with X',

  init() {
    // reserved for OAuth bootstrap
  },

  isAvailable() {
    return false;
  },

  start() {
    throw new Error('X authentication not enabled yet');
  }
};
