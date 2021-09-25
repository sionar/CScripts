import { connect } from 'react-redux';
import { logout, addAuthUser, getGuestAccount } from '../../actions/auth_actions';
import { setModalActive, setModalType } from '../../actions/modal_actions';
import HeaderAuth from './header_auth';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  addAuthUser: (user) => dispatch(addAuthUser(user)),
  setModalActive: (active) => dispatch(setModalActive(active)),
  setModalType: (modalType) => dispatch(setModalType(modalType)),
  getGuestAccount : () => dispatch(getGuestAccount())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuth);