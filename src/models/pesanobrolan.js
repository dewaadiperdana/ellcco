class PesanObrolan {
  id = "";
  id_pelanggan = "";
  id_tukang = "";
  id_ruang_obrolan = "";
  isi = "";
  tanggal = "";
  dibaca = null;
  owned = null;

  constructor(input) {
    Object.assign(this, input);
  }
}

export default PesanObrolan;
