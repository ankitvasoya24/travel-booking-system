import axios from "axios";

const userAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

userAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default userAPI;