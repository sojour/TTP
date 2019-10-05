import React from 'react';
import './App.css';
import Routes from './Routes'
import { Navbar } from './components'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
      <p className='warning'> Due to the limitations of the API (5 calls/minute), please note how many calls you're making.</p>
    </div>
  );
}

export default App;
