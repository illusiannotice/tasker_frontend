import axios from "axios";

export const api = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    timeout: 10000,
    withCredentials: true,
    headers: {
    'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)