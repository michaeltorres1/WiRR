import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';

import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/users/auth');

    dispatch ({
      type: USER_LOADED,
      data: res.data
    });
  } catch (err) {
    dispatch ({
      type: AUTH_ERROR
    });
  }
}

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('api/users/register', body, config);
    dispatch ({
      type: REGISTER_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch ({
      type: REGISTER_FAIL
    });
  }
}

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('api/users/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
}