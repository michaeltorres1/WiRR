import { combineReducers } from 'redux';
import { articleReducer } from './article/article_reducer';

export const entitiesReducer = combineReducers({
    article: articleReducer
});