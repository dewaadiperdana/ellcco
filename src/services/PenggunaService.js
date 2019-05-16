import Config from 'react-native-config';
import axios from 'axios';

class PenggunaService {
  static async register(user) {
    const url = `${Config.APP_URL}/api/pengguna/register`;
    
    try {
      await axios.post(url, user);

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(JSON.parse(error.response.data.data));
    }
  }

  static async login(user) {
    const url = `${Config.APP_URL}/api/pengguna/login`;

    try {
      const response = await axios.post(url, user);
      
      return Promise.resolve(response.data.data);
    } catch (error) {
      return Promise.reject(JSON.parse(error.response.data.data));
    }
  }

  static async getHakAkses() {
    try {
      const url = `${Config.APP_URL}/api/pengguna/hakakses`;
      const response = await axios.get(url);
      
      return Promise.resolve(JSON.parse(response.data.data));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async isAuthenticated(token) {
    const url = `${Config.APP_URL}/api/pengguna/is-authenticated`;

    try {
      const checkIsAuthenticated = await axios.post(url, {}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const verified = JSON.parse(checkIsAuthenticated.data.data);

      return Promise.resolve(verified.isAuthenticated);
    } catch (error) {
      // 
    }
  }
}

export default PenggunaService;