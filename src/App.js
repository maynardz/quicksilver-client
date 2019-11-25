import React, {useState, useEffect} from 'react';
import './App.css';

import Auth from './components/Auth/Auth';
import Splash from './components/Splash/Splash'

function App() {

  const [sessionToken, setSessionToken] = useState(undefined);

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'))
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken)
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken(undefined)
  }

  const viewToggle = () => {
    return sessionToken !== undefined ? <Splash clearToken={clearToken} sessionToken={sessionToken} /> : <Auth updateToken={updateToken}/>
  }

  return (
    <div className="App">
      {viewToggle()}
    </div>
  );
}

export default App;
