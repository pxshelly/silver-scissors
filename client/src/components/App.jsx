import React from 'react';
import Header from './Header.jsx';
import Calendar from './Calendar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        <Calendar />
      </div>
    );
  }
}

export default App;