import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class PostVKService {
  static async reqPostVK() {
    try {
      return $api.get(API_ENDPOINTS.GET_POST_VK);
    } catch (error) {
      console.error(error); 
    }
  }
}