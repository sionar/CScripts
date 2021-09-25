import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  setUiViewPage, 
  setUiViewEditing,
  setUiViewMode,
  setUiLoadingExportJsonStatus,
} from '../../actions/ui_actions';
import { setDeleteScriptId } from '../../actions/script_create_actions';
import { setModalActive, setModalType } from '../../actions/modal_actions';
import ScriptNavbar from './script_navbar';

const mapStateToProps = state => ({
  entities: state.entities,
  auth: state.auth,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  setUiViewEditing: (mode) => dispatch(setUiViewEditing(mode)),
  setUiViewMode: (mode) => dispatch(setUiViewMode(mode)),
  setUiLoadingExportJsonStatus: (loading) => dispatch(setUiLoadingExportJsonStatus(loading)),
  setModalActive: (active) => dispatch(setModalActive(active)),
  setModalType: (modalType) => dispatch(setModalType(modalType)),
  setDeleteScriptId: (scriptId) => dispatch(setDeleteScriptId(scriptId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScriptNavbar));