import axios from "axios";
export const Axios = axios.create({
  baseURL: "https://budgety-api.herokuapp.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getAuthConfig = (token) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};
