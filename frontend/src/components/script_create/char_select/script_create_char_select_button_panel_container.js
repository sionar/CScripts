import { connect } from 'react-redux';
import { resetChars, addVersionChar, setUploadJsonErrors } from '../../../actions/script_create_actions';
import { setModalActive, setModalType } from '../../../actions/modal_actions';
import ScriptCreateCharSelectButtonPanel from './script_create_char_select_button_panel';

const mapStateToProps = (state, ownProps) => ({
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  resetChars: () => dispatch(resetChars()),
  addVersionChar: (character) => dispatch(addVersionChar(character)),
  setModalActive: (status) => dispatch(setModalActive(status)),
  setModalType: (modalType) => dispatch(setModalType(modalType)),
  setUploadJsonErrors: (status) => dispatch(setUploadJsonErrors(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptCreateCharSelectButtonPanel);