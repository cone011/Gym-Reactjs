import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/UI/SideBar/SideBar";
import Navbar from "./components/UI/NavBar/NavBar";
import { Route, Switch } from "react-router-dom";
import Membership from "./components/Membership/Membership";
function App() {
  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };
  return (
    <>
      <Navbar toggle={toggle} />
      <Sidebar isopen={isopen} toggle={toggle} />
      <Switch>
        <Route path="/membership" exact>
          <Membership />
        </Route>
      </Switch>
    </>
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
  );
}

export default App;
