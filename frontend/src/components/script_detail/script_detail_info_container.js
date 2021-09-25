import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setUiVisible } from '../../actions/ui_actions';
import ScriptDetailInfo from './script_detail_info';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  setUiVisible: (status) => dispatch(setUiVisible(status))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScriptDetailInfo));