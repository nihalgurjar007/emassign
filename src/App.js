import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import StudentDetails from './components/StudentDetails';
import Login from './components/login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route  exact path="/:id" component={StudentDetails}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
