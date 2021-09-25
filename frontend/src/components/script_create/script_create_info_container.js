import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
  setScriptTitle,
  setScriptAuthor,
  setScriptDescription,
  setScriptVisible,
  setScriptType,
  trimUsedCharacters,
  createScript,
  } from '../../actions/script_create_actions';
import ScriptCreateInfo from './script_create_info';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  setScriptTitle: (title) => dispatch(setScriptTitle(title)),
  setScriptAuthor: (author) => dispatch(setScriptAuthor(author)),
  setScriptDescription: (description) => dispatch(setScriptDescription(description)),
  setScriptType: (scriptType) => dispatch(setScriptType(scriptType)),
  setScriptVisible: (visible) => dispatch(setScriptVisible(visible)), 
  trimUsedCharacters: (scriptType) => dispatch(trimUsedCharacters(scriptType))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScriptCreateInfo));