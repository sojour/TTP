import axios from 'axios';

const GET_USER = 'GET_USER'

//initial state of user object
const initialState = {
  info: {}
}


const getUser = user => ({ type: GET_USER, user })

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, info: action.user };
    default:
      return state;
  }
}
