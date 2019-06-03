import axios from 'axios';
import Config from 'react-native-config';

import Storage from '../helpers/Storage';

class PelayananService {
  static async list() {
    const auth = await Storage.get('auth');
    const url = `${Config.APP_URL}/api/v1/pelayanan/list/${auth.akun.id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.resolve(error);
    }
  }

  static async add(jasa) {
    const auth = await Storage.get('auth');
    const url = `${Config.APP_URL}/api/v1/pelayanan/add`;

    try {
      const response = await axios.post(url, {
        id_tukang: auth.akun.id,
        id_jasa: jasa
      }, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(response.data);
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    const auth = await Storage.get('auth');
    const url = `${Config.APP_URL}/api/v1/pelayanan/delete/${id}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(response.data);
    } catch (error) {
      throw error;
    }
  }
}

export default PelayananService;