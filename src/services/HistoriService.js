import Config from 'react-native-config';
import axios from 'axios';

class HistoriService {
  static async getHistori(type, id, token) {
    try {
      const url = `${Config.APP_URL}/api/pesanan/histori/${type}/${id}`;

      const histori = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      return Promise.resolve(!histori.data.data ? null : JSON.parse(histori.data.data));
    } catch (error) {
      console.log(error);
    }
  }
}

export default HistoriService;