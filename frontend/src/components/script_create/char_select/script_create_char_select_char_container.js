import { connect } from 'react-redux';
import { addVersionChar } from '../../../actions/script_create_actions';
import ScriptCreateCharSelectChar from './script_create_char_select_char';

const mapStateToProps = (state, ownProps) => ({
  ui: state.ui,
  entities: state.entities,
  character: ownProps.character
});

const mapDispatchToProps = dispatch => ({
  addVersionChar: (character) => dispatch(addVersionChar(character))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptCreateCharSelectChar);