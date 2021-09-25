import React from 'react';
import ScriptNight from '../script_night/script_night_container';

class ScriptDetailNight extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let content = null;
    if (!this.props.ui.loading.detail) {
      const script = this.props.ui.view.editing ? 
        this.props.ui.create.script :
        this.props.entities.scripts[this.props.match.params.id];
      const size = this.props.ui.view.editing ? 'small' : 'large';
      content = 
      <div className='script-night-box'>
        <ScriptNight size={size} night='first' script={script}/>
        <ScriptNight size={size} night='other' script={script}/>
      </div>;
    }
    return (content) ;
  };
};

export default ScriptDetailNight;