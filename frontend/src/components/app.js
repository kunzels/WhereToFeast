import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import ProfileContainer from "./profile/profile_container";
import SplashContainer from "./splash/splash_container"
import HomeContainer from "./main/home_container";
import Randomizer from './randomizer/randomizer'

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={SplashContainer} />
      <AuthRoute exact path="/randomizer" component={Randomizer} />
      <AuthRoute exact path="/main" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/home" component={HomeContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
    </Switch>
  </div>
);

export default App;