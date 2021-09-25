import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScriptCreateNight from './script_create_night';

const mapStateToProps = state => ({
  ui: state.ui,
  entities: state.entities
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScriptCreateNight));