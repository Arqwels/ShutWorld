import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class UserService {
  static async getMailMessage() {
    try {
      return $api.get(API_ENDPOINTS.GET_MAIL_MESSAGE);
    } catch (error) {
      console.error(error);
    }
  }

  static async changePassword(data) {
    try {
      return $api.post(API_ENDPOINTS.CHANGE_PASSWORD, data);
    } catch (error) {
      console.error(error);
    }
  }

  static async gettingOrderHistory() {
    try {
      return $api.get(API_ENDPOINTS.GETTING_ORDER_HISTORY);
    } catch (error) {
      console.error(error);
    }
  }
}