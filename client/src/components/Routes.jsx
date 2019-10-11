import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Services from './Services.jsx';
import Calendar from './Calendar.jsx';
import VisitUs from './VisitUs.jsx';
import RequestAppointment from './RequestAppointment.jsx';

function Routes() {
  return (
    <Switch>
      {/* <Route exact path="/" component={FrontPage} /> */}
      <Route exact path="/services" component={Services} />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/visitus" component={VisitUs} />
      <Route exact path="/appointments" component={RequestAppointment} />
    </Switch>
  )
}

export default Routes;