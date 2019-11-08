// // Author: Michael Torres
// // Filename: App.js
// // Description: The purpose of this files is to render the react components

// Package importing
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { Provider } from 'react-redux';

// Function and variable importing
import Navbar from './layout/navbar';
import Landing from './layout/landing';
import Register from './auth/Register';
import Login from './auth/Login';
import { ArticleShow } from './article/article_show';
import store from '../store';
import { loadUser } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import ModalContainer from '../components/modal/modal_container';
import MultipleUsersIconContainer from './SVGs/multiple_users_icon_container';

// Stylesheets (CSS)
import '../stylesheets/css_reset.css';
import '../stylesheets/app.css';
import '../stylesheets/article_show.css'
import '../stylesheets/charts.css';
import '../stylesheets/donut_graph.css';
import '../stylesheets/modal.css';


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
        <div className="main">
          <ModalContainer />
          <Navbar />
          <Route exact path="/" component= { Landing } />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/article/show/:id" component={ArticleShow} />
              <Route to="/" component={MultipleUsersIconContainer}/>
              <Redirect to="/" />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  )
};

export default App;