import {LOAD_USER} from '../actions/types';

const initialState = {
  userProfile : {}
}

export default function(state = initialState, action){
  switch(action.type){
    case LOAD_USER:
        return {
            ...state,
            userProfile: action.payload
        }
    default:
      return state;
  }
}
