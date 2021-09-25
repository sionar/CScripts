import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScriptDetailNight from './script_detail_night';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScriptDetailNight));