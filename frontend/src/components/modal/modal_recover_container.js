import { connect } from 'react-redux';
import { sendRecoverEmail, recoverChangePassword, setRecoverErrorPasswordLength, setRecoverErrorPasswordsMatch } from '../../actions/auth_actions';
import { setRecoverField, setRecoverEmailSent, setRecoverPasswordChanged, clearRecoverState } from '../../actions/ui_auth_actions';
import { setModalActive, setModalType } from '../../actions/modal_actions';
import { setUiLoadingRecoverEmailStatus, setUiLoadingRecoverPasswordStatus } from '../../actions/ui_actions';
import ModalRecover from './modal_recover';

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  sendRecoverEmail: (email) => dispatch(sendRecoverEmail(email)),
  recoverChangePassword: (data) => dispatch(recoverChangePassword(data)),
  setModalActive: (status) => dispatch(setModalActive(status)),
  setModalType: (modalType) => dispatch(setModalType(modalType)),
  setRecoverField: (field, input) => dispatch(setRecoverField(field, input)),
  setRecoverEmailSent: (status) => dispatch(setRecoverEmailSent(status)),
  setRecoverPasswordChanged: (status) => dispatch(setRecoverPasswordChanged(status)),
  setRecoverErrorPasswordLength: () => dispatch(setRecoverErrorPasswordLength()),
  setRecoverErrorPasswordsMatch: () => dispatch(setRecoverErrorPasswordsMatch()),
  setUiLoadingRecoverEmailStatus: (status) => dispatch(setUiLoadingRecoverEmailStatus(status)),
  setUiLoadingRecoverPasswordStatus: (status) => dispatch(setUiLoadingRecoverPasswordStatus(status)),
  clearRecoverState: () => dispatch(clearRecoverState())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRecover);