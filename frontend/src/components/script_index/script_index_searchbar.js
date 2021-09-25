import React from 'react';
import { Link } from 'react-router-dom';

class ScriptIndexSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleInput(e) {
    e.preventDefault();
    this.props.setUiIndexSearchTitle(e.target.value)
  };

  handleSelect(e) {
    e.preventDefault();
    const value = e.target.value;
    if (value == 'Any Type')
      this.props.setUiIndexSearchType('Any');
    else
      this.props.setUiIndexSearchType(value); 
  };

  handleSubmit(e) {
    e.preventDefault();
    let params = '?';
    if (this.props.ui.index.scriptType != 'Any')
      params += `type=${this.props.ui.index.scriptType}&`
    if (this.props.ui.index.title != '')
      params += `search=${this.props.ui.index.title}`
    this.props.setUiLoadingIndexStatus(true);
    this.props.getScripts(params);
  };

  render() {

    return (
      <section id='script-index-searchbar-box'>
        <form id='script-index-searchbar-form'>
          <input id='script-index-searchbar-input' type='text' onChange={this.handleInput} value={this.props.ui.index.title} placeholder='Search for scripts by title...' autoComplete='off'/>
          <select id='script-index-searchbar-select' onChange={this.handleSelect}>
            <option>Any Type</option>
            <option>Normal</option>
            <option>Teensyville</option>
            <option>Phobos</option>
          </select>
          <input id='script-index-searchbar-submit' type='submit' value='Search' onClick={this.handleSubmit}/>
        </form>
      </section>
    );
  };
};

export default ScriptIndexSearchbar;