import React from 'react';
import './App.css';

import GameField from './components/GameField/GameField';
import MainScreen from './components/MainScreen/MainScreen'

function App() {
  return (
    <div className="App">
      <GameField />
      {/* <MainScreen /> */}
    </div>
  );
}

export default App;
