import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { getSearchResults, getSelectedStock } from '../store'



const DisplayShares = props => {
  const { searchStocks, searchResults, getStock } = props;
  const [query, setQuery] = React.useState('');

  const handleChange = e => {
    setQuery([e.target.name] = e.target.value);

    if (query) {
      searchStocks(query)
    }
  }

  const handleClick = e => {
    e.preventDefault();
    getStock(e.target.name)
  }
  return (
    <div>
      <div>
        <label>Search for stocks here:</label>
        <input name='query' value={query} onChange={handleChange}></input>
      </div>
      <div>
        <table>
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
                <tr key={stock} name={stock} onClick={(e) => handleClick(e)}>
                  <td>{symbol}</th>
                  <td>{name}</th>
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
