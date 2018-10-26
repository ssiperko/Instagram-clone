import {LOAD_USER_FEED} from '../actions/types';

const initialState = {
  feed : []
};

export default function(state = initialState, action){
  switch(action.type){
    case LOAD_USER_FEED:
        return {
            ...state,
            feed: action.payload
        }
    default:
      return state;
  }
}
