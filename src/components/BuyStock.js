import React from 'react';
import { connect } from 'react-redux'
import { makeTransaction, updateCash } from '../store'

const DisplayShares = props => {
  const { user, selectedStock, makeTransaction, updateCash } = props;
  const cash = user.cash;
  const [quantity, setQuantity] = React.useState(0);
  const [error, setError] = React.useState('');

  const handleChange = e => {
    setQuantity([e.target.name] = e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const id = user.id;
    const price = Math.round((+selectedStock['05. price']).toFixed(2) * 100);
    const ticker = selectedStock['01. symbol'];
    const totalPrice = price * quantity;

    if (totalPrice > cash) {
      setError('Too Expensive!')
    } else {
      updateCash(totalPrice)
      makeTransaction(id, { price, ticker, quantity });
      setQuantity(0);
      setError('');
    }
  }

  return (
    <div>
      <h2>Available Cash: ${cash / 100}</h2>
      <div>
        <table>
          <tr>
            <th>Symbol:</th>
            <td>{selectedStock['01. symbol']}</td>
          </tr>
          <tr>
            <th>Price ($):</th>
            <td>{(+selectedStock['05. price']).toFixed(2)}</td>
          </tr>
        </table>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input name='quantity' type='number' min='1' value={quantity} onChange={handleChange} required></input>
          <button type='submit'>Buy</button>
        </form>
        {error ? (<div><p>{error}</p></div>) : null}
      </div>
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
    updateCash: (totalPrice) => dispatch(updateCash(totalPrice))
  }
}

export default connect(mapState, mapDispatch)(DisplayShares)
