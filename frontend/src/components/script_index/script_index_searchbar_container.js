import { connect } from 'react-redux';
import { getScripts } from '../../actions/script_actions';
import { setUiIndexSearchTitle, setUiIndexSearchType, setUiLoadingIndexStatus } from '../../actions/ui_actions';
import ScriptIndexSearchbar from './script_index_searchbar';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  getScripts: (params) => dispatch(getScripts(params)),
  setUiIndexSearchTitle: (title) => dispatch(setUiIndexSearchTitle(title)),
  setUiIndexSearchType: (scriptType) => dispatch(setUiIndexSearchType(scriptType)),
  setUiLoadingIndexStatus: (status) => dispatch(setUiLoadingIndexStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptIndexSearchbar);