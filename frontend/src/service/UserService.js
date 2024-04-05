import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class UserService {
  static async getMailMessage() {
    try {
      return $api.get(API_ENDPOINTS.GET_MAIL_MESSAGE);
    } catch (error) {
      console.log(4444);
      console.error(error);
    }
  }

  static async changePassword(data) {
    try {
      return $api.post(API_ENDPOINTS.CHANGE_PASSWORD, data);
    } catch (error) {
      console.log(454545);
      console.error(error);
    }
  }
}