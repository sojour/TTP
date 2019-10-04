import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { getSearchResults, getSelectedStock } from '../store'



const DisplayShares = props => {
  const { searchStocks, searchResults } = props;
  const [query, setQuery] = React.useState('');

  const handleChange = e => {
    setQuery([e.target.name] = e.target.value);

    if (query) {
      searchStocks(query)
    }
  }
  console.log(query);
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
                <tr key={stock}>
                  <th>{symbol}</th>
                  <th>{name}</th>
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
    searchStocks: (query) => dispatch(getSearchResults(query))
  }
}

export default connect(mapState, mapDispatch)(DisplayShares)
