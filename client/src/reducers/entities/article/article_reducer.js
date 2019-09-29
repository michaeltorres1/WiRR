import {
  RECEIVE_ARTICLE,
  DELETE_ARTICLE,
  RECEIVE_VISIT_PAGE
} from '../../../actions/types';

const articleReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_ARTICLE:
      return Object.assign({}, state, action.article.data);
    case DELETE_ARTICLE:
      newState = Object.assign({}, state);
      delete newState[action.articleId];
      return newState;
    case RECEIVE_VISIT_PAGE:
      newState = Object.assign({}, state, action.response);
      return newState;
    default:
      return state;
  }
}

export default articleReducer;