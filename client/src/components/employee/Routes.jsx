import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Calendar from './Calendar.jsx';
import ApptForm  from './ApptForm.jsx';

function Routes() {
  return (
    <Switch>
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/create-appointment" component={ApptForm} />
    </Switch>
  )
}

export default Routes;