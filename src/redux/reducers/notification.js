import {
  SAVE_GET_ALL_NOTIFICATION,
  SAVE_CREATE_NOTIFICATION,
  SAVE_UPDATE_NOTIFICATION,
  SAVE_REMOVE_NOTIFICATION,
} from '../actions/types';
import update from "./immutability";

const initialState = {
  listNotification: [],
}
 
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_GET_ALL_NOTIFICATION:
      return {...state, listNotification: payload };

    // case SAVE_GET_SINGLE_NOTIFICATION:
    //   return {...state, selectedNotification: payload };
      
    case SAVE_CREATE_NOTIFICATION:
      return {
        ...state,
        listNotification: [payload, ...state.listNotification],
      }
    
    case SAVE_UPDATE_NOTIFICATION:
      return update(state, {
        listNotification: {
          $findIndex: [payload._id, payload]
        }
      })

    case SAVE_REMOVE_NOTIFICATION:
      return update(state, {
        listNotification: {
          $findIndex: [payload._id]
        }
      })

    default:
      return state;
  }
}