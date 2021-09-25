import { connect } from 'react-redux';
import Header from './header';

const mapStateToProps = state => ({
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);