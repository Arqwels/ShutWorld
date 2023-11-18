import axios from "axios";

const $api = axios.create({
  withCredentials: true, // Использование куки
  baseURL: process.env.REACT_APP_API_URL // Базовый URL
})
// Перехватчик запросов Axios, перед каждый запросом, добавляется заголовок Authorization с токеном, полученный из Локального хранилища
$api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

export default $api;