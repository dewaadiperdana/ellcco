class User {
  id = '';
  kode = '';
  nama = '';
  email = '';
  aktif = null;
  alamat = '';
  no_telp = '';
  hak_akses = '';
  token = null;
  socket = null;

  constructor(input) {
    Object.assign(this, input);
  }
}

export default User;