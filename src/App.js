import React, { Component } from 'react';
import 'App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import {Login} from 'Component/Login/Login'
import {Register} from 'Component/Register/Register'


import {Provider} from "react-redux";

import {Header} from 'shared/Header';
import  RentalListing  from 'Component/Rental/Rental_list/RentalListing';
import RentalDetail  from 'Component/Rental/Rental_detail/RentalDetail';

import {init} from 'Reducers';

const store = init();
class App extends Component {

  
  render() {
    
    return (
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Header />
            <div className='container'>
              <Route exact path= "/" render = {() =>  <Redirect to= "/rental"/>}/>
              <Route exact path= "/rental" component = {RentalListing}/>
              <Route exact path= "/rental/:id" component = {RentalDetail}/>
              <Route exact path= "/login" component = {Login}/>
              <Route exact path= "/register" component = {Register}/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
