import Jasa from "./jasa";
import User from "./user";

class Pemesanan {
  id = "";
  id_pelanggan = "";
  id_tukang = null;
  id_jasa = "";
  kode = "";
  tanggal = "";
  biaya = null;
  kerusakan = "";
  deskripsi = "";
  status = "";
  createdAt = "";
  updatedAt = "";
  jasa = new Jasa({});
  pelanggan = new User({});
  tukang = new User({});

  constructor(input) {
    Object.assign(this, input);
  }
}

export default Pemesanan;
