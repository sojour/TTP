import axios from 'axios';
const AV_API_KEY = process.env.AV_API_KEY;


const SEARCH_RESULTS = 'SEARCH_RESULTS';
const SELECTED_STOCK = 'SELECTED_STOCK';
const BUY_STOCK = 'BUY_STOCK';
const ALL_TRANSACTIONS = 'GET_TRANSACTIONS';

const gotSearchResults = results => ({ type: SEARCH_RESULTS, results });
const gotSelectedStock = stock => ({ type: SELECTED_STOCK, stock });
const madeTransaction = transaction => ({ type: BUY_STOCK, transaction });
const gotAllTransactions = transactions => ({ type: ALL_TRANSACTIONS }, transactions)


export const getSearchResults = query => async dispatch => {
  try {
    const { data } = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${AV_API_KEY}`)

    dispatch(gotSearchResults(data.bestMatches || []));
  } catch (err) {
    console.error(err);
  }
}

export const getSelectedStock = ticker => async dispatch => {
  try {
    const { data } = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${AV_API_KEY}`)

    dispatch(gotSelectedStock(data['Global Quote']));
  } catch (err) {
    console.error(err);
  }
}
export const makeTransaction = (userId, stock) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/transaction/${userId}`, stock);
    dispatch(madeTransaction(data));
  } catch (err) {
    console.error(err);
  }
}

export const getAllTransactions = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/transaction/${userId}`);
    dispatch(gotAllTransactions(data));
  } catch (err) {
    console.error(err);
  }
}


const initialState = {
  searchResults: [],
  selectedStock: null,
  transactions: [],
}


export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_RESULTS:
      return { ...state, searchResults: action.results };
    case SELECTED_STOCK:
      return { ...state, selectedStock: action.stock };
    case BUY_STOCK:
      return { ...state, transactions: [...state.transactions, action.transaction] };
    case ALL_TRANSACTIONS:
      return { ...state, transactions: action.transactions };
    default:
      return state;
  }
}
