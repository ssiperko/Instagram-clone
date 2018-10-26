import {LOGIN_USER, LOAD_USER, LOAD_USER_FEED} from './types';
import {loginUser} from '../../components/services';
import {loadUserProfile} from '../../components/services';
import {loadUserFeed} from '../../components/services';



export const load_user_feed = (username) => dispatch =>{
  loadUserFeed(username)
  .then((response) => {
    dispatch({
      type: LOAD_USER_FEED,
      payload: response
    })
  })
};

export const login_user = (email, password, push) => dispatch => {
  loginUser(email, password)
  .then((response) => {
    if(response.message === "Auth failed"){
      dispatch({
        type: LOGIN_USER,
        payload: "login failed"
      })
    } else {
    dispatch({
      type: LOGIN_USER,
      payload: response
    })
    }
    const userName = response.username;
    if (userName) {
      push(`/home/${userName}`);
    }
  })
};

export const load_user = (username) => dispatch => {
  loadUserProfile(username)
  .then((response) => {
    dispatch({
      type: LOAD_USER,
      payload: response[0]
    })
  })
};
