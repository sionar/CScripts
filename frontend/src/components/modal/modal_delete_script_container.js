

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setModalActive } from '../../actions/modal_actions';
import { setUiLoadingDeleteScriptStatus } from '../../actions/ui_actions';
import { setDeleteScriptStatus } from '../../actions/script_create_actions';
import { deleteScript } from '../../actions/script_actions';
import ModalDeleteScript from './modal_delete_script';

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  setModalActive: (status) => dispatch(setModalActive(status)),
  setUiLoadingDeleteScriptStatus: (loading) => dispatch(setUiLoadingDeleteScriptStatus(loading)),
  setDeleteScriptStatus: (status) => dispatch(setDeleteScriptStatus(status)),
  deleteScript: (scriptId, token) => dispatch(deleteScript(scriptId, token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalDeleteScript));