import { combineReducers } from 'redux';

import notificationReducer from './notificationReducer';
import pelayananReducer from './pelayananReducer';

const rootReducer = combineReducers({
  notifications: notificationReducer,
  pelayanan: pelayananReducer
});

export default rootReducer;