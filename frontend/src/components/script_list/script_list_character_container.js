import { connect } from 'react-redux';
import { removeVersionChar } from '../../actions/script_create_actions';
import ScriptListCharacter from './script_list_character';

const mapStateToProps = (state, ownProps) => ({
  entities: state.entities,
  ui: state.ui,
  id: ownProps.id,
  size: ownProps.size
});

const mapDispatchToProps = dispatch => ({
  removeVersionChar: (character) => dispatch(removeVersionChar(character))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptListCharacter);