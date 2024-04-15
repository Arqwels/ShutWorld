import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class GetAllArtifactService {
  static async getAllArtifact() {
    try {
      return $api.get(API_ENDPOINTS.GET_ALL_ARTIFACT);
    } catch (error) {
      console.error(error); 
    }
  }
}