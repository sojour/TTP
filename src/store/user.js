import axios from 'axios';

// const SERVER_URL = 'https://tpp-tracker.herokuapp.com'
const SERVER_URL = '172.16.25.113:8080'

const GET_USER = 'GET_USER'

//initial state of user object
const initialState = {
  id: ''
}


const getUser = user => ({ type: GET_USER, user })

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, id: action.id };
    default:
      return state;
  }
}
