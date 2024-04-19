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

  static async getOneRank(rankId) {
    try {
      return await $api.get(API_ENDPOINTS.GET_ONE_RANK, rankId);
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
  static async addArtifact(data) {
    try {
      return await $api.post(API_ENDPOINTS.POST_ADDARTIFACT, data);
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteRank(rankId) {
    try {
      return await $api.delete(`${API_ENDPOINTS.DELETE_RANK}/${rankId}`);
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteArtifact(idName) {
    try {
      return await $api.delete(`${API_ENDPOINTS.DELETE_ARTIFACT}/${idName}`);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateRank(data) {
    try {
      return await $api.put(API_ENDPOINTS.UPDATE_RANK, data);
    } catch (error) {
      console.error(error);
    }
  }
  static async updateArtifact(data) {
    try {
      return await $api.put(API_ENDPOINTS.UPDATE_ARTIFACT, data);
    } catch (error) {
      console.error(error);
    }
  }
}