import {RECEIVE_ARTICLE, DELETE_ARTICLE, RECEIVE_ARTICLE_ERRORS} from './types';
import * as ArticleUtil from '../utils/articles_util';

const receiveArticle = (article) => ({
  type: RECEIVE_ARTICLE,
  article
})

const deleteArticle = (articleId) => ({
  type: DELETE_ARTICLE,
  articleId
})

const receiveArticleErrors = (err) => ({
  type: RECEIVE_ARTICLE_ERRORS,
  err
})

export const createArticle = (article) => dispatch => ArticleUtil.createArticle(article)
  .then(
    (article) => dispatch(receiveArticle(article)),
    (err) => dispatch(receiveArticleErrors(err))
  )

export const searchDB = (keyword) => dispatch => ArticleUtil.searchDB(keyword)
  .then(
    (article) => dispatch(receiveArticle(article)),
    (err) => dispatch(receiveArticleErrors(err))
  )