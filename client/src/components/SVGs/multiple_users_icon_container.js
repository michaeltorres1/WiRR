import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { MultipleUsersIcon } from './multiple_users_icon'; 

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modal) => dispatch(openModal(modal))
    }
}

export default connect(
    null,
    mapDispatchToProps)
    (MultipleUsersIcon)