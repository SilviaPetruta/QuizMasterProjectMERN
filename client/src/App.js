import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './scss/App.scss';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/404';
import QuizPage from './components/QuizPage';
import Navbar from './components/Navbar';
import Top10 from './components/Top10';
import HomeUser from './components/HomeUser';

import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

class App extends Component {
  render() {
    return(
      <Router>
        <Navbar/>
        <Switch>
          <Route 
            exact path="/"  
            component={Home}
          />
          <UnPrivateRoute path="/register" component={Register}/>
          <UnPrivateRoute path="/login" component={Login}/>
          <PrivateRoute path="/quizPage" roles={["user","admin"]} component={QuizPage}/>
          <PrivateRoute path="/top10" roles={["user","admin"]} component={Top10}/>
          <PrivateRoute path="/home" roles={["user","admin"]} component={HomeUser}/>
          <Route 
            // exact path=""  
            component={ErrorPage}
          /> 
        </Switch>
        
      </Router>
    )
  }
}

export default App;
