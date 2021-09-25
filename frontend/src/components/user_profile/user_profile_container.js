import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setUiLoadingUserScriptsStatus, setUiViewPage } from '../../actions/ui_actions';
import { getUserScripts } from '../../actions/script_actions';
import UserProfile from './user_profile';

const mapStateToProps = state => ({
  auth: state.auth,
  entities: state.entities,
  ui: state.ui,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  setUiLoadingUserScriptsStatus: (status) => dispatch(setUiLoadingUserScriptsStatus(status)),
  getUserScripts: (username, token) => dispatch(getUserScripts(username, token)),
  setUiViewPage: (page) => dispatch(setUiViewPage(page))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));