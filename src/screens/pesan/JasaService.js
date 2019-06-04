import axios from "axios";
import Jasa from "../models/jasa";
import Config from "react-native-config";

class JasaService {
  static async index(limit = null) {
    const url = !limit
      ? `${Config.APP_URL}/api/v1/jasa/${limit}`
      : `${Config.APP_URL}/api/v1/jasa`;

    try {
      const response = await axios.get(url);
      console.log(response.data);

      return Promise.resolve(response.data.map(item => new Jasa(item)));
    } catch (error) {
      return Promise.resolve(error);
    }
  }
}

export default JasaService;
