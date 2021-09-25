import { connect } from 'react-redux';
import { login } from '../../actions/auth_actions';
import { setLoginField, clearLoginState } from '../../actions/ui_auth_actions';
import { setModalActive, setModalType } from '../../actions/modal_actions';
import { setUiLoadingLoginStatus } from '../../actions/ui_actions';
import ModalLogin from './modal_login';

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  login: (user, token) => dispatch(login(user, token)),
  setModalActive: (status) => dispatch(setModalActive(status)),
  setModalType: (modalType) => dispatch(setModalType(modalType)),
  setLoginField: (field, input) => dispatch(setLoginField(field, input)),
  clearLoginState: () => dispatch(clearLoginState()),
  setUiLoadingLoginStatus: (status) => dispatch(setUiLoadingLoginStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);