import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScriptDetailContent from './script_detail_content';

const mapStateToProps = state => ({
  entities: state.entities,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScriptDetailContent));