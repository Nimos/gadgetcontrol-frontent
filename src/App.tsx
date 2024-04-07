import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import LightsApp from './lights/LightsApp';
import LoginApp from './auth/LoginApp';


const RESET_TOKEN_STATES = ["NOT_LOGGED_IN", "EXPIRED_TOKEN", "INVALID_TOKEN"]

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!localStorage.getItem("access_token"));
  const [message, setMessage] = useState<string>("");

  function updateLoggedIn() {
    if (!!localStorage.getItem("access_token")) {
      setLoggedIn(true);
    }
  }

  function handleAppError(errorResponse: string) {
    setMessage(errorResponse);
    if (RESET_TOKEN_STATES.includes(errorResponse)) {
      setLoggedIn(false);
    }
  }

  let innerContent;
  if (loggedIn) {
    innerContent = <>
      <LightsApp onError={handleAppError} />
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
      {message && <><span className="errorMessage">{message}</span> <br /></>}
      {innerContent}
    </div>
  );
}

export default App;
