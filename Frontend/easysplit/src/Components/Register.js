import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../App";
import { Link, useQuery } from "react-router-dom";
import { createUser } from "../controllers/apis/user.api";
import easysplitlogo from "../Resources/divided.png";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const email = user.user.email;
      const jwt = await user.user.getIdToken();
      const userInfo = {
        name: registerName,
        email,
        friendList: [],
      };
      await createUser(userInfo, jwt);
    } catch (error) {}
  };

  return (
    <div className="register-container">
      <nav
        id="mainNavbar"
        className="navbar navbar-dark bg-dark py-0 px-0 fixed-top d-flex"
      >
        <div className="nav-btns">
          <Link className="btn btn-success my-2 mx-2 login-btn" to={"/login"}>
            Log In
          </Link>
        </div>
      </nav>
      <div className="container-fluid register-content">
        <img
          src={easysplitlogo}
          alt="easysplitlogo"
          className="img-fluid logo"
        />
        <h1>Sign Up</h1>
        <form action="none">
          <div className="form-group register">
            <label htmlFor="name">Full Name</label>
            <input
              type="name"
              className="form-control"
              id="name"
              placeholder="Your name..."
              onChange={(event) => {
                setRegisterName(event.target.value);
              }}
            />
          </div>
          <div className="form-group register">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email..."
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-group register">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password..."
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
          </div>
        </form>
        <button
          className="btn btn-success my-2 mx-2 register-btn"
          onClick={register}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Register;
