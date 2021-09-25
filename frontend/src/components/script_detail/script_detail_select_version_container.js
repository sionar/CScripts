import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setNightOrder } from '../../actions/script_actions';
import { setUiDetailVersion } from '../../actions/ui_actions';
import ScriptDetailSelectVersion from './script_detail_select_version';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  setUiDetailVersion: (version) => dispatch(setUiDetailVersion(version)),
  setNightOrder: (characters) => dispatch(setNightOrder(characters))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScriptDetailSelectVersion));