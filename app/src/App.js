import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    axios
      .get(`https://data.cityofnewyork.us/api/views/25th-nujf/rows.json`)
      .then(names => this.setState({ names: names.data.data.slice(0, 10) }))
      .catch();
  }
  render() {
    return (
      <div>
        To get started, edit <code>src/App.js</code> and save to reload.
      </div>
    );
  }
}

export default App;
