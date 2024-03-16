import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class CreateOrderService {
  static async createOrderDonate(data) {
    try {
      return $api.post(API_ENDPOINTS.CREATE_ORDER_DONATE, data);
    } catch (error) {
      console.error(error); 
    }
  }
}