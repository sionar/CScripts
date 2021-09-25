import React from 'react';

class ModalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitchModal = this.handleSwitchModal.bind(this);
    this.props.clearLoginState();
  };

  handleClose(e) {
    e.preventDefault();
    this.props.setModalActive(false);
  };

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.props.setLoginField(field, e.target.value);
    };
  };

  handleSubmit(e) {
    e.preventDefault();
    const user = this.props.ui.login;
    const token = this.props.auth.token;
    this.props.setUiLoadingLoginStatus(true);
    this.props.login(user, token).then(res => {
      this.props.setModalActive(false);
      this.props.clearLoginState();
    })
    .catch(() => {})
    .then(() => {
      this.props.setUiLoadingLoginStatus(false);
    });
  };

  handleSwitchModal(modalType) {
    return (e) => {
      e.preventDefault();
      this.props.setModalType(modalType);
    };
  };

  render() {
    let content = null;
    let errorsBox = <div id='modal-login-error-notif'></div>;
    let submitButton = <input className='modal-login-submit' type='submit' onClick={this.handleSubmit} value='Login'/>;
    if (this.props.ui.loading.login)
      submitButton = <input className='modal-login-submit' type='submit' onClick={this.handleSubmit} value='Logging in...' disabled={true}/>;
    else if (this.props.ui.login.username == '' || this.props.ui.login.password == '' || this.props.errors.auth.loginFailed)
      submitButton = <input className='modal-login-submit disabled' type='submit' onClick={this.handleSubmit} value='Login' disabled={true}/>;

    if (this.props.errors.auth.loginFailed)
      errorsBox = <div id='modal-login-error-notif'>Error logging in: invalid username or password.</div>;

    if (this.props.ui.modal.active) {
      content =
        <div id='modal'>
          <div id='modal-login-box'>
            <div id='modal-login-header'>
              <div id='modal-login-header-label'>Login</div>
              <div id='modal-login-header-close' onClick={this.handleClose}>&times;</div>
            </div>
            <div id='modal-login-nav'>
              <div id='modal-login-nav-login' className='modal-login-nav-button'>Login</div>
              <div id='modal-login-nav-register' className='modal-login-nav-button' onClick={this.handleSwitchModal('register')}>Register</div>
            </div>
            <form id='modal-login-form'>
              {errorsBox}
              <div id='modal-login-inputs-box'>
                <div id='modal-login-username-box' className='modal-login-content-box'>
                  <div className='modal-login-label' id='modal-login-label-username'>Username</div>
                  <input className='modal-login-input' id='modal-login-input-username'
                    type='text' onChange={this.handleChange('username')} value={this.props.ui.login.username} autoComplete='off'/>
                </div>
                <div id='modal-login-password-box' className='modal-login-content-box'>
                  <div className='modal-login-label' id='modal-login-label-password1'>Password</div>
                  <input className='modal-login-input' id='modal-login-input-password'
                    type='password' onChange={this.handleChange('password')}/>
                </div>
                <div id='modal-login-forgot-label' onClick={this.handleSwitchModal('recover')}>Forgot your password?</div>
                {submitButton}
              </div>
            </form>
          </div>
        </div>
    };
    return (content);
  };
};

export default ModalLogin;