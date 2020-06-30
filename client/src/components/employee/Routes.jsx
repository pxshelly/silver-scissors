import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Calendar from './Calendar.jsx';
import ApptForm  from './ApptForm.jsx';
import PendingAppts from './PendingAppts.jsx';
import Login from '../shared/Login.jsx';
import Logout from '../shared/Logout.jsx';
import Homepage from './Homepage.jsx';
import Dashboard from './Dashboard.jsx';

function Routes(props) {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/home" component={Dashboard} />
      <Route exact path="/calendar" render={() => {
        if (props.loggedIn) {
          return <Calendar />
        } else {
          return <Redirect to='/login'/>
        }
      } }/>
      <Route exact path="/create-appointment" render={() => {
        if (props.loggedIn) {
          return <ApptForm />
        } else {
          return <Redirect to='/login'/>
        }
      } }/>
      <Route exact path="/pending-appointments" render={() => {
        if (props.loggedIn) {
          return <PendingAppts />
        } else {
          return <Redirect to='/login'/>
        }
      } }/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/logged-out" component={Logout} />
    </Switch>
  );
}

export default Routes;