import React from 'react';

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.delay = false;
  }

  handleChange(event) {
    this.setState({value: event.target.value});

    const runCallback = function() {
      this.props.callback(this.state.value);
      this.delay = false;
    }

    if(!this.delay) {
      this.delay = setTimeout(runCallback.bind(this), 500);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="searchBar" type="text" value={this.state.value} onChange={this.handleChange} placeholder={this.props.placeholder}></input>
      </form>
    );
  }
};