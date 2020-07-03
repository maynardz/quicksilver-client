import React, {useState, useEffect} from 'react';
import './App.css';

import Auth from './components/Auth/Auth';
import Splash from './components/Splash/Splash'

function App() {

  const [sessionToken, setSessionToken] = useState(undefined);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
    if(localStorage.getItem('currentUser')){
      setCurrentUser(localStorage.getItem('currentUser'));
    }
  }, []);

  const updateLocalStorage = (newToken, user) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('currentUser', user)
    setSessionToken(newToken);
    setCurrentUser(user)
    console.log(sessionToken);
    console.log(user)
  }

  const clearLocalStorage = () => {
    localStorage.clear();
    setSessionToken(undefined);
    setCurrentUser('')
  }

  const viewToggle = () => {
    return sessionToken !== undefined ? <Splash clearLocalStorage={clearLocalStorage} sessionToken={sessionToken} currentUser={currentUser} /> : <Auth updateLocalStorage={updateLocalStorage} />
  }

  return (
    <div className="App">
      {viewToggle()}
    </div>
  );
}

export default App;
