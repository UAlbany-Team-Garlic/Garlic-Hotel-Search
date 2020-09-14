import React from "react";

function Nav() {
  return (
    <div>
      <div id="nav">
        <div className="container display-block">
          <div className="nav-logo"></div>
          <h1 className="nav-title">
            Garlic <span style={{ color: "#fff" }}>Hotels</span>
          </h1>

          <div className="nav-hamburger">
            <div className="nav-hamburger-wrapper">
              <div className="nav-hamburger-line-top"></div>
              <div className="nav-hamburger-line-mid"></div>
              <div className="nav-hamburger-line-btm"></div>
            </div>
          </div>
          <div className="nav-user">
            <div className="nav-user-icon"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
