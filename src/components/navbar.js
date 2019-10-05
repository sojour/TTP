import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLogout } from '../store'
import './Navbar.css'

const Navbar = (props) => {
  const { logout, history } = props;

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    history.push('/');
  }

  const { user } = props;
  return (
    <div className='navbar'>
      {user ? (
        <p className='navbarItem' onClick={(e) => handleLogout(e)}>Log Out</p>
      ) : (<div>
        <Link className='navbarItem' to='/login'>Log In</Link>
        <Link className='navbarItem' to='/signup'>Sign Up</Link>
      </div>
        )
      }
      <h3 className='title'>Super Cool</h3>
      <div>
        {user ? (
          <div className='userOptions'>
            <Link to='/stocks' className='navbarItem'>Buy</Link>
            <Link to='/portfolio' className='navbarItem'>Portfolio</Link>
            <Link className='navbarItem'>Transactions</Link>
          </div>
        ) : null}
      </div>
    </div >
  )
}

const mapState = state => {
  return {
    user: state.user.userInfo
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(getLogout())
  }
}

export default connect(mapState, mapDispatch)(Navbar)
