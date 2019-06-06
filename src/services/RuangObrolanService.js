import axios from "axios";
import Config from "react-native-config";

import Storage from "../helpers/Storage";
import PesanObrolan from "../models/pesanobrolan";
import RuangObrolan from "../models/ruangobrolan";

class RuangObrolanService {
  static async get(idPemesanan) {
    const auth = await Storage.get("auth");
    const url = `${
      Config.APP_URL
    }/api/v1/ruangobrolan/by-pemesanan/${idPemesanan}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(new RuangObrolan(response.data));
    } catch (error) {
      throw error;
    }
  }

  static async getPesan(idRuangObrolan) {
    const auth = await Storage.get("auth");
    const url = `${Config.APP_URL}/api/v1/ruangobrolan/pesan/${
      auth.akun.hak_akses
    }/${idRuangObrolan}/${auth.akun.id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(response.data.map(item => new PesanObrolan(item)));
    } catch (error) {
      throw error;
    }
  }
}

export default RuangObrolanService;
