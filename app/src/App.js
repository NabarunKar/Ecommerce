import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Product from "./pages/Product";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { useAuthContext } from "./hooks/useAuthContext";
import Cart from "./components/Cart";
import Review from "./components/Review";
import Browse from "./pages/Browse";

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Navbar />
      <Cart />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:id">
          <Product />
        </Route>
        <Route path="/products">
          <Browse />
        </Route>
        <Route path="/reviews/:id">
          <Review />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/profile">{user && <Profile />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
