import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllTransactions } from '../store';
import './Portfolio.css'
const AV_API_KEY = process.env.AV_API_KEY;


const Portfolio = props => {
  const { user, transactions, getTransactions } = props;

  React.useEffect(() => {
    getTransactions(user.id)
  }, []);

  const [stocks, setStocks] = React.useState([]);
  const [totalWorth, setTotalWorth] = React.useState(0);

  React.useEffect(() => {
    gotTransactions()
  }, [transactions])

  const gotTransactions = async () => {
    const compositeTransactions = transactions.reduce((allStocks, stock) => {
      if (stock.ticker in allStocks) {
        allStocks[stock.ticker] += stock.quantity;
      } else {
        allStocks[stock.ticker] = stock.quantity;
      }
      return allStocks
    }, {});
    let stocksArray = [];
    let totalPrice = 0;

    for (let stock in compositeTransactions) {
      const { data } = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${AV_API_KEY}`)

      let compositeWithCurrent = {
        [stock]: compositeTransactions[stock],
        current: data['Global Quote'],
      }
      totalPrice += (compositeWithCurrent[stock]) * ((+compositeWithCurrent.current['05. price']).toFixed(2));
      stocksArray.push(compositeWithCurrent);
    }
    setStocks(stocksArray);
    setTotalWorth(totalPrice);
  }



  return (
    <div>
      <h2>{user.firstName}'s Portfolio</h2>
      <div>
        <p>Total Worth: {totalWorth + (user.cash / 100)} </p>
        <p>Total Cash: {user.cash / 100} </p>
      </div>
      <div>
        <h3>Stocks:</h3>
        <div>
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Quantity</th>
                <th>Current Price ($)</th>
                <th>Total Worth ($)</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(stock => {
                const ticker = stock.current['01. symbol'];
                const quantity = stock[ticker];
                const currentPrice = (+stock.current['05. price']).toFixed(2);
                const totalWorth = quantity * currentPrice;
                const openingPrice = (+stock.current['02. open']).toFixed(2);
                let priceColor = null;
                if (currentPrice > openingPrice) {
                  priceColor = 'higher';
                } else if (currentPrice == openingPrice) {
                  priceColor = 'equal';
                } else {
                  priceColor = 'lower';
                }
                return (
                  <tr key={ticker}>
                    <td>{ticker}</td>
                    <td >{quantity}</td>
                    <td className={priceColor}> {currentPrice}</td>
                    <td>{totalWorth}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div >
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



export default connect(mapState, mapDispatch)(Portfolio)
