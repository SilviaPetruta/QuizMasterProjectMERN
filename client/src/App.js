import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import axios from 'axios';
import './scss/App.scss';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/404';

import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <UnPrivateRoute path="/login" component={Login}/>
          <UnPrivateRoute path="/register" component={Register}/>
          <UnPrivateRoute path="/404" component={ErrorPage}/>
        </div>
        
      </Router>
    )
  }
}

export default App;
