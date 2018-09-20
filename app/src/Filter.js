import React, {Component} from 'react';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: 'all'
    }
  }

  handleSelection = (event) => {
    this.props.apply(
      {[this.props.filterType]: event.target.value}
      )
    this.setState({ selectedOption: event.target.value });
    //add a call back function here that applies a filter to the filter container
  };

  render() {
    return <form>
      <div>
        <label>
          <input type="radio" value="all"
            checked={this.state.selectedOption === 'all'}
            onChange={this.handleSelection} />
          All
      </label>
      </div>
      {this.props.options.map(option => <div>
        <label>
          <input type="radio" value={option} key={option.index}
            checked={this.state.selectedOption === `${option}`}
            onChange={this.handleSelection} />
          {option}
      </label>
      </div>)}
    </form>;
  }
}
export default Filter;
