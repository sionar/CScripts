import React from 'react';
import ScriptListCharacter from './script_list_character_container';

class ScriptListCharacterBox extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let content = null;
    let characters = this.props.characters;
    let size = this.props.size
    let label = this.props.type;
    if (label != 'Townsfolk' && label != 'Fabled')
      label += 's';
    characters = characters.filter(character => {
      return this.props.entities.characters[character.id].char_type == this.props.type
    });
    if (characters.length == 0)
      return null;

    let boxClassName = `script-list-type-box-townsfolk ${size}`;
    if (this.props.type != 'Townsfolk')
      boxClassName = `script-list-type-box-non-townsfolk ${size}`;
    let characterList = characters.map(character => 
      <ScriptListCharacter id={character.id} size={size}/>);
    
    const charBoxHeight = size == 'large' ? 96 : 67;
    let maxHeight = Math.ceil(characterList.length/2)*charBoxHeight;
    let minHeight;
    let boxClassStyle = { maxHeight: maxHeight };
    if (this.props.scriptType == 'Normal') {
      if (this.props.type == 'Townsfolk')
        minHeight = 6 * charBoxHeight;
      else if (this.props.type == 'Outsider' || this.props.type == 'Minion' || this.props.type == 'Demon')
        minHeight = 2 * charBoxHeight;
      boxClassStyle.minHeight = minHeight;
    }
      
    content = 
      <div className={boxClassName} style={boxClassStyle}>
        <div className={`script-list-character-side-label ${size}`}>
          <div className='script-list-character-side-label-text'>
            {label}
          </div>
        </div>
        <div className={`script-list-characters-box ${size}`}>
          {characterList}
        </div>
      </div>;
    return (content);
  };
};

export default ScriptListCharacterBox;