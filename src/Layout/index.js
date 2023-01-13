import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";

function Layout() {
  return (
    <div className="container">
      {/* TODO: Implement the screen starting here */}
      <Header />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Layout;
