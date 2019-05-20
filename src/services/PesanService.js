import axios from 'axios';
import Config from 'react-native-config';
import Storage from '../helpers/Storage';

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

  static async detail(idPesanan, idPelanggan, idTukang = null) {
    const url = `${Config.APP_URL}/api/pesanan/detail/${idPesanan}/${idPelanggan}${idTukang ? `/${idTukang}` : ''}`;
    const auth = await Storage.get('auth');

    try {
      const detail = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });

      return Promise.resolve(JSON.parse(detail.data.data));
    } catch (error) {
      throw error;
    }
  }
}

export default PesanService;