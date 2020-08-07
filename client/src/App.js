import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./hoc/auth";

import LandingPage from "./components/Views/LandingPage/LandingPage";
import LoginPage from "./components/Views/LoginPage/LoginPage";
import RegisterPage from "./components/Views/RegisterPage/RegisterPage";
import NavBar from "./components/Views/NavBar/NavBar";
import Footer from "./components/Views/Footer/Footer"
import MovieDetail from "./components/Views/MovieDetail/MovieDetail";

import FavoritePage from "./components/Views/FavoritePage/FavoritePage";


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
        </Switch>
      </div>
    </Suspense>
  )
}

export default App
