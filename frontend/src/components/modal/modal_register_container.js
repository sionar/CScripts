import { connect } from 'react-redux';
import { register, setRegisterErrorPasswordLength, setRegisterErrorPasswordsMatch } from '../../actions/auth_actions';
import { setRegisterField, clearRegisterState } from '../../actions/ui_auth_actions';
import { setModalActive, setModalType } from '../../actions/modal_actions';
import { setUiLoadingRegisterStatus } from '../../actions/ui_actions';
import ModalRegister from './modal_register';

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  register: (user, token) => dispatch(register(user, token)),
  setModalActive: (status) => dispatch(setModalActive(status)),
  setModalType: (modalType) => dispatch(setModalType(modalType)),
  setRegisterField: (field, input) => dispatch(setRegisterField(field, input)),
  clearRegisterState: () => dispatch(clearRegisterState()),
  setUiLoadingRegisterStatus: (status) => dispatch(setUiLoadingRegisterStatus(status)),
  setRegisterErrorPasswordLength: () => dispatch(setRegisterErrorPasswordLength()),
  setRegisterErrorPasswordsMatch: () => dispatch(setRegisterErrorPasswordsMatch())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRegister);