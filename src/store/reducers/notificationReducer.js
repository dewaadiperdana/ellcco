import {
  SAVE_UNREAD_NOTIFICATIONS,
  SAVE_ALL_NOTIFICATIONS
} from "../actions/notificationAction";

const notificationsState = {
  unread: [],
  all: []
};

const notificationReducer = (state = notificationsState, action) => {
  switch (action.type) {
    case SAVE_UNREAD_NOTIFICATIONS:
      return { ...state, unread: action.data };
    case SAVE_ALL_NOTIFICATIONS:
      return { ...state, all: action.data };
    default:
      return state;
  }
};

export default notificationReducer;
