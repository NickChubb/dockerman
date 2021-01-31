import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * Import all page components here
 */
import App from './App';
import MainPage from './components/MainPage';
import ContainerPage from './components/ContainerPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  // <Route path="/" component={App}>
    <Route path="/" component={App}>
      <Route exact path="/" component={MainPage} />
      <Route path="/containers" component={ContainerPage} />
    </Route>
  // </Route>
);