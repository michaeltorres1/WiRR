import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert_reducer';
import { articleReducer } from './entities/article/article_reducer';
import { entitiesReducer } from './entities/entities_reducer';

export default combineReducers ({
  entities: entitiesReducer,
  auth,
  alert,
  article: articleReducer
});