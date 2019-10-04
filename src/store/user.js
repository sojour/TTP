import axios from 'axios';
import history from '../history'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const SINGUP_SUCCESS = 'SIGNUP_SUCCESS';
const SINGUP_FAILURE = 'SINGUP_FAILURE';
const LOGOUT = 'LOGOUT';
const UPDATE_CASH = 'UPDATE_CASH';


const gotLoginSuccess = user => ({ type: LOGIN_SUCCESS, user });
const gotLoginError = () => ({ type: LOGIN_FAILURE });
const gotSingupSuccess = user => ({ type: SINGUP_SUCCESS, user });
const gotSignupError = () => ({ type: SINGUP_FAILURE });
export const getLogout = () => ({ type: LOGOUT });
export const updateCash = (totalPrice) => ({ type: UPDATE_CASH, totalPrice });

//Redux thunk to login an user
export const getLogin = user => async dispatch => {
  try {
    let { data } = await axios.post('/api/user/login', user);
    dispatch(gotLoginSuccess(data));
    history.push('/');
  } catch (err) {
    dispatch(gotLoginError());
    console.error(err);
  }
}

export const getSignup = (user) => async dispatch => {
  try {
    let { data } = await axios.post('/api/user/signup', user);
    dispatch(gotSingupSuccess(data));
    history.push('/');
  } catch (err) {
    dispatch(gotSignupError());
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
    case UPDATE_CASH:
      const cash = state.userInfo.cash;
      const updatedCash = cash - action.totalPrice;
      return { ...state, userInfo: { ...state.userInfo, cash: updatedCash } }
    default:
      return state;
  }
}
