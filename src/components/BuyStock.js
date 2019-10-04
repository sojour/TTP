import React from 'react';
import { connect } from 'react-redux'
import { makeTransaction } from '../store'

const DisplayShares = props => {
  const { user, selectedStock, makeTransaction } = props;

  return (
    <div>
      <h2>Available Cash: ${user.cash}</h2>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user.userInfo,
    selectedStock: state.stock.selectedStock
  }
}

const mapDispatch = dispatch => {
  return {
    makeTransaction: (userId, stock) => dispatch(makeTransaction(userId, stock)),
  }
}

export default connect(mapState, mapDispatch)(DisplayShares)
