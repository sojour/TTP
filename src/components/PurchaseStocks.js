import React from 'react';
import { connect } from 'react-redux'
import { DisplayStock } from '.'


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
          <div><DisplayStock /></div>
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
