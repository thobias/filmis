import React from 'react';
import ReactDOM from 'react-dom';

import {API} from './services/api.jsx';

import ResultList from './components/resultList.jsx';
import Searchbar from './components/searchBar.jsx';
import Pagination from './components/pagination.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
    this.searchApi = this.searchApi.bind(this);
    this.api = API;
    this.api.setCallback(this.renderResults.bind(this)).setEndpoint('all.json?order=by-publication-date').fetch();
  }

  renderResults() {
    this.setState({
      results: this.api.data
    });
  }

  searchApi(searchString) {
    if(searchString === '') {
      return this.api.setEndpoint('all.json?order=by-publication-date').fetch();
    }
    return this.api.setEndpoint(`search.json?query=${searchString}`).fetch();
  }
  
  render() {
    return (
      <div>
      <Searchbar callback={this.searchApi} placeholder="Search for a review" />
      <ResultList results={this.state.results} />
      <Pagination api={this.api} />
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('App')
);