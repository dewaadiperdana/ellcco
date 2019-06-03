import PelayananService from '../../services/PelayananService';
import Jasa from '../../models/jasa';
import PelayananJasa from '../../models/pelayananjasa';

const SAVE_IS_SERVING = 'SAVE_IS_SERVING';
const SAVE_NOT_SERVING = 'SAVE_NOT_SERVING';
const FETCHING_DATA = 'FETCHING_DATA';
const DONE_FETCHING_DATA = 'DONE_FETCHING_DATA';

const fetchingData = () => {
  return {
    type: FETCHING_DATA,
    data: true
  };
};

const doneFetchingData = () => {
  return {
    type: DONE_FETCHING_DATA,
    data: false
  };
};

const saveIsServing = servingList => {
  return {
    type: SAVE_IS_SERVING,
    data: servingList
  };
}

const saveNotServing = notServingList => {
  return {
    type: SAVE_NOT_SERVING,
    data: notServingList
  };
}

const fetchServingAndNotServingList = () => {
  return async dispatch => {
    dispatch(fetchingData());

    try {
      const lists = await PelayananService.list();

      dispatch(saveIsServing(lists.isServing.map(item => {
        item.PelayananJasa = new PelayananJasa(item.PelayananJasa);

        return item;
      })));
      dispatch(saveNotServing(lists.notServing.map(item => new Jasa(item))));

      dispatch(doneFetchingData());
    } catch (error) {
      dispatch(doneFetchingData());
      throw error;
    }
  }
};

export {
  SAVE_IS_SERVING,
  SAVE_NOT_SERVING,
  FETCHING_DATA,
  DONE_FETCHING_DATA,
  fetchServingAndNotServingList
};