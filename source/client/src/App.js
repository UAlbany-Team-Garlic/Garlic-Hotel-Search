import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./scss/Garlic.scss";
import "./scss/hamburger.scss";
import Nav from "./Components/Nav";
import Search from "./Components/Search";
import Footer from "./Components/Footer";
import LoginRegister from "./Components/LoginRegister";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/login">
            <LoginRegister />
          </Route>
          <Route path="">
            <Search />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
