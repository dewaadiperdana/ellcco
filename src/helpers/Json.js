class Json {
  static isValid(str) {
    try {
      JSON.parse(str);
    } catch (error) {
      return false;
    }

    return true;
  }
}

export default Json;