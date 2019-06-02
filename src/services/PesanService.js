import axios from 'axios';
import Config from 'react-native-config';
import Storage from '../helpers/Storage';
import User from '../models/user';
import Jasa from '../models/jasa';
import Pemesanan from '../models/pemesanan';

class PesanService {
  static async pesan(data) {
    const url = `${Config.APP_URL}/api/pesanan/pesan`;
    const auth = await Storage.get('auth');

    const pesanData = {
      ...data,
      id_pelanggan: auth.id
    };

    try {
      await axios.post(url, pesanData, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(JSON.parse(error.response.data.data));
    }
  }

  static async detail(id) {
    const url = `${Config.APP_URL}/api/v1/pemesanan/${id}`;
    const auth = await Storage.get('auth');

    try {
      const response = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      let detail = new Pemesanan(response.data);
      detail.jasa = new Jasa(detail.jasa);
      detail.pelanggan = new User(detail.pelanggan);
      detail.tukang = new User(detail.tukang);

      return Promise.resolve(detail);
    } catch (error) {
      throw error;
    }
  }

  static async terima(id) {
    const url = `${Config.APP_URL}/api/v1/pemesanan/terima`;
    const auth = await Storage.get('auth');

    try {
      const response = await axios.post(url,
        {
          id_pesanan: id,
          id_tukang: auth.akun.id
        },
        {
          headers: {
            "Authorization": `Bearer ${auth.token}`
          }
        }
      );

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }

  static async histori() {
    const auth = await Storage.get('auth');
    const url = `${Config.APP_URL}/api/v1/pemesanan/histori/${auth.akun.hak_akses}/${auth.akun.id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(response.data.map(item => new Pemesanan(item)));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default PesanService;