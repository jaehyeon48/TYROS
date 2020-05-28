import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';
import PrivateRoute from './components/Routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import LandingPage from './components/layout/LandingPage';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import MainPage from './components/mainpage/MainPage';
import Portfolios from './components/portfolio/Portfolios';
import { loadUser } from './actions/auth';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
              <PrivateRoute path="/main" component={MainPage} exact />
              <PrivateRoute path="/portfolios" component={Portfolios} exact />
            </div>
          </React.Fragment>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
