class Notifikasi {
  id = "";
  id_pelanggan = "";
  id_tukang = "";
  judul = "";
  deskripsi = "";
  tanggal = "";
  dibaca = null;
  tipe = "";
  data = "";

  constructor(input) {
    Object.assign(this, input);
  }
}

export default Notifikasi;
