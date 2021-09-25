export const register = (user, token) => (
  $.ajax({
    url: `../api/account/register`,
    headers: {'Authorization': 'Token ' + token},
    method: 'POST',
    data: user
  })
);

export const login = (user, token) => (
  $.ajax({
    url: `../api/account/login`,
    headers:{'Authorization': 'Token ' + token},
    method: 'POST',
    data: user
  })
);

export const getGuestAccount = () => (
  $.ajax({
    url: `../api/account/guest_register`,
    method: 'POST',
  })
);

export const sendRecoverEmail = (email) => (
  $.ajax({
    url: `../api/password_reset/`,
    method: 'POST',
    data: email
  })
);

export const recoverChangePassword = (data) => (
  $.ajax({
    url: `../api/password_reset/confirm/`,
    method: 'POST',
    data: data
  })
);