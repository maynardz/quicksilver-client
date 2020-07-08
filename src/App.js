import React, { useState, useEffect } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Splash from './components/Splash/Splash';
import Auth from './components/Splash/Auth/Auth';

function App() {

  const [sessionToken, setSessionToken] = useState(undefined);
  const [currentUser, setCurrentUser] = useState('');
  const [userID, setUserID] = useState('');
  const [loginToggle, setLoginToggle] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
    if (localStorage.getItem('currentUser')) {
      setCurrentUser(localStorage.getItem('currentUser'));
    }
    if (localStorage.getItem('userID')) {
      setUserID(localStorage.getItem('userID'));
    }
  }, []);

  const updateLocalStorage = (newToken, user, id) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('currentUser', user);
    localStorage.setItem('userID', id);
    setSessionToken(newToken);
    setCurrentUser(user);
    setUserID(id);
    console.log(sessionToken);
    console.log(user);
  }

  const clearLocalStorage = () => {
    localStorage.clear();
    setSessionToken(undefined);
    setCurrentUser('');
    setUserID('');
  }

  return (
    <div className="App">
      <Router>
        {
          loginToggle !== true ? (
            <Route path='/'>
              <Splash clearLocalStorage={clearLocalStorage} sessionToken={sessionToken} currentUser={currentUser} updateLocalStorage={updateLocalStorage} setLoginToggle={setLoginToggle} />
            </Route>
          ) : (
              <Switch>
                <Route path='/auth'>
                  <Auth updateLocalStorage={updateLocalStorage} setLoginToggle={setLoginToggle} />
                </Route>
              </Switch>
            )
        }
      </Router>
    </div>
  );
}

export default App;
