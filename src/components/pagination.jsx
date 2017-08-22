import React from 'react';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage() {
    this.props.api.getNextPage();
  }

  prevPage() {
    this.props.api.getPrevPage();
  }

  render() {
    return (
      <nav className="pagination">
      {this.props.api.pagination.prevPage !== false && <span role="button" onClick={this.prevPage}>Previous</span>}
      {this.props.api.pagination.nextPage !== false && <span role="button" onClick={this.nextPage}>Next</span>}
      </nav>
    )
  };
}