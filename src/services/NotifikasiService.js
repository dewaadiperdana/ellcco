import Config from 'react-native-config';
import axios from 'axios';
import Storage from '../helpers/Storage';
import Notifikasi from '../models/notifikasi';

class NotifikasiService {
  static auth = {};

  constructor() {
    NotifikasiService.getAuth();
  }

  static async getAuth() {
    NotifikasiService.auth = await Storage.get('auth');
  }

  static async single(id) {
    const auth = await Storage.get('auth');

    try {
      const url = `${Config.APP_URL}/api/v1/notifikasi/${id}`;

      const response = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(new Notifikasi(response.data));
    } catch (error) {
      alert(error);
    }
  }

  static async getNotifikasi() {
    const auth = await Storage.get('auth');
    const role = auth.akun.hak_akses === 'pelanggan' ? 'pelanggan' : 'tukang';
    const url = `${Config.APP_URL}/api/v1/notifikasi/${role}/${auth.akun.id}`;

    try {
      const notifikasi = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(notifikasi.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async tandaiSudahDibaca(id) {
    const url = `${Config.APP_URL}/api/v1/notifikasi/mark-as-read`;
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
    const role = auth.akun.hak_akses === 'pelanggan' ? 'pelanggan' : 'tukang';
    const url = `${Config.APP_URL}/api/v1/notifikasi/unread/${role}/${auth.akun.id}`;

    try {
      const notifikasi = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(notifikasi.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default NotifikasiService;