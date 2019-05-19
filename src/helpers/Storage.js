import AsyncStorage from '@react-native-community/async-storage';
import Json from './Json';

class Storage {
  static async has(key) {
    const item = await AsyncStorage.getItem(key);

    return item === null ? false : true;
  }

  static async get(key) {
    if (!Storage.has(key)) {
      return null;
    }

    const item = await AsyncStorage.getItem(key);

    if (Json.isValid(item)) {
      return JSON.parse(item);
    }

    return item;
  }

  static async put(key, value) {
    let item = typeof value === 'object' ? JSON.stringify(value) : value;

    await AsyncStorage.setItem(key, item);
  }

  static async delete(key) {
    if (!Storage.has(key)) {
      return null;
    }

    await AsyncStorage.removeItem(key);
  }
}

export default Storage;