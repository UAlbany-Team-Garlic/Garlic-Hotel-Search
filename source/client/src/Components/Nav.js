import React from "react";
import { hamburger } from "./js/hamburger.js";

function Nav() {
  return (
    <div>
      <div id="nav">
        <div className="container display-block">
          <div className="nav-logo"></div>
          <h1 className="nav-title">
            Garlic <span style={{ color: "#fff" }}>Hotels</span>
          </h1>
          <div id="menu">
            <div className="menu-item menu-title">
              <div className="menu-title-profilePic"></div>
              <h1 className="menu-title-header"></h1>
            </div>
            <div className="menu-item">
              <a href="/" className="menu-item-link">
                <p className="menu-item-link-p">Home</p>
              </a>
            </div>
            <div className="menu-item">
              <a href="/login" className="menu-item-link">
                <p className="menu-item-link-p" id="register">
                  Register
                </p>
              </a>
            </div>
          </div>
          <div
            className="nav-hamburger"
            id="hamburger"
            onClick={() => {
              hamburger();
            }}
          >
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
