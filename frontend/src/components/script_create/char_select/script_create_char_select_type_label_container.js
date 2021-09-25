import { connect } from 'react-redux';
import { setUiCreateCharSelectTab } from '../../../actions/ui_actions';
import ScriptCreateCharSelectTypeLabel from './script_create_char_select_type_label';

const mapStateToProps = (state, ownProps) => ({
  ui: state.ui,
  type: ownProps.type
});

const mapDispatchToProps = dispatch => ({
  setUiCreateCharSelectTab: (type, status) => dispatch(setUiCreateCharSelectTab(type, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptCreateCharSelectTypeLabel);