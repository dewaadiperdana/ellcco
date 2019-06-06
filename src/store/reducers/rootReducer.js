import { combineReducers } from "redux";

import notificationReducer from "./notificationReducer";
import pelayananReducer from "./pelayananReducer";
import ruangObrolanReducer from "./ruangObrolanReducer";

const rootReducer = combineReducers({
  notifications: notificationReducer,
  pelayanan: pelayananReducer,
  ruangObrolan: ruangObrolanReducer
});

export default rootReducer;
