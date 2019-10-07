import React from 'react';
import './Home.css';
import { connect } from 'react-redux'


const Home = (props) => {
  const { user } = props;
  return (
    <div>
      {user ? (<h1 className='mainText'>Welcome Back, {user.firstName}!</h1>) :
        (<h1 className='mainText'>Welcome To Stock Tracker!</h1>)
      }
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user.userInfo
  }
}

export default connect(mapState)(Home)
