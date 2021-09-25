import { connect } from 'react-redux';
import ScriptCreateList from './script_create_list';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptCreateList);