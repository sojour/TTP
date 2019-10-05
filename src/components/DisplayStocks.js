import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { getSearchResults, getSelectedStock } from '../store'
import './DisplayStocks.css'


const DisplayShares = props => {
  const { searchStocks, searchResults, getStock } = props;
  const [query, setQuery] = React.useState('');

  const handleChange = e => {
    setQuery([e.target.name] = e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (query) {
      searchStocks(query)
    }
  }

  const handleClick = e => {
    e.preventDefault();
    getStock(e.target.getAttribute('name'))
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Search by Ticker Symbol:</label>
          <input name='query' value={query} onChange={handleChange} required></input>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div>
        <table id='displayStock'>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(stock => {
              const symbol = stock['1. symbol'];
              const name = stock['2. name'];
              return (
                <tr key={symbol} name={symbol} onClick={handleClick}>
                  <td name={symbol}>{symbol}</td>
                  <td name={symbol}>{name}</td>
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
    searchResults: state.stock.searchResults
  }
}

const mapDispatch = dispatch => {
  return {
    searchStocks: (query) => dispatch(getSearchResults(query)),
    getStock: (ticker) => dispatch(getSelectedStock(ticker))
  }
}

export default connect(mapState, mapDispatch)(DisplayShares)
