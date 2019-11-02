import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ServiceTables from './ServiceTables.jsx';
import VisitUs from './VisitUs.jsx';

function Routes() {
  return (
    <Switch>
      <Route exact path="/services" component={ServiceTables} />
      <Route exact path="/visit-us" component={VisitUs} />
    </Switch>
  )
}

export default Routes;