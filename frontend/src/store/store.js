import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";
import { SERVER_URL, PRODUCTION_SERVER_URL } from "../utils/env";
import { toast } from "react-toastify";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async registration(nickname,email,password,useragreement) {
    try {
      const response = await AuthService.registration(nickname,email,password,useragreement);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      if (error.response?.data?.errors.error === "Nickname busy") {
        toast.error("Никнейм занят, выберите другой.", {autoClose: 2000});
        return "NicknameBusy";
      }
      console.log(error.response?.data?.message);
    }
  }

  async login(nickname, password) {
    try {
      const response = await AuthService.login(nickname, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

// В методе checkAuth
  async checkAuth() {
    const url = process.env.NODE_ENV === "production" ? PRODUCTION_SERVER_URL : SERVER_URL;
    this.setLoading(true);
    try {
      const cachedToken = localStorage.getItem('token'); // Получаем токен из локального хранилища
      if (cachedToken) {
        const response = await axios.get(`${url}api/user/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken); // Обновляем токен в локальном хранилище
        this.setAuth(true);
        this.setUser(response.data.user);
      }
    } catch (error) {
      console.log(555111);
      // localStorage.removeItem('token');
      console.log(error.response?.data?.message);
    } finally {
      setTimeout(() => {
        this.setLoading(false);
      }, 0);
    }
  }

}