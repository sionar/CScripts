import React from 'react';
import ScriptListContainer from '../script_list/script_list_container'

class ScriptCreateList extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let content = <div id='script-create-list'></div>;
    if (!this.props.ui.loading.create) {
      const title = this.props.ui.create.script.title;
      const characters = this.props.ui.create.version.usedChars;
      const scriptType = this.props.ui.create.script.script_type;
      content = <ScriptListContainer size='small' title={title} scriptType={scriptType} characters={characters}/>
    };
    return (content) ;
  };
};

export default ScriptCreateList;