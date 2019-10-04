import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Home, LogIn, Signup, PurchaseStocks } from './components'

const Routes = (props) => {
  const { isLoggedIn } = props;
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
      {isLoggedIn && (
        <Switch>
          <Route exact path="/stocks" component={PurchaseStocks} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      {/* <Route component={Home} /> */}
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: state.user.userInfo,
  }
}

export default withRouter(connect(mapState)(Routes))
