import React, { Component } from 'react';
import axios from 'axios';

import FiltersContainer from './FiltersContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      possibleFilters: {
        year: [],
        gender: [],
        ethnicity: []
      },
      data: false
    };
  }

  getPossibleFilters(data) {
    //iterate through each item in data
    //if item at 8, 9, 10 not in possible filters, add
    const year = [];
    const gender = [];
    const ethnicity = [];
    data.forEach(child => {
      if (!year.includes(child[8])) {
        year.push(child[8])
      }
      if (!gender.includes(child[9])) {
        gender.push(child[9])
      }
      if (!ethnicity.includes(child[10])) {
        ethnicity.push(child[10]);
      }
    });
    return { year: year, gender: gender, ethnicity: ethnicity }
  }

  componentDidMount() {
    axios
      .get(`https://data.cityofnewyork.us/api/views/25th-nujf/rows.json`)
      .then(names => {
        const possible = this.getPossibleFilters(names.data.data)
        this.setState({
          possibleFilters: possible, 
          data: names.data.data })
      })
      .catch();
  }

  //iterate through all the raw data to grab year, ethnicity, gender options
  //will have to make a new request each time the data is filtered
  //will need function for filtering data

  render() {
    return (
      <div>
        <FiltersContainer filters=
        {this.state.possibleFilters}/>
      </div>
    );
  }
}

export default App;
