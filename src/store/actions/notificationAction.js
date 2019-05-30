import NotifikasiService from '../../services/NotifikasiService';

const SAVE_ALL_NOTIFICATIONS = 'SAVE_ALL_NOTIFICATIONS';
const SAVE_UNREAD_NOTIFICATIONS = 'SAVE_UNREAD_NOTIFICATIONS';

const saveUnreadNotifications = unreadNotifications => {
  return {
    type: SAVE_UNREAD_NOTIFICATIONS,
    data: unreadNotifications
  };
};

const saveAllNotifications = notifications => {
  return {
    type: SAVE_ALL_NOTIFICATIONS,
    data: notifications
  };
};

const fetchUnreadNotifications = () => {
  return async dispatch => {
    try {
      const unreadNotifications = await NotifikasiService.getNotifikasiBelumDibaca();

      dispatch(saveUnreadNotifications(unreadNotifications));
    } catch (error) {
      throw error;
    }
  };
};

const fetchAllNotifications = () => {
  return async dispatch => {
    try {
      const allNotifications = await NotifikasiService.getNotifikasi();

      dispatch(saveAllNotifications(allNotifications));
    } catch (error) {
      throw error;
    }
  };
};

export {
  SAVE_UNREAD_NOTIFICATIONS,
  SAVE_ALL_NOTIFICATIONS,
  saveUnreadNotifications,
  fetchUnreadNotifications,
  fetchAllNotifications
};