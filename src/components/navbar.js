import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLogout } from '../store'
import './Navbar.css'

const Navbar = (props) => {
  const { logout, history } = props;

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    history.push('/');
  }

  const { user } = props;
  return (
    <div className='navbar'>
      {user ? (
        <div className='navbarContainer'>
          <p className='navbarItem' onClick={(e) => handleLogout(e)}>Log Out</p>
        </div>
      ) : (
          <div className='navbarContainer'>
            <Link className='navbarItem' to='/login'>Log In</Link>
            <div className='navbarSpacing'>  </div>
            <Link className='navbarItem' to='/signup'>Sign Up</Link>
          </div>
        )
      }
      <Link className='title' to='/'>Stock Tracker</Link>
      {user ? (
        <div className='navbarContainer'>
          <Link to='/stocks' className='navbarItem'>Buy</Link>
          <div className='navbarSpacing'>  </div>
          <Link to='/portfolio' className='navbarItem'>Portfolio</Link>
          <div className='navbarSpacing'>  </div>
          <Link to='transactions' className='navbarItem'>Transactions</Link>
        </div>
      ) : <div></div>}
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
