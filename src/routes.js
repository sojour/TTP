import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import { Home, LogIn } from './components'

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/login" component={LogIn} />

        {/* Displays our Login component as a fallback */}
        <Route component={Home} />
      </Switch>
    </div>
  )
}

export default withRouter(Routes)
