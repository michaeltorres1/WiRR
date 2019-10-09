import {connect} from 'react-redux';
import {createArticle, searchDB} from '../../actions/article_actions';
import WikiSearch from './search';

const mstp = (state, ownProps) => {
  const defaultFields = {
    search_text: '',
    search_result: [],
    search_articles: [],
    score: '',
  };
  return  {article: state.article, defaultFields}
}

const mdtp = () => (dispatch) => ({
  createArticle: (article) => dispatch(createArticle(article)),
  searchDB: (keyword) => dispatch(searchDB(keyword))
})

export default connect(mstp, mdtp)(WikiSearch);