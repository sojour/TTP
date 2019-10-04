import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { DisplayShares } from '../components'


const PurchaseShares = (props) => {
  const { cash, email, id } = props.user;
  const [stocks, setStocks] = React.useState(0)

  return (
    <div>
      <div>
        <h1>Purchase Shares Here!</h1>
      </div>
      <div>
        <div>
          <div><DisplayShares /></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user.userInfo
  }
}

export default connect(mapState)(PurchaseShares)
