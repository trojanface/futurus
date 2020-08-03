import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import Login from './scenes/Login/Login';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ItemDesigner from './scenes/ItemDesigner/ItemDesigner';
import UserDesigner from './scenes/UserDesigner/UserDesigner';
import POS from './scenes/POS/POS';
import Stocktake from './scenes/Stocktake/Stocktake';
import { StateProvider } from './GlobalStore'
import Home from './scenes/Dashboard/Home';

function App() {
  return (
    <div>
      <StateProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/pos">
              <POS />
            </Route>
            <Route path="/userdesigner">
              <UserDesigner />
            </Route>
            <Route path="/itemdesigner">
              <ItemDesigner />
            </Route>
            <Route path="/stocktake">
              <Stocktake />
            </Route>
            <Route path="/dashboard">
              <Home />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </StateProvider>
    </div>
  );
}




export default App;
