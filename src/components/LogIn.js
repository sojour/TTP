import React from 'react';
import { connect } from 'react-redux'
import { gotLogin } from '../store'



const LogIn = (props) => {
  const { login, loginError } = props;

  const [user, setUser] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  }
  console.log(loginError)
  return (
    < div >
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input name='email' value={user.email} onChange={handleChange}></input>
        </div>
        <div>
          <label>Password:</label>
          <input name='password' value={user.password} onChange={handleChange}></input>
        </div>
        <button type='submit'>
          Submit
        </button>
      </form>
      {loginError ? (<div><p>Error</p></div>) : null}
    </div >
  )
}

const mapState = state => {
  return {
    loginError: state.user.loginError
  }
}

const mapDispatch = dispatch => {
  return {
    login: (email, password) => dispatch(gotLogin(email, password))
  }
}

export default connect(mapState, mapDispatch)(LogIn)


