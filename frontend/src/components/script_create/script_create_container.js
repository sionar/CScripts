import { connect } from 'react-redux';
import { setUiLoadingCreateStatus, setUiViewPage } from '../../actions/ui_actions';
import { 
  clearScript,
  getCharacters,
  initializeCreateScript,
  setScriptOwner,
  setCreateScriptStatus
  } from '../../actions/script_create_actions';
import ScriptCreate from './script_create';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  clearScript: () => dispatch(clearScript()),
  setCreateScriptStatus: (status) => dispatch(setCreateScriptStatus(status)),
  getCharacters: (token) => dispatch(getCharacters(token)),
  initializeCreateScript: () => dispatch(initializeCreateScript()),
  setScriptOwner: (owner) => dispatch(setScriptOwner(owner)),
  setUiViewPage: (page) => dispatch(setUiViewPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptCreate);