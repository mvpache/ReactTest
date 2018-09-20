import React, {Component} from 'react';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: 'all'
    }
  }

  handleSelection = (event) => {
    this.setState({ selectedOption: event.target.value });
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
          <input type="radio" value={option}
            checked={this.state.selectedOption === `${option}`}
            onChange={this.handleSelection} />
          {option}
      </label>
      </div>)}
    </form>;
  }
}
export default Filter;
