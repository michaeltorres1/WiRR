import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, type) => dispatch => {
  const id = uuid.v4();

  dispatch ({
    type: SET_ALERT,
    data: { msg, type, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, data: id }), 3000);
};