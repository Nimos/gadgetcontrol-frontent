import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import LightsApp from './lights/LightsApp';
import LoginApp from './auth/LoginApp';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!localStorage.getItem("access_token"));

  function updateLoggedIn() {
    if (!!localStorage.getItem("access_token")) {
      setLoggedIn(true);
    }
  }

  let innerContent;
  if (loggedIn) {
    innerContent = <>
      <LightsApp />
    </>
  } else {
    innerContent = <>
      <LoginApp onLogin={updateLoggedIn} />
    </>
  }

  return (
    <div className="App">
      <div className="brand">
        <img src={logo} className="logo" alt="logo" />
        <span>Hannah's Home</span><span className="purple">Hub</span>
      </div>
      {innerContent}
    </div>
  );
}

export default App;
