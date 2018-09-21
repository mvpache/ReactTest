import React from 'react';

const AppliedFilters = props => (
  <div>
    <h3>Applied Filters</h3>
    {Object.keys(props.filters).map(filter => 
        <p key={filter}>{`${filter}: ${props.filters[filter]}`}</p>
      )}
  </div>
);

export default AppliedFilters;
