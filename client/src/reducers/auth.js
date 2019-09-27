import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

const intialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function (state = intialState, action) {
  const { type, data } = action;

  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: data
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', data.token);
      return {
        ...state,
        ...data,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state;
  }
}