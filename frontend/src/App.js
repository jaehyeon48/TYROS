import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';
import Navbar from './components/layout/Navbar';
import LandingPage from './components/layout/LandingPage';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route path="/" component={LandingPage} exact />
        <Switch>
          <React.Fragment>
            <div className="main-container">
              <Route path="/signup" component={SignUp} exact />
              <Route path="/login" component={Login} exact />
            </div>
          </React.Fragment>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
