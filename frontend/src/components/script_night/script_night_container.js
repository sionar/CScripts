import { connect } from 'react-redux';
import ScriptNight from './script_night';

const mapStateToProps = (state, ownProps) => ({
  entities: state.entities,
  ui: state.ui,
  size: ownProps.size,
  night: ownProps.night,
  script: ownProps.script
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptNight);