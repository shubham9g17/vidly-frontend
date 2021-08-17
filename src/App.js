import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/common/notFound";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
