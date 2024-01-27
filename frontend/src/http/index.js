import axios from "axios";
import { SERVER_URL, PRODUCTION_SERVER_URL } from "../utils/env";

// Определяем базовый URL в зависимости от среды выполнения
const baseURL = process.env.NODE_ENV === "production" ? PRODUCTION_SERVER_URL : SERVER_URL;

const $api = axios.create({
  withCredentials: true, // Использование куки
  baseURL: baseURL
});

// Перехватчик запросов Axios, перед каждым запросом добавляется заголовок Authorization с токеном, полученным из Локального хранилища
$api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api;
