import axios from "axios";
import { SERVER_URL, RPODUCTION_SERVER_URL } from "../utils/env";

const $api = axios.create({
  withCredentials: true, // Использование куки
  baseURL: SERVER_URL || RPODUCTION_SERVER_URL
})
console.log(SERVER_URL);
// Перехватчик запросов Axios, перед каждый запросом, добавляется заголовок Authorization с токеном, полученный из Локального хранилища
$api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

export default $api;