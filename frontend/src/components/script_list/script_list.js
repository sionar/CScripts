import React from 'react';
import ScriptListCharacterBox from './script_list_character_box_container';

class ScriptList extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const characters = this.props.characters;
    const size = this.props.size;
    const scriptType = this.props.scriptType;
    const style = this.props.ui.view.mode == 'script' ? {} : {display: 'none'};
    const mainId = this.props.ui.view.page == 'detail' ? 'script-list' : null;
    const indexClass = this.props.ui.view.page == 'index' ? 'index' : null;

    const content = 
      <main id={mainId} className={`script-list ${size} ${indexClass}`} style={style}>
        <div className={`script-list-left-bar ${size}`}></div>
        <div className={`script-list-header ${size}`}>
          <div className={`script-list-header-left ${size}`}></div>
          <div className={`script-list-title ${size}`}>{this.props.title}</div>
        </div>
        <ScriptListCharacterBox characters={characters} type='Townsfolk' scriptType={scriptType} size={size}/>
        <ScriptListCharacterBox characters={characters} type='Outsider' scriptType={scriptType} size={size}/>
        <ScriptListCharacterBox characters={characters} type='Minion' scriptType={scriptType} size={size}/>
        <ScriptListCharacterBox characters={characters} type='Demon' scriptType={scriptType} size={size}/>
        <ScriptListCharacterBox characters={characters} type='Traveller' scriptType={scriptType} size={size}/>
        <ScriptListCharacterBox characters={characters} type='Fabled' scriptType={scriptType} size={size}/>
        <div className={`script-list-footer ${size}`}>
          <div className={`script-list-footer-text ${size}`}>* Not on the first night</div>
          <div className={`script-list-footer-disclaimer ${size}`}>This script is not affiliated with The Pandemonium Institute. All content on this page is property of Steven Medway and The Pandemonium Institute.</div>
        </div>
      </main>;

    return (content);
  };
};

export default ScriptList;