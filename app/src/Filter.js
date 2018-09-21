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

  };

  render() {
    return <form>
        <div>
          <h4>{this.props.filterType.toUpperCase()}</h4>
          <label>
            <input type="radio" value="all" checked={this.state.selectedOption === 'all'} onChange={this.handleSelection} />
            All
          </label>
        </div>
        {this.props.options.map((option, i) => <div>
            <label>
              <input type="radio" value={option} key={i} checked={this.state.selectedOption === `${option}`} onChange={this.handleSelection} />
              {option}
            </label>
          </div>)}
      </form>;
  }
}
export default Filter;
