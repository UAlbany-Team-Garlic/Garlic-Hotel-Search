import React from "react";
import "./scss/Garlic.scss";
import Nav from "./Components/Nav.js";
import Search from "./Components/Search.js";
import Footer from "./Components/Footer.js";

function App() {
  return (
    <div className="App">
      <Nav />
      <Search />
      <Footer />
    </div>
  );
}

export default App;
