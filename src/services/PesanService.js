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

  static async terima(kode) {
    const urlKode = `${Config.APP_URL}/api/pesanan/get-by-kode/${kode}`;
    const urlTerima = `${Config.APP_URL}/api/pesanan/terima`;
    const auth = await Storage.get('auth');

    try {
      const pesanan = await axios.get(urlKode, { headers: { "Authorization": `Bearer ${auth.token}` } });
      const data = JSON.parse(pesanan.data.data);
      const response = await axios.post(urlTerima,
        {
          id_pesanan: data.id,
          id_pengguna: auth.id
        },
        {
          headers: {
            "Authorization": `Bearer ${auth.token}`
          }
        }
      );

      return Promise.resolve(JSON.parse(response.data.data));
    } catch (error) {
      return Promise.reject(JSON.parse(error.response.data.data));
    }
  }
}

export default PesanService;