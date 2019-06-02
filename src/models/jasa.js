class Jasa {
  id = '';
  nama = '';
  channel = '';
  createdAt = '';
  updatedAt = '';

  constructor(input) {
    Object.assign(this, input);
  }
}

export default Jasa;