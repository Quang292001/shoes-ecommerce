const AccessTokenKey = "accessToken";

export const tokenStorage = {
  getAccessToken() {
    return localStorage.getItem(AccessTokenKey);
  },

  setAccessToken(accessToken) {
    localStorage.setItem(AccessTokenKey, accessToken);
  },

  clear() {
    localStorage.removeItem(AccessTokenKey);
  },
};