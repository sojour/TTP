import React from 'react';
import { connect } from 'react-redux'
import { getSignup } from '../store'



const Signup = (props) => {
  const { signup, signupError } = props;

  const [user, setUser] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(user);
  }
  return (
    < div >
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input name='firstName' value={user.firstName} onChange={handleChange} required></input>
        </div>
        <div>
          <label>Last Name:</label>
          <input name='lastName' value={user.lastName} onChange={handleChange} required></input>
        </div>
        <div>
          <label>Email:</label>
          <input name='email' value={user.email} onChange={handleChange} type='email' required></input>
        </div>
        <div>
          <label>Password:</label>
          <input name='password' value={user.password} onChange={handleChange} type='password' required></input>
        </div>
        <button type='submit'>
          Submit
        </button>
      </form>
      {signupError ? (<div><p>Error</p></div>) : null}
    </div >
  )
}

const mapState = state => {
  return {
    signupError: state.user.signupError
  }
}

const mapDispatch = dispatch => {
  return {
    signup: (user) => dispatch(getSignup(user))
  }
}

export default connect(mapState, mapDispatch)(Signup)


