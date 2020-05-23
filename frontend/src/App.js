import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';
import Navbar from './components/layout/Navbar';
import LandingPage from './components/layout/LandingPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route path="/" component={LandingPage} exact />
      </Router>
    </Provider>
  );
}

export default App;
