import {
  SAVE_PESAN_OBROLAN,
  SAVE_RUANG_OBROLAN
} from "../actions/ruangObrolanAction";
import RuangObrolan from "../../models/ruangobrolan";

const pesanState = {
  pesanObrolan: [],
  ruangObrolan: new RuangObrolan({})
};

const ruangObrolanReducer = (state = pesanState, action) => {
  switch (action.type) {
    case SAVE_PESAN_OBROLAN:
      return { ...state, pesanObrolan: action.data };
    default:
      return state;
  }
};

export default ruangObrolanReducer;
