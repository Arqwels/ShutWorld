import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class GetRanksService {
  static async getRanks() {
    try {
      return $api.get(API_ENDPOINTS.GET_RANKS_DONATE);
    } catch (error) {
      console.error(error); 
    }
  }
}