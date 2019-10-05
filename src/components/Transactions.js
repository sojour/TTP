import React from 'react';
import { connect } from 'react-redux'
import { getAllTransactions } from '../store';
const Transactions = props => {
  const { user, transactions, getTransactions } = props;

  React.useEffect(() => {
    getTransactions(user.id)
  }, []);

  return (
    <div>
      <h2>{user.firstName}'s Transactions</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Ticker</th>
              <th>Quantity</th>
              <th>Purchase Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, id) => {
              const ticker = transaction.ticker;
              const quantity = transaction.quantity;
              const price = transaction.price / 100;
              return (
                <tr key={id}>
                  <td>Buy</td>
                  <td>{ticker}</td>
                  <td>{quantity}</td>
                  <td>${price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user.userInfo,
    transactions: state.stock.transactions
  }
}

const mapDispatch = dispatch => {
  return {
    getTransactions: (userId) => dispatch(getAllTransactions(userId)),
  }
}

export default connect(mapState, mapDispatch)(Transactions)
