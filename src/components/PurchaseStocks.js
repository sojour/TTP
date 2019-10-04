import React from 'react';
import { connect } from 'react-redux'
import { DisplayStock, BuyStock } from '../components'


const PurchaseShares = (props) => {
  const { selectedStock } = props;
  return (
    <div>
      <div>
        <h1>Purchase Shares Here!</h1>
      </div>
      <div>
        <div>
          <div><DisplayStock /></div>
          {selectedStock && (<div><BuyStock /></div>)}
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    selectedStock: state.stock.selectedStock
  }
}

export default connect(mapState)(PurchaseShares)
