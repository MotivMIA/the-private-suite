/**
 * Auth Interface — Stage 3 (Design Only)
 * No implementation allowed in this stage
 */

export const Auth = {
  loginWithEmail(email, password) {},
  loginWithGoogle() {},
  loginWithX() {},

  logout() {},

  getSession() {
    return {
      status: "anonymous | consented | authenticated",
      user: null,
      provider: null
    };
  }
};
