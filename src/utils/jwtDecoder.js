export const jwtDecode = (token) => {
    try {
      const [, decodedRaw] = token.split('.');
      const data = JSON.parse(atob(decodedRaw));
      return {
        createdAt: data.iat,
        id: data.sub.id,
        login: data.sub.login,
        permission: data.sub.acl[1]
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };
  