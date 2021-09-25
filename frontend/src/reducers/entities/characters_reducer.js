import { RECEIVE_SCRIPTS, RECEIVE_SCRIPT, RECEIVE_USER_SCRIPTS } from '../../actions/script_actions';
import { GET_CHARS } from '../../actions/script_create_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SCRIPTS:
      action.data.forEach(script => 
        script.versions.forEach(version =>
          version.characters.forEach(character =>
            nextState[character.id] = character
          )
        )
      );
      return nextState;
    case RECEIVE_SCRIPT:
      action.data.versions.forEach(version =>
        version.characters.forEach(character =>
          nextState[character.id] = character
        )  
      );
      return nextState;
    case GET_CHARS:
      action.characters.forEach(character =>
        nextState[character.id] = character);
      return nextState;
    case RECEIVE_USER_SCRIPTS:
      action.data.scripts.forEach(script => 
        script.versions.forEach(version =>
          version.characters.forEach(character =>
            nextState[character.id] = character
          )
        )
      );
      return nextState;
    default:
      return state;
  };
};