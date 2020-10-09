import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import './scss/App.scss';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/404';
import QuizPage from './components/QuizPage';

import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        {/* <Navbar/> */}
        <Switch >
          <Route 
            exact path="/"  
            component={Home}
            // render={ () =><Home />}
               />
          <Route 
            exact path="/Register" 
            component={Register}
            // render={ () =><Register 
            //   /> } 
              />
          <Route 
            exact path="/Login" 
            component={Login}
            // render={ () => <Login 
            //   />}
              />

          <Route 
            exact path="/quizPage" 
            component={QuizPage}
            // render={ () => <Login 
            //   />}
              />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
