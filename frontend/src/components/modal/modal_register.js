import React from 'react';

class ModalRegister extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitchModal = this.handleSwitchModal.bind(this);
  };

  handleClose(e) {
    e.preventDefault();
    this.props.setModalActive(false);
  };

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.props.setRegisterField(field, e.target.value);
    };
  };

  handleBlur(e) {
    if (this.props.ui.register.password.length < 8)
      this.props.setRegisterErrorPasswordLength();
    if (this.props.ui.register.password2.length != 0 && this.props.ui.register.password != this.props.ui.register.password2)
      this.props.setRegisterErrorPasswordsMatch();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.props.ui.register;
    const token = this.props.auth.token;
    this.props.setUiLoadingRegisterStatus(true);
    this.props.register(user, token).then(res => {
      this.props.setModalActive(false);
      this.props.clearRegisterState();
    })
    .catch(() => {})
    .then(() => {
      this.props.setUiLoadingRegisterStatus(false);
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
    let labelDescEmail = <div className='modal-register-label-error' id='modal-register-label-error-email'></div>;
    let labelDescUsername = <div className='modal-register-label-error' id='modal-register-label-error-username'></div>;
    let labelDescPassword = <div className='modal-register-label-error' id='modal-register-label-error-password'></div>;
    let labelDescPassword2 = <div className='modal-register-label-error' id='modal-register-label-error-password'></div>;
    let submitButton = <input className='modal-register-submit' type='submit' onClick={this.handleSubmit} value='Register'/>;
    if (this.props.errors.auth.emailTaken)
      labelDescEmail = <div className='modal-register-label-error' id='modal-register-label-error-email'>This email is already in use.</div>;
    else if (this.props.errors.auth.emailInvalid)
      labelDescEmail = <div className='modal-register-label-error' id='modal-register-label-error-email'>This email is invalid.</div>;
    if (this.props.errors.auth.usernameTaken)
      labelDescUsername = <div className='modal-register-label-error' id='modal-register-label-error-username'>This username is already in use.</div>;
    else if (this.props.errors.auth.usernameInvalid)
      labelDescUsername = <div className='modal-register-label-error' id='modal-register-label-error-username'>This username is invalid.</div>;
    if (this.props.errors.auth.passwordShort)
      labelDescPassword = <div className='modal-register-label-error' id='modal-register-label-error-password'>This password is too short.</div>;
    if (this.props.errors.auth.passwordsDontMatch)
      labelDescPassword2 = <div className='modal-register-label-error' id='modal-register-label-error-password2'>Passwords do not match.</div>;
    if (this.props.ui.loading.login)
      submitButton = <input className='modal-register-submit' type='submit' onClick={this.handleSubmit} value='Creating account...' disabled={true}/>;
    if (this.props.ui.register.email == '' || this.props.ui.register.username == '' || this.props.ui.register.password == '' || this.props.ui.register.password2 == '' ||
      this.props.errors.auth.emailTaken || this.props.errors.auth.usernameTaken || this.props.errors.auth.passwordShort || this.props.errors.auth.passwordsDontMatch ||
      this.props.errors.auth.emailInvalid || this.props.errors.auth.usernameInvalid)
      submitButton = <input className='modal-register-submit disabled' type='submit' onClick={this.handleSubmit} value='Register' disabled={true}/>;
    else if (this.props.ui.loading.register)
      submitButton = <input className='modal-register-submit' type='submit' onClick={this.handleSubmit} value='Creating account...' disabled={true}/>;

    if (this.props.ui.modal.active) {
      content =
        <div id='modal'>     
          <div id='modal-register-box'>
            <div id='modal-register-header'>
              <div id='modal-register-header-label'>Create an account</div>
              <div id='modal-register-header-close' onClick={this.handleClose}>&times;</div>
            </div>
            <div id='modal-register-nav'>
              <div id='modal-register-nav-login' className='modal-register-nav-button' onClick={this.handleSwitchModal('login')}>Login</div>
              <div id='modal-register-nav-register' className='modal-register-nav-button'>Register</div>
            </div>
            <form id='modal-register-form'>
              <div id='modal-register-inputs-box'>
                <div id='modal-register-email-box' className='modal-register-content-box'>
                  <div className='modal-register-label-box'>
                    <div className='modal-register-label' id='modal-register-label-email'>Email</div>
                    {labelDescEmail}
                  </div>
                  <input className='modal-register-input' id='modal-register-input-email' 
                    onChange={this.handleChange('email')} value={this.props.ui.register.email} type='email' autoComplete='off'/>
                </div>
                <div id='modal-register-username-box' className='modal-register-content-box'>
                  <div className='modal-register-label-box'>
                    <div className='modal-register-label' id='modal-register-label-username'>Username</div>
                    {labelDescUsername}
                  </div>
                  <input className='modal-register-input' id='modal-register-input-username'
                    onChange={this.handleChange('username')} value={this.props.ui.register.username} type='text' autoComplete='off'/>
                </div>
                <div id='modal-register-password-box' className='modal-register-content-box'>
                  <div className='modal-register-label-box'>
                    <div className='modal-register-label' id='modal-register-label-password1'>Password</div>
                    {labelDescPassword}
                  </div>
                  <input className='modal-register-input' id='modal-register-input-password'
                    onChange={this.handleChange('password')} onBlur={this.handleBlur} type='password' placeholder='Must be at least 8 characters long.'/>
                </div>
                <div id='modal-register-password2-box' className='modal-register-content-box'>
                  <div className='modal-register-label-box'>
                    <div className='modal-register-label' id='modal-register-label-password2'>Repeat Password</div>
                    {labelDescPassword2}
                  </div>
                  <input className='modal-register-input' id='modal-register-input-password2'
                    onChange={this.handleChange('password2')} onBlur={this.handleBlur} type='password'/>
                </div>
                {submitButton}
              </div>
            </form>
          </div>
        </div>
      };
    return (content);
  };
};

export default ModalRegister;