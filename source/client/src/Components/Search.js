import React from "react";
import { runSearch } from "../makeSearch.js";
import { revAnimate } from "../displayData.js";
import Footer from "./Footer";

function Search() {
  return (
    <div>
      <div className="container-block no-padding" id='searchContainer'>
        <div className="row" id='row'>
          <div className="twelve col">
            <div className="col-container" id="searchColContainer">
              <div className="form" id="searchbar">
                <h1 className="header" style={{ color: "#fff", fontWeight: "500" }}>
                  <div className="header-icon search-icon"></div>
                  Search Hotels
                </h1>
                <input
                  type="text"
                  placeholder="Boston, MA"
                  className="form"
                  id="searchInput"
                ></input>
                <button className="dates"></button>
                <button
                  id="searchBtn"
                  className="search"
                  onClick={() => {
                    runSearch();
                  }}
                >
                  Search Hotels
                </button>
              </div>
            </div>
          </div>
          <div id="meme">
          </div>
        </div>
      </div>
      <div id="resultGroup">
        <div className='container no-padding' style={{ position: "relative" }}>
          <button className="search" id='searchBack' onClick={() => {
            runSearch();
          }}>Back to search</button>
          <button className="search" id='numResults'>Filter</button>
        </div>
        <div className='container no-padding'>
          <div className='row' id='searchResults'>
          </div>
        </div>
        <Footer />
      </div>
    </div >
  );
}

export default Search;
