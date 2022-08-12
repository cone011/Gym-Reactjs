import React from "react";
import "./App.css";
import "devextreme/dist/css/dx.light.css";
import Routes from "./pages/Routes/Routes";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    <Layout>
      <Routes />
    </Layout>
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
