import axios from 'axios';
import history from '../history'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const SINGUP_SUCCESS = 'SIGNUP_SUCCESS';
const SINGUP_FAILURE = 'SINGUP_FAILURE';
const LOGOUT = 'LOGOUT';


const getLoginSuccess = user => ({ type: LOGIN_SUCCESS, user });
const getLoginError = () => ({ type: LOGIN_FAILURE });
const getSingupSuccess = user => ({ type: SINGUP_SUCCESS, user });
const getSignupError = () => ({ type: SINGUP_FAILURE });
export const getLogout = () => ({ type: LOGOUT });

//Redux thunk to login an user
export const gotLogin = user => async dispatch => {
  try {
    let { data } = await axios.post('/api/user/login', user);
    dispatch(getLoginSuccess(data));
    history.push('/');
  } catch (err) {
    dispatch(getLoginError());
    console.error(err);
  }
}

export const gotSignup = (user) => async dispatch => {
  try {
    let { data } = await axios.post('/api/user/signup', user);
    dispatch(getSingupSuccess(data));
    history.push('/');
  } catch (err) {
    dispatch(getSignupError());
    console.error(err);
    history.push('/signup');
  }
}



//initial state of user object
const initialState = {
  userInfo: null,
  loginError: false,
  signupError: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, userInfo: action.user, loginError: false };
    case LOGIN_FAILURE:
      return { ...state, loginError: true };
    case SINGUP_SUCCESS:
      return { ...state, userInfo: action.user, signupError: false };
    case SINGUP_FAILURE:
      return { ...state, signupError: true };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
