import React from 'react';

class ScriptListCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e) {
    e.preventDefault();
    if (this.props.ui.view.page == 'create' || this.props.ui.view.editing == true) {
      const character = this.props.entities.characters[this.props.id];
      this.props.removeVersionChar(character);
    };
  };

  render() {
    const character = this.props.entities.characters[this.props.id];
    const size = this.props.size;
    const crossOrigin = this.props.ui.view.page == 'detail' && !this.props.ui.view.editing ? 'anonymous' : null;
    const detailCache = this.props.ui.view.page == 'detail' && !this.props.ui.view.editing ? '&detail' : '';
    let characterClass = `script-list-character-name-blue ${size}`;
    if (character.char_type == 'Minion' || character.char_type == 'Demon') {
      characterClass = `script-list-character-name-red ${size}`;
    };

    return (
      <div className={`script-list-character-box ${size}`} onClick={this.handleClick}>
        <div className={`script-list-character-image ${size}`}>
          <img crossOrigin={crossOrigin} src={`${character.image}${detailCache}`}/>
        </div>
        <div className={`script-list-character-text-box ${size}`}>
          <div className={characterClass}>{character.name}</div>
          <div className={`script-list-character-desc ${size}`}>{character.desc1}</div>
          <div className={`script-list-character-desc ${size}`}>{character.desc2}</div>
          <div className={`script-list-character-desc ${size}`}>{character.desc3}</div>
        </div>
      </div>
    );
  };
};

export default ScriptListCharacter;