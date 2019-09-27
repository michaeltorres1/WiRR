// // Author: Michael Torres
// // Filename: App.js
// // Description: The purpose of this files is to render the react components

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './layout/navbar';
import Landing from './layout/landing';
import Register from './auth/Register';
import Show from './charts/show_page';
import Login from './auth/Login';
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import '../App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component= { Landing } />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/articles" component={ Show } />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  )
};

export default App;