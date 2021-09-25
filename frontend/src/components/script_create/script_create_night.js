import React from 'react';
import ScriptNight from '../script_night/script_night_container';

class ScriptCreateNight extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let content = null;
    if (!this.props.ui.loading.create) {
      const script = this.props.ui.create.script;
      const size = 'small';
      content = 
      <div className='script-night-box'>
        <ScriptNight size={size} night='first' script={script}/>
        <ScriptNight size={size} night='other' script={script}/>
      </div>;
    }
    return (content) ;
  };
};

export default ScriptCreateNight;