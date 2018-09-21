import React from 'react';
import styled from 'styled-components';

const AppliedContainer = styled.div`
  display: inline-block;
  border: 2px solid black;
  justify-content: center;

`

const AppliedFilter = styled.h3`
  display: flex;
  padding: 0% 5% 0% 5%;
`;
const AppliedFilters = props => (
  <div>
  <h3>Applied Filters</h3>
  <AppliedContainer>
    {Object.keys(props.filters).map(filter => 
        <AppliedFilter key={filter}>{`${filter}: ${props.filters[filter]}`}</AppliedFilter>
      )}
  </AppliedContainer>
  </div>
);

export default AppliedFilters;
