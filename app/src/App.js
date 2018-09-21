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

  getTopTen(data) {
    const topTen = [];
    data.forEach(child => {
      //iterate through data set
      //if topTen is empty, add the first piece of data
      if (topTen.length === 0) {
        topTen.push(child);
        //if topTen is less than 10
        //iterate through topTen
      } else if (topTen.length < 10) {
        for (let i = 0; i < topTen.length; i++) {
          //is Child greater than or equal to TopChild?
          if (child[12]/1 >= topTen[i][12]/1) {
            if (i === topTen.length - 1) {
              //is this the last index?
              //push the child onto TopTen
              topTen.push(child);
              return;
              //is less or equal to the next one?
              //splice it here and return
            } else if (child[12]/1 <= topTen[i + 1][12]/1) {
  
              topTen.splice(i+1, 0, child);
              return;
            }
          } else {
            topTen.unshift(child);
            return;
          }
        }
      } else if (topTen.length === 10) {
        for (let i = 0; i < topTen.length; i++) {
          if (child[12]/1 >= topTen[i][12]/1) {
            if (i === topTen.length - 1) {
              topTen.shift();
              topTen.push(child);
              return;
            } else if (child[12]/1 <= topTen[i + 1][12]/1) {
              topTen.splice(i+1, 0, child);
              topTen.shift();
              return;
            }
          }
        }
      }
    })
    return topTen;
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
        return newData;
      })
      .then(newData => {
        const newFilteredData = this.getTopTen(newData);
        console.log(newFilteredData)
        return newFilteredData;
      }).then(filteredData => {
      this.setState({ ...this.state, activeFilters: activeFilters, data: filteredData })
      }).catch('ERROR WITH REQUEST')
  }

  applyFilter(newFilter) {
    const filterCopy = { ...this.state.activeFilters, ...newFilter }
    return this.filterData(filterCopy);
    //use filter data with activeFilters(the copy)
    //set state for new activefilters and data
    }

  componentDidMount() {
    axios
      .get(`https://data.cityofnewyork.us/api/views/25th-nujf/rows.json`)
      .then(names => {
        const possible = 
        this.getPossibleFilters(names.data.data)
        const topTen = this.getTopTen(names.data.data);
        this.setState({
          ...this.state,
          possibleFilters: possible,
          data: topTen,
        });
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
