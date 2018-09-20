import React, { Component } from 'react';
import axios from 'axios';

import Filter from './Filter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      possibleFilters: {
        year: [],
        gender: [],
        ethnicity: []
      },
      activeFilters: {
        year: 'all',
        gender: 'all',
        ethnicity: 'all'
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

  filterData(activeFilters) {
    console.log('activeFilter');
    const newData = [];
    axios
      .get(`https://data.cityofnewyork.us/api/views/25th-nujf/rows.json`)
      .then(names => {
        if (activeFilters.year === 'all' && activeFilters.gender === 'all' && activeFilters.ethnicity === 'all') {
          newData.concat(names.data.data);
        } else {
          names.data.data.forEach(child => {
            if (activeFilters.gender === 'all' || activeFilters.gender === child[9]) {
              if (activeFilters.year === 'all' || activeFilters.year === child[8]) {
                if (activeFilters.ethnicity === 'all' || activeFilters.ethnicity === child[10]) {
                  newData.push(child);
                }
              }
            }
          });
        }
      })
      .catch('ERROR WITH REQUEST');
    return newData;
  }

  applyFilter(newFilter) {
    const filterCopy = { ...this.state.activeFilters, ...newFilter }
    const filteredData = this.filterData(filterCopy);
    //use filter data with activeFilters(the copy)1
    //set state for new activefilters and data
    this.setState({ ...this.state, activeFilters: filterCopy, data: filteredData })
  }

  componentDidMount() {
    axios
      .get(`https://data.cityofnewyork.us/api/views/25th-nujf/rows.json`)
      .then(names => {
        const possible = this.getPossibleFilters(names.data.data)
        this.setState({ ...this.state,
          possibleFilters: possible, 
          data: names.data.data })
      })
      .catch(console.log('ERROR WITH REQUEST'));
  }

  //iterate through all the raw data to grab year, ethnicity, gender options
  //will have to make a new request each time the data is filtered
  //will need function for filtering data

  render() {
    return <div>
      <Filter filterType={'ethnicity'} options={this.state.possibleFilters.ethnicity} apply={(info) => this.applyFilter(info)} />
        <Filter filterType={'gender'} options={this.state.possibleFilters.gender} apply={(info) => this.applyFilter(info)} />
      <Filter filterType={'year'} options={this.state.possibleFilters.year} apply={(info) => this.applyFilter(info)} />
      </div>;
  }
}

export default App;
