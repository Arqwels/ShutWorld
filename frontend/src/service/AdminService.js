import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class AdminService {
  static async getUsers() {
    try {
      return $api.get(API_ENDPOINTS.GET_USERS);
    } catch (error) {
      console.error(error); 
    }
  }

  static async addRank(data) {
    try {
      return await $api.post(API_ENDPOINTS.POST_ADDRANK, data);
    } catch (error) {
      console.error(error);
    }
  }
}