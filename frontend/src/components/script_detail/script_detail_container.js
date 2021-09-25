import { connect } from 'react-redux';
import { getScript, setNightOrder } from '../../actions/script_actions';
import {
  getCharacters,
  setCreateScriptStatus,
  setDeleteScriptStatus,
  resetChars,
  setScript,
  setVersion,
} from '../../actions/script_create_actions';
import {
  setUiLoadingDetailStatus,
  setUiViewPage,
  setUiDetailVersion,
  setUiVisible
  } from '../../actions/ui_actions';
import ScriptDetail from './script_detail';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui,
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  getScript: (id, token) => dispatch(getScript(id, token)),
  getCharacters : (token) => dispatch(getCharacters(token)),
  setCreateScriptStatus : (status) => dispatch(setCreateScriptStatus(status)),
  resetChars: () => dispatch(resetChars()),
  setScript: (script) => dispatch(setScript(script)),
  setVersion: (version) => dispatch(setVersion(version)),
  setUiLoadingDetailStatus: (status) => dispatch(setUiLoadingDetailStatus(status)),
  setUiViewPage: (page) => dispatch(setUiViewPage(page)),
  setUiDetailVersion: (versionNum) => dispatch(setUiDetailVersion(versionNum)),
  setUiVisible: (status) => dispatch(setUiVisible(status)),
  setNightOrder: (characters) => dispatch(setNightOrder(characters)),
  setDeleteScriptStatus: (status) => dispatch(setDeleteScriptStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptDetail);