import axios from 'axios';
import Config from 'react-native-config';

import Storage from '../helpers/Storage';

class DetailPerbaikanService {
  static async store(data) {
    const url = `${Config.APP_URL}/api/v1/detailperbaikan`;
    const auth = await Storage.get('auth');

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(response.data);
    } catch (error) {
      throw error;
    }
  }

  static async get(id) {
    const url = `${Config.APP_URL}/api/v1/detailperbaikan`;
    const auth = await Storage.get('auth');

    try {
      const response = await axios.get(url, {
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