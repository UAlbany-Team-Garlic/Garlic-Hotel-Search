import React from "react";
import { loginRegisterSwitch } from "./js/loginregister.js";
import { newUser } from "../userCode"

function LoginRegister() {
  return (
    <div>
      <div className="container no-padding">
        <div className="twelve col">
          <div className="text-container" style={{ background: "#fff" }}>
            <div className="form">
              <div id="registerForm">
                <h1 className="loginRegister" style={{ marginBottom: "12px" }}>
                  Register |&nbsp;
                  <span
                    onClick={() => {
                      loginRegisterSwitch();
                    }}
                    id="loginSwitch"
                  >
                    Login
                  </span>
                </h1>
                <label for="email">Email</label>
                <input
                  className="form"
                  type="email"
                  name="email"
                  placeholder=""
                  id="email"
                ></input>
                <label for="user">Username</label>
                <input
                  className="form"
                  type="text"
                  name="user"
                  placeholder=""
                  id="user"
                ></input>
                <label for="phone">Phone Number</label>
                <input
                  className="form"
                  type="text"
                  name="phone"
                  placeholder=""
                  id="phone"
                ></input>
                <label for="pw">Password</label>
                <input
                  className="form"
                  type="password"
                  name="pw"
                  placeholder=""
                  id="pw"
                ></input>
                <label for="pwCheck">Enter Password Again</label>
                <input
                  className="form"
                  type="password"
                  name="pwCheck"
                  placeholder=""
                  id="pwCheck"
                ></input>
                <button className="form" onClick={() => {newUser();}}>Register</button>
              </div>
              <div id="loginForm">
                <h1 className="loginRegister" style={{ marginBottom: "12px" }}>
                  <span
                    onClick={() => {
                      loginRegisterSwitch();
                    }}
                    id="loginSwitch"
                  >
                    Register
                  </span>
                  &nbsp;| Login
                </h1>
                <label for="user">Username</label>
                <input
                  className="form"
                  type="text"
                  name="user"
                  placeholder=""
                  id="user"
                ></input>
                <label for="pw">Password</label>
                <input
                  className="form"
                  type="password"
                  name="pw"
                  placeholder=""
                  id="pw"
                ></input>
                <button className="form">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
