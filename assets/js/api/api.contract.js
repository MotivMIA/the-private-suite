/**
 * API Contract — Stage 3
 * Defines how data will be requested
 */

export const API = {
  auth: {
    login() {},
    logout() {},
    session() {}
  },

  users: {
    me() {}
  },

  agreements: {
    accept() {},
    status() {}
  }
};
