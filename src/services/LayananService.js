import Config from 'react-native-config';
import axios from 'axios';

class LayananService {
  static async getLayanan(limit = null) {
    const url = limit !== null ? `${Config.APP_URL}/api/layanan/${limit}` : `${Config.APP_URL}/api/layanan`;

    try {
      const layanan = await axios.get(url);

      return Promise.resolve(JSON.parse(layanan.data.data));
    } catch (error) {
      console.log(error.response.data.data);
    }
  }
}

export default LayananService;