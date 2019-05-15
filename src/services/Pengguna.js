import Config from 'react-native-config';
import axios from 'axios';

class Pengguna {
  static async register(user) {
    const url = `${Config.APP_URL}/api/pengguna/register`;
    
    try {
      const register = await axios.post(url, user);

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(JSON.parse(error.response.data.data));
    }
  }

  static async getHakAkses() {
    try {
      const url = `${Config.APP_URL}/api/pengguna/hakakses`;
      const response = await axios.get(url);
      
      return Promise.resolve(response.data.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

export default Pengguna;