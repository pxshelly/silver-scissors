import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ServiceTables from './ServiceTables.jsx';
import VisitUs from './VisitUs.jsx';
import ApptForm from './ApptForm.jsx';
import ApptPage from './ApptPage.jsx';
import Login from '../shared/Login.jsx';
import Logout from '../shared/Logout.jsx';
import Homepage from '../shared/Homepage.jsx'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/services" component={ServiceTables} />
      <Route exact path="/request-appointment" component={ApptForm} />
      <Route exact path="/visit-us" component={VisitUs} />
      <Route exact path="/my-appointments" component={ApptPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logged-out" component={Logout} />
    </Switch>
  )
}

export default Routes;