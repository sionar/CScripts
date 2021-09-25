import { connect } from 'react-redux';
import { setFilterInput } from '../../../actions/script_create_actions';
import ScriptCreateCharSelect from './script_create_char_select';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  setFilterInput: (text) => dispatch(setFilterInput(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptCreateCharSelect);