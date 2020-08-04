import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import LandingPage from "./components/Views/LandingPage/LandingPage";
import LoginPage from "./components/Views/LoginPage/LoginPage";
import RegisterPage from "./components/Views/RegisterPage/RegisterPage";
import MovieDetail from "./components/Views/MovieDetail/MovieDetail";
import Auth from "./hoc/auth";


function App() {
  return (
    <Router>
      <div>

        <hr />

        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
