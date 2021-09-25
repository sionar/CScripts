import React from 'react';
import { scriptSize } from '../../../util/constants';

class ScriptCreateCharSelectChar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  };

  handleClick(e) {
    e.preventDefault();
    const characters = this.props.ui.create.version.usedChars.filter(character => {return character.char_type == this.props.character.char_type})
    if (characters.length >= scriptSize[this.props.ui.create.script.script_type][this.props.character.char_type])
      return;
    this.props.addVersionChar(this.props.character);
  };

  render() {
    const character = this.props.entities.characters[this.props.character.id];
    const content =
      <button className='script-create-char-select-char' onClick={this.handleClick}>
        <div className='script-create-char-select-char-image-box'>
          <img className='script-create-char-select-char-image' src={character.image}></img>
        </div>
        <div className='script-create-char-select-char-text'>
          <div className='script-create-char-select-char-label'>{character.name}</div>
          <div className='script-create-char-select-char-info'>
            <div className='script-create-char-select-char-tooltip-desc'>{character.desc1 + ' ' + character.desc2  + ' ' + character.desc3}</div>
          </div>
        </div>
      </button>;

    return (content);
  };
};

export default ScriptCreateCharSelectChar;