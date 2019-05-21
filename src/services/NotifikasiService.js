import Config from 'react-native-config';
import axios from 'axios';
import Storage from '../helpers/Storage';

class NotifikasiService {
  static auth = {};

  constructor() {
    NotifikasiService.getAuth();
  }

  static async getAuth() {
    NotifikasiService.auth = await Storage.get('auth');
  }

  static async getNotifikasi() {
    const auth = await Storage.get('auth');
    const url = `${Config.APP_URL}/api/notifikasi/${auth.id}`;

    try {
      const notifikasi = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(JSON.parse(notifikasi.data.data));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async tandaiSudahDibaca(id) {
    const url = `${Config.APP_URL}/api/notifikasi/mark-as-read`;
    const auth = await Storage.get('auth');

    try {
      await axios.post(url, { id: id }, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getNotifikasiBelumDibaca() {
    const auth = await Storage.get('auth');
    const url = `${Config.APP_URL}/api/notifikasi/get-unread-notification/${auth.id}`;

    try {
      const notifikasi = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(JSON.parse(notifikasi.data.data));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default NotifikasiService;