import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import LandingPage from "./components/Views/LandingPage/LandingPage"
import LoginPage from "./components/Views/LoginPage/LoginPage"
import RegisterPage from "./components/Views/RegisterPage/RegisterPage"
import Auth from "./hoc/auth"

function App() {
  return (
    <Router>
      <div>

        <hr />

        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
