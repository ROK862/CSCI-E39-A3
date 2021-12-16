import React from "react";
import styled from "styled-components";
import DocumentationView from "./views/DocumentationView";
import AppProvider from "./context/AppProvider"; 
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddTimerView from "./views/AddTimersView";
import DashboardView from "./views/DashboardView";

const Container = styled.div`
  height: 100vh;
  display: block;
  overflow: hidden;
`;

const App = () => {
      // Add context Store to the entire application.
      // Not sure if this is the right way, but should work for my setting.
      // Looking forward to inputs, perhaps some good old constructive criticism :)
  return (
    <AppProvider>
      <Container>
        <Router>
          <nav>
            <h1 className="nowrap" href="index.html">
              ROK862's CSCI E39 A3
            </h1>
            <ul>
              <li>
                <Link to="/assignment-3-ROK862/">Queue</Link>
              </li>
              <li>
                <Link to="/assignment-3-ROK862/add">Configure Queue</Link>
              </li>
              <li>
                <Link to="/assignment-3-ROK862/docs">Documentation</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/assignment-3-ROK862/">
              <DashboardView />
            </Route>
            <Route exact path="/assignment-3-ROK862/docs">
              <DocumentationView />
            </Route>
            <Route exact path="/assignment-3-ROK862/add">
              <AddTimerView />
            </Route>
          </Switch>
        </Router>
      </Container>
    </AppProvider>
  );
}

export default App;
