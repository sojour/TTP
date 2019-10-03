import React from 'react';
import './App.css';
import Routes from './Routes'
import { Navbar } from './components'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
