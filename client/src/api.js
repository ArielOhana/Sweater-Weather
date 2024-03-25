const { AxiosInstance } = require("axios");

export const arielServer = new AxiosInstance({
  baseUrl: import.meta.env.VITE_REACT_APP_CALL,
});

arielServer.get("/");
