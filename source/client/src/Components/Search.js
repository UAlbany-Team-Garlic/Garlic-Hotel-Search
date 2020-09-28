import React from "react";
import { runSearch } from "../makeSearch.js";

function Search(searchData) {
  var i; //Counter

  //Split data returned from search results into 3 column arrays.
  for (i = 0; i < searchData.length; i++) {
    if (i < searchData.length / 3)
      leftCol = searchData.map((hotel) => <li>{hotel}</li>);
    else if (i > searchData.length / 3 && i < (2 * searchData.length) / 3)
      midCol = searchData.map((hotel) => <li>{hotel}</li>);
    else rightCol = searchData.map((hotel) => <li>{hotel}</li>);
  }

  return (
    <div>
      <div className="container no-padding">
        <div className="row">
          <div className="twelve col no-padding-bottom">
            <div className="text-container" style={{ background: "#fff" }}>
              <div className="form" id="searchbar">
                <h1 className="header" style={{ color: "#343746" }}>
                  <div className="header-icon search-icon"></div>
                  Search
                </h1>
                <input
                  type="text"
                  placeholder="Boston, MA"
                  className="form"
                  id="searchInput"
                ></input>
                <button className="dates"></button>
                <button
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
          <div className="four col left">
            <div className="text-container">
              <h1 className="subheader">This is a subheader.</h1>
              <p className="paragraph-md">
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <ul>{leftCol}</ul>
            </div>
          </div>
          <div className="four col middle">
            <div className="text-container">
              <h1 className="subheader">This is a subheader.</h1>
              <p className="paragraph-md">
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <ul>{midCol}</ul>
            </div>
          </div>
          <div className="four col right">
            <div className="text-container">
              <h1 className="subheader">This is a subheader.</h1>
              <p className="paragraph-md">
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <ul>{rightCol}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
