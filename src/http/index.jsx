import axios from "axios";
export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/",
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
