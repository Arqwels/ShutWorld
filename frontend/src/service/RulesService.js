import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class RulesService {
  static async getRules() {
    try {
      return $api.get(API_ENDPOINTS.GET_RULES);
    } catch (error) {
      console.log(error)
    }
  }
};