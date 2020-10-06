import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import './scss/App.scss';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/404';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        {/* <Navbar/> */}
        <Switch >
          <Route 
            exact path="/"  
            render={ () =><Home />}
               />
          {/* <Route 
            exact path="/Users" 
            render={ () => <Users grabUsers={this.state.users} />}/> */}
          <Route 
            exact path="/Register" 
            render={ () =><Register 
              /> } />
          {/* <Route 
            exact path="/Leaderboard" 
            render={ () =><Leaderboard grabUsers={this.state.users} /> } /> */}
          <Route 
            exact path="/Login" 
            render={ () => <Login 
              />}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
