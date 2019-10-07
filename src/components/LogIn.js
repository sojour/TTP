import React from 'react';
import { connect } from 'react-redux'
import { getLogin } from '../store'
import './LogIn.css'



const LogIn = (props) => {
  const { login, loginError, history } = props;

  const [user, setUser] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(user);
    history.push('/')
  }
  return (
    < div className='container' >
      <h3>Login</h3>

      <form className='form' onSubmit={handleSubmit}>
        <div className='field'>
          <label className='label'>Email:</label>
          <input name='email' value={user.email} onChange={handleChange} type='email' required></input>
        </div>
        <div className='field'>
          <label className='label'>Password:</label>
          <input name='password' value={user.password} onChange={handleChange} type='password' required></input>
        </div>
        <button className='field' type='submit'>
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
    login: (user) => dispatch(getLogin(user))
  }
}

export default connect(mapState, mapDispatch)(LogIn)


