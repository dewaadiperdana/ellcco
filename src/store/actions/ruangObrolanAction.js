import RuangObrolanService from "../../services/RuangObrolanService";

const FETCH_PESAN_OBROLAN = "FETCH_PESAN_OBROLAN";
const SAVE_PESAN_OBROLAN = "SAVE_PESAN_OBROLAN";

const savePesanObrolan = pesan => {
  return {
    type: SAVE_PESAN_OBROLAN,
    data: pesan
  };
};

const fetchPesanObrolan = idRuangObrolan => {
  return async dispatch => {
    try {
      const pesan = await RuangObrolanService.getPesan(idRuangObrolan);

      dispatch(savePesanObrolan(pesan));
    } catch (error) {
      throw error;
    }
  };
};

export { FETCH_PESAN_OBROLAN, SAVE_PESAN_OBROLAN, fetchPesanObrolan };
