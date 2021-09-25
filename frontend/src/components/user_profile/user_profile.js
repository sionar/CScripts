import React from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.props.setUiLoadingUserScriptsStatus(true);
    const username = this.props.match.params.username;
    const token = this.props.auth.token;
    this.props.setUiViewPage('profile');
    this.props.getUserScripts(username, token);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      const username = this.props.match.params.username;
      const token = this.props.auth.token;
      this.props.setUiLoadingUserScriptsStatus(true);
      this.props.getUserScripts(username, token);
    }
  };

  render() {
    let content = <div id='user-profile'><div id='user-profile-content-box'></div></div>;
    if ('user' in this.props.errors.script)
      return <div id='user-profile'><div id='user-profile-content-box'><div id='user-profile-error'>This user could not be found.</div></div></div>;
    if (!this.props.ui.loading.userScripts)
    {
      const username = this.props.match.params.username;
      const scripts = Object.values(this.props.entities.scripts).filter(script => {return script.owner == username});
      const scriptList = scripts.map(script =>
        <div className='user-profile-script'>
          <Link className='user-profile-script-link' to={`/script/${script.id}`}>{script.title}</Link>
        </div>);

      <div className='header-auth-dropdown-button'>
    </div>

      content =
        <div id='user-profile'>
          <div id='user-profile-content-box'>
            <div id='user-profile-username-box'>
              <div id='user-profile-username'>{username}</div>
            </div>
            <div id='user-profile-script-box'>
              <div id='user-profile-script-box-title'>Created Scripts</div>
              <div id='user-profile-script-list'>
                {scriptList}
              </div>
            </div>
          </div>
        </div>;
    }

    return (content);
  };
};

export default UserProfile;