import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert_reducer';
import articleReducer from './article_reducer';

export default combineReducers ({
  auth,
  alert,
  article: articleReducer
});