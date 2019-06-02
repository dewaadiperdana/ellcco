import Config from 'react-native-config';
import axios from 'axios';

class PenggunaService {
  static async register(hakAkses, user) {
    let role = hakAkses === 'pelanggan' ? 'pelanggan' : 'tukang';
    const url = `${Config.APP_URL}/api/v1/${role}/register`;
    
    try {
      await axios.post(url, user);

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }

  static async login(hakAkses, user) {
    let role = hakAkses === 'pelanggan' ? 'pelanggan' : 'tukang';
    const url = `${Config.APP_URL}/api/v1/${role}/login`;

    try {
      const response = await axios.post(url, user);
      
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }

  static async getHakAkses() {
    try {
      const url = `${Config.APP_URL}/api/v1/pengguna/hakakses`;
      const response = await axios.get(url);
      
      return Promise.resolve(JSON.parse(response.data.data));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async isAuthenticated(hakAkses, token) {
    let role = hakAkses === 'pelanggan' ? 'pelanggan' : 'tukang';
    const url = `${Config.APP_URL}/api/v1/${role}/is-authenticated`;

    try {
      const response = await axios.post(url, {}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      return Promise.resolve(response.data.isAuthenticated);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
}

export default PenggunaService;