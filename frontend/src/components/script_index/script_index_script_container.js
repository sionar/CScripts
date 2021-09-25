import { connect } from 'react-redux';
import ScriptIndexScript from './script_index_script';

const mapStateToProps = (state, ownProps) => ({
  entities: state.entities,
  ui: state.ui,
  script: ownProps.script
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptIndexScript);