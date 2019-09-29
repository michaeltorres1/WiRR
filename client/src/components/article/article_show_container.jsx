import { connect } from 'react-redux';
import { visitPage } from '../../actions/article_actions';
import { ArticleShow } from './article_show';

const mapStateToProps = (state, ownProps) => {
    // Question : Why is the currentUser not being passed down here?
    // I passed down in app
    // side noted : It's avilable in state so you don't really need to pass it down
    
    return {
        article: state.entities.article
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        visitPage: (pageUrl) => dispatch(visitPage(pageUrl)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (ArticleShow)