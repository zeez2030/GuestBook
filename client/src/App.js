import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layouts/Navbar";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import AuthState from "./context/auth/AuthState";
import MessageState from "./context/messages/MessageState";

const App = () => {
  return (
    <AuthState>
      <MessageState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </MessageState>
    </AuthState>
  );
};

export default App;
