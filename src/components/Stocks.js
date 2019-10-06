import React from 'react';
import { connect } from 'react-redux'
import { DisplayStock, BuyStock } from '../components'
import './Stocks.css'

const Stocks = (props) => {
  const { selectedStock, apiError } = props;
  return (
    <div className='stockContainer'>
      <div>
        <h1>Purchase Stocks</h1>
      </div>
      {apiError && (<div><p id="error">API Error, Please wait 1 minute and try again!</p></div>)}
      <div className='displayContainer'>
        <div><DisplayStock /></div>
        {selectedStock && (<div><BuyStock /></div>)}
      </div>

    </div>
  )
}

const mapState = state => {
  return {
    selectedStock: state.stock.selectedStock,
    apiError: state.stock.apiError
  }
}

export default connect(mapState)(Stocks)
