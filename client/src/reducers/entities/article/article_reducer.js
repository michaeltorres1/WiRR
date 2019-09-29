import {RECEIVE_ARTICLE, DELETE_ARTICLE} from '../../../actions/types';

const articleReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ARTICLE:
      return Object.assign({}, state, action.article.data);
    case DELETE_ARTICLE:
      let newState = Object.assign({}, state);
      delete newState[action.articleId];
      return newState;
    default:
      return state;
  }
}

export default articleReducer;