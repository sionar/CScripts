import { connect } from 'react-redux';
import ScriptNightCharacter from './script_night_character';

const mapStateToProps = (state, ownProps) => ({
  ui: state.ui,
  size: ownProps.size,
  night: ownProps.night,
  character: ownProps.character
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptNightCharacter);