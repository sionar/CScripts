import { connect } from 'react-redux';
import { setModalActive } from '../../actions/modal_actions';
import { resetChars, addVersionChar, setUploadJsonErrors } from '../../actions/script_create_actions';
import ModalUploadJson from './modal_upload_json';

const mapStateToProps = state => ({
  ui: state.ui,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  setModalActive: (status) => dispatch(setModalActive(status)),
  resetChars: () => dispatch(resetChars()),
  addVersionChar: (character) => dispatch(addVersionChar(character)),
  setUploadJsonErrors: (status) => dispatch(setUploadJsonErrors(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalUploadJson);