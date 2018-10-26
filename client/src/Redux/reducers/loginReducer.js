import {LOGIN_USER} from '../actions/types';

const initialState = {
  user: {},
  loggedIn:false
}

export default function(state = initialState, action){
  switch(action.type){
    case LOGIN_USER:
        return {
            ...state,
            loggedIn: action.payload.message === "Auth successful"  ?  true : false,
            user: action.payload
        }
    default:
      return state;
  }
}
