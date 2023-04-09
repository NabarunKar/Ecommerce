import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/items/:id">
            <ProductDetails />
          </Route>
          <Route exact path="/about">
            <AboutUs />
          </Route>
          <Route exact path="/contact">
            <ContactUs />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/create">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
