//App page implementation

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./custom.css";

import logoconnect from "./images/logoconnect.jpeg"; // gives image path
import bgimg from "./images/bgimg.jpg"; // gives image path
import bgimage from "./images/bgimage.svg"; // gives image paths

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Features from "./components/Features";
import Faq from "./components/Faq";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router>
          <div style={{
             // backgroundColor: '#e9ecef',
              backgroundImage: `url(${bgimage})`,
              backgroundSize: "cover",
              backgroundRepeat: 'no-repeat',
              //marginTop: '-70px',
              //fontSize: '50px',
              height: "750vh",
              //color: "#e9ecef"
          }}>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
                      <img
                          src={logoconnect} width="50" height="50"
                          alt="profile-img"
                          className="profile-img-card"
                      />
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/aboutus"} className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/features"} className="nav-link">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contactus"} className="nav-link">
                Contacts Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/faq"} className="nav-link">
                Faq
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/features" component={Features} />
            <Route exact path="/faq" component={Faq} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
