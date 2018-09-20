import React, { Component } from 'react';

import Filter from './Filter';

class FiltersContainer extends Component {
  constructor() {
    super();
    this.state = {
      year: '',
      gender: '',
      ethnicity: '',
    }
  }
  
  //filters will have a selected state
  //each filter will use that state to determine active button
  //each filter will have a function to change the active filter state
  //filters will have a function to change the active filters applied to app component
  render() {
    return (
      <div><Filter options={this.props.filters.ethnicity} />
      <Filter options={this.props.filters.gender} />
      <Filter options={this.props.filters.year} />
      </div>
    )
  }
}

export default FiltersContainer;