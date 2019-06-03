import {
  SAVE_IS_SERVING,
  SAVE_NOT_SERVING,
  FETCHING_DATA,
  DONE_FETCHING_DATA
} from '../actions/pelayananAction';

const pelayananState = {
  isServing: [],
  notServing: [],
  loading: false
};

const pelayananReducer = (state = pelayananState, action) => {
  switch(action.type) {
    case SAVE_IS_SERVING:
      return {...state, isServing: action.data };
    case SAVE_NOT_SERVING:
      return {...state, notServing: action.data };
    case FETCHING_DATA:
      return {...state, loading: action.data};
    case DONE_FETCHING_DATA:
      return {...state, loading: action.data};
    default:
      return state;
  }
};

export default pelayananReducer;