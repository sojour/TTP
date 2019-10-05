import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Home, LogIn, Signup, Stocks, Portfolio, Transactions } from './components'
import './Routes.css'


const Routes = (props) => {
  const { isLoggedIn } = props;
  return (
    <div className='bodyContainer'>

      <Switch>
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />

        {/* <Route component={Home} /> */}
      </Switch>
      {isLoggedIn && (
        <Switch>
          <Route exact path="/stocks" component={Stocks} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/transactions" component={Transactions} />

        </Switch>
      )}
      {/* Displays our Login component as a fallback */}

    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: state.user.userInfo,
  }
}

export default withRouter(connect(mapState)(Routes))
