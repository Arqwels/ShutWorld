import $api from "../http";
import { API_ENDPOINTS } from "../utils/constsAPI";

export default class ArtifactService {
  static async getAllArtifact() {
    try {
      return $api.get(API_ENDPOINTS.GET_ALL_ARTIFACT);
    } catch (error) {
      console.error(error); 
    }
  }

  static async getOneArtifact(idName) {
    try {
      return $api.get(API_ENDPOINTS.GET_ONE_ARTIFACT, idName);
    } catch (error) {
      console.error(error);
    }
  }
}