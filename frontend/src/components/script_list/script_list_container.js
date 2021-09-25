import { connect } from 'react-redux';
import ScriptList from './script_list';

const mapStateToProps = (state, ownProps) => ({
  entities: state.entities,
  ui: state.ui,
  size: ownProps.size,
  title: ownProps.title,
  scriptType: ownProps.scriptType,
  characters: ownProps.characters
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptList);