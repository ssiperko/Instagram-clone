import {combineReducers} from 'redux';
import postReducer from './reducers/postReducer';
import loginReducer from './reducers/loginReducer';
import profileReducer from './reducers/profileReducer';

export default combineReducers({
    post: postReducer,
    login: loginReducer,
    profile: profileReducer
});
