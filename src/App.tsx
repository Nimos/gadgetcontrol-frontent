import React from 'react';
import logo from './logo.svg';
import './App.scss';
import LightsApp from './lights/LightsApp';

function App() {
  return (
    <div className="App">
      <div className="brand">
        <img src={logo} className="logo" alt="logo" />
        <span>Hannah's Home</span><span className="purple">Hub</span>
      </div>
      <LightsApp />
    </div>
  );
}

export default App;
