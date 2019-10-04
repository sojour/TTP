import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'


const PurchaseShares = (props) => {
  const { cash, email } = props.user;
  const [stocks, setStocks] =

  return (
    <div>
      <div>
        <h1>Purchase Shares Here!</h1>
      </div>
      <div>
        <div>
          <div></div>
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
