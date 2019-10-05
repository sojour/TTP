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
  const [loaded, setLoaded] = React.useState(false);


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
        current: data['Global Quote']
      }

      stocksArray.push(compositeWithCurrent);
    }
    setStocks(stocksArray);
  }



  return (
    <div>
      <h2>{user.email}'s Portfolio</h2>
      <div>
        <p>Total Worth: </p>
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
                const priceColor = currentPrice >= (+stock.current['02. open']).toFixed(2);
                return (
                  <tr key={ticker}>
                    <td>{ticker}</td>
                    <td >{quantity}</td>
                    <td className={priceColor ? 'higher' : 'lower'}> {currentPrice}</td>
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