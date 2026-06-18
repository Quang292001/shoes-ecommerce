const AccessTokenKey = "accessToken";

function getPayload(accessToken) {
  if (!accessToken) {
    return null;
  }

  try {
    const payload = accessToken.split(".")[1];

    if (!payload) {
      return null;
    }

    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function getRoleFromPayload(payload) {
  if (!payload) {
    return null;
  }

  return (
    payload.role ||
    payload.Role ||
    payload.roles ||
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    null
  );
}

export const tokenStorage = {
  getAccessToken() {
    return localStorage.getItem(AccessTokenKey);
  },

  setAccessToken(accessToken) {
    localStorage.setItem(AccessTokenKey, accessToken);
  },

  getRole() {
    const accessToken = this.getAccessToken();
    const payload = getPayload(accessToken);

    return getRoleFromPayload(payload);
  },

  clear() {
    localStorage.removeItem(AccessTokenKey);
  },
};