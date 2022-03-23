import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { UserApi } from "./controllers/apis/user.api";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import Dashboard from "./Components/Dashboard";
import { useState, useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import React from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDuqfN8W85SXnYiG-7dL3TVw8lBT49UelY",
  authDomain: "easy-split-g28.firebaseapp.com",
  projectId: "easy-split-g28",
  storageBucket: "easy-split-g28.appspot.com",
  messagingSenderId: "649693199776",
  appId: "1:649693199776:web:ab133727306fb7585cf8c5",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

const authentication = auth.onAuthStateChanged((user) => user);

const PrivateRoute = (props) => {
  const [user, setUser] = useState(auth.currentUser);

  return (
    <Route
      render={() => {
        return authentication ? (
          props.children
        ) : (
          <Redirect to={props.fallbackRoute} />
        );
      }}
    />
  );
};

function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/dashboard" fallbackRoute="/login">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
