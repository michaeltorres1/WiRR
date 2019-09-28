import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_ALERT:
      return [action.data];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.data);
    default:
      return state;
  }
}