import React from 'react';
import { connect } from 'react-redux'
import './Navbar.css'

const Navbar = (props) => {
  const { user } = props;
  return (
    <div className='navbar'>
      {user ? (
        <p className='navbarItem'>Log Out</p>
      ) : (<p className='navbarItem'>Log In</p>
        )
      }
      <h3 className='title'>Super Cool</h3>
      <div>
        {user ? (
          <div className='userOptions'>
            <p className='navbarItem'>Portfolio |</p>
            <p className='navbarItem'>Transactions</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user.userInfo
  }
}

export default connect(mapState)(Navbar)
