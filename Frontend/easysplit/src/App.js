// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Redirect, Route, Switch
} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import RouterManager from "./Components/RouterManager";


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

const authentication = auth.onAuthStateChanged((user) => user);
const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/dashboard" fallbackRoute="/login">
              <RouterManager />
            </PrivateRoute>
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
