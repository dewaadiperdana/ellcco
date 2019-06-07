import axios from "axios";
import Config from "react-native-config";

import Storage from "../helpers/Storage";
import Perbaikan from "../models/perbaikan";

class DetailPerbaikanService {
  static async store(data) {
    const url = `${Config.APP_URL}/api/v1/detailperbaikan/add`;
    const auth = await Storage.get("auth");

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }

  static async delete(id) {
    const url = `${Config.APP_URL}/api/v1/detailperbaikan/delete/${id}`;
    const auth = await Storage.get("auth");

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(response.data);
    } catch (error) {
      throw error;
    }
  }

  static async list(id) {
    const url = `${Config.APP_URL}/api/v1/detailperbaikan/${id}`;
    const auth = await Storage.get("auth");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(response.data.map(item => new Perbaikan(item)));
    } catch (error) {
      throw error;
    }
  }
}

export default DetailPerbaikanService;
