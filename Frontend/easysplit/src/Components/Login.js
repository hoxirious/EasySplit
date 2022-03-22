import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../App";
import easysplitlogo from "../Resources/divided.png";
function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <nav
        id="mainNavbar"
        className="navbar navbar-dark bg-dark py-0 px-0 fixed-top d-flex"
      >
        <div className="nav-btns">
          <button
            className="btn btn-success my-2 mx-2 signup-btn"
          >
            Sign Up
          </button>
        </div>
      </nav>
      <div className="container-fluid login-content">
        <img
          src={easysplitlogo}
          alt="easysplitlogo"
          className="img-fluid logo"
        />
        <h1>Log In</h1>
        <form action="none">
          <div className="htmlF-group login">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email..."
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-group login">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Email..."
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
          </div>
        </form>
        <button
          onClick={login}
          className="btn btn-success my-2 mx-2 login-btn"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
