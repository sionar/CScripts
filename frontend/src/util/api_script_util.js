export const getScriptIndex = (params) => (
  $.ajax({
    url: `../api/char_scripts/script${params}`,
    method: 'GET'
  })
);

export const getScript = (id, token) => {
  const authToken = token == null ? null : 'Token ' + token;
  return (
    $.ajax({
      url: `../api/char_scripts/script/${id}`,
      headers: {'Authorization': authToken},
      method: 'GET'
    })
  );
};

export const getCharacters = (token) => {
  const authToken = token == null ? null : 'Token ' + token;
  return (
    $.ajax({
      url: `../api/char_scripts/character/`,
      headers: {'Authorization': authToken},
      method: 'GET'
    })
  );
};

export const getUserScripts = (username, token) => {
  const authToken = token == null ? null : 'Token ' + token;
  return (
    $.ajax({
      url: `../api/char_scripts/user/${username}`,
      headers: {'Authorization': authToken},
      type: 'GET',
    })
  );
};

export const createScript = (script, token) => (
  $.ajax({
    url: `../api/char_scripts/script/create`,
    headers: {'Authorization': 'Token ' + token},
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(script)
  })
);

export const createVersion = (scriptId, version, token) => (
  $.ajax({
    url: `../api/char_scripts/version/${scriptId}/create`,
    headers:{'Authorization': 'Token ' + token},
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(version)
  })
);
export const updateScript = (script, token) => (
  $.ajax({
    url: `../api/char_scripts/script/${script.id}/update`,
    headers: {'Authorization': 'Token ' + token},
    contentType: 'application/json',
    type: 'PATCH',
    data: JSON.stringify(script)
  })
);

export const updateVersion = (scriptId, version, token) => (
  $.ajax({
    url: `../api/char_scripts/version/${scriptId}/${version.id}/update`,
    headers: {'Authorization': 'Token ' + token},
    contentType: 'application/json',
    type: 'PATCH',
    data: JSON.stringify(version)
  })
);

export const deleteScript = (scriptId, token) => (
  $.ajax({
    url: `../api/char_scripts/script/${scriptId}/delete`,
    headers: {'Authorization': 'Token ' + token},
    contentType: 'application/json',
    type: 'DELETE'
  })
);