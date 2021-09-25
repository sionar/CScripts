import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createScript, saveNewVersion, updateVersion } from '../../actions/script_create_actions';
import { setUiLoadingPostScript} from '../../actions/ui_actions';
import ScriptCreateSubmit from './script_create_submit';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  createScript: (script, version, characters, token) => dispatch(createScript(script, version, characters, token)),
  saveNewVersion: (script, version, characters, token) => dispatch(saveNewVersion(script, version, characters, token)),
  updateVersion: (script, version, characters, token) => dispatch(updateVersion(script, version, characters, token)),
  setUiLoadingPostScript: (status) => dispatch(setUiLoadingPostScript(status))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScriptCreateSubmit));