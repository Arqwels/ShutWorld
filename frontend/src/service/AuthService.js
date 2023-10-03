import $api from "../http";

export default class AuthService {
  static async registration(nickname,email,password,useragreement) {
    return $api.post('api/user/registration', { nickname,email,password,useragreement })
  }

  static async login(nickname, password) {
    return $api.post('api/user/login', { nickname, password })
  }

  static async logout() {
    return $api.post('api/user/logout')
  }
}