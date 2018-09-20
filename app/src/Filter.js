import React from 'react';

const Filter = (props) => {
    return <div>
    {props.options.map(option =>{
      return <h2>{option}</h2>
    })
    }
    </div>;
  }

export default Filter;
