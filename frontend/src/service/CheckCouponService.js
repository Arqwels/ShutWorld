import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class CheckCouponService {
  static async checkCoupon(data) {
    try {
      return $api.post(API_ENDPOINTS.CHECK_COUPON, data);
    } catch (error) {
      console.error(error); 
    }
  }
}