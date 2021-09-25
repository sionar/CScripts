import React from 'react';
import ScriptNightCharacter from './script_night_character_container';

class ScriptNight extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const characters = this.props.ui.view.editing || this.props.ui.view.page == 'create' ?
      this.props.ui.create.nightOrder[this.props.night] :
      this.props.ui.detail.nightOrder[this.props.night]; 
    const nightHeader = this.props.night == 'first' ? 'First Night' : 'Other Nights';
    const entries = characters.map(character => <ScriptNightCharacter size={this.props.size} night={this.props.night} character={character}/>)
    const style = this.props.ui.view.mode == 'script' ? {display: 'none'} : {};
    const content = 
      <main id={`script-night-${this.props.night}`} className={`script-night ${this.props.size}`} style={style}>
        <div className={`script-night-header ${this.props.size}`}>
          <div className={`script-night-header-night ${this.props.size}`}>{nightHeader}</div>
          <div className={`script-night-header-name ${this.props.size}`}>{this.props.script.title}</div>
        </div>
        <div className={`script-night-content-box ${this.props.size}`} >
          {entries}
        </div>
      </main>
    return (content);
  };
};

export default ScriptNight;