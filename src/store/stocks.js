import axios from 'axios';
const AV_API_KEY = process.env.AV_API_KEY;


const SEARCH_RESULTS = 'SEARCH_RESULTS';
const SELECTED_STOCK = 'SELECTED_STOCK';
const BUY_STOCK = 'BUY_STOCK';
const ALL_TRANSACTIONS = 'GET_TRANSACTIONS';

const gotSearchResults = results => ({ type: SEARCH_RESULTS, results });
export const gotSelectedStock = stock => ({ type: SELECTED_STOCK, stock });
const madeTransaction = stock => ({ type: BUY_STOCK, stock });
const gotTransactions = transactions => ({ type: ALL_TRANSACTIONS }, transactions)


export const getSearchResults = query => async dispatch => {
  try {
    const { data } = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${AV_API_KEY}`)

    dispatch(gotSearchResults(data.bestMatches || []));
  } catch (err) {
    console.error(err);
  }
}

export const makeTransaction = stock => async dispatch => {
  try {

  } catch (err) {
    console.error(err);
  }
}


const initialState = {
  searchResults: [],
  selectedStock: null,
  transactions: [],
}
