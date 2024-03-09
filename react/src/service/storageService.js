const TOKEN = "token";

const storeToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem(TOKEN, JSON.stringify(token));
  } else {
    sessionStorage.setItem(TOKEN, JSON.stringify(token));
  }
};

const getToken = () => {
  const token = localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN);
  return token ? JSON.parse(token) : null;
};

const removeToken = () => {
  localStorage.removeItem(TOKEN);
  sessionStorage.removeItem(TOKEN);
};

export { storeToken, getToken, removeToken };
