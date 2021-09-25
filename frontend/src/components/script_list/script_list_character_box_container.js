import { connect } from 'react-redux';
import ScriptListCharacterBox from './script_list_character_box';

const mapStateToProps = (state, ownProps) => ({
  entities: state.entities,
  ui: state.ui,
  size: ownProps.size,
  scriptType: ownProps.scriptType,
  type: ownProps.type,
  characters: ownProps.characters
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptListCharacterBox);