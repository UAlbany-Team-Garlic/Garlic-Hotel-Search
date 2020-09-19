import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./scss/Garlic.scss";
import Nav from "./Components/Nav.js";
import Search from "./Components/Search.js";
import Footer from "./Components/Footer.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/login">
            <h1>Login</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
