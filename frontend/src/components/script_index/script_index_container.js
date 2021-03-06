import { connect } from 'react-redux';
import { getScripts } from '../../actions/script_actions';
import { setUiLoadingIndexStatus, setUiViewPage } from '../../actions/ui_actions';
import ScriptIndex from './script_index';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  getScripts: (params) => dispatch(getScripts(params)),
  setUiLoadingIndexStatus: status => dispatch(setUiLoadingIndexStatus(status)),
  setUiViewPage: page => dispatch(setUiViewPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptIndex);