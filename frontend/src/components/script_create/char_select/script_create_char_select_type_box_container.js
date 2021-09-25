import { connect } from 'react-redux';
import ScriptCreateCharSelectTypeBox from './script_create_char_select_type_box';

const mapStateToProps = (state, ownProps) => ({
  ui: state.ui,
  type: ownProps.type,
  characters: ownProps.characters
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptCreateCharSelectTypeBox);