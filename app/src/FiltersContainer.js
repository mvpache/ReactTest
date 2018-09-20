import React from 'react';

import Filter from './Filter';

const FiltersContainer = props => {
  //filters will have a selected state
  //each filter will use that state to determine active button
  //each filter will have a function to change the active filter state
  const apply = (item) => {
    console.log('apply')
    props.applyFilter(item);
  }

  return (
  <div>
    <Filter 
      options={props.filters.ethnicity} 
      apply={props.applyFilter} />
    <Filter 
      options={props.filters.gender} 
      apply={() => apply()} />
    <Filter 
      options={props.filters.year} 
      apply={props.applyFilter} />
  </div>
)};

export default FiltersContainer;