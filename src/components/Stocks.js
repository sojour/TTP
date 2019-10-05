import React from 'react';
import { connect } from 'react-redux'
import { DisplayStock, BuyStock } from '../components'
import './Stocks.css'

const Stocks = (props) => {
  const { selectedStock } = props;

  return (
    <div className='stockContainer'>
      <div>
        <h1>Purchase Stocks</h1>
      </div>
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
  }
}

export default connect(mapState)(Stocks)
