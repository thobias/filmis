export const API = {
  baseUrl: 'https://api.nytimes.com/svc/movies/v2/reviews/',
  apiKey: 'dc35b61170d84289b2bc974977044e5d',
  pagination: {
    currentPage: 0,
    nextPage: false,
    prevPage: false
  },
  itemsPerPage: 20,
  endpoint: '',
  callback: null,
  data: [],
  setCallback: function(callback) {
    this.callback = callback;
    return this;
  },
  setEndpoint: function(endpoint) {
    this.clearPagination();
    this.endpoint = endpoint;
    return this;
  },
  clearPagination: function() {
    this.pagination = {
      currentPage: 0,
      nextPage: false,
      prevPage: false
    };
    return this;
  },
  responseToJSON: (response) => {
    return response.json();
  },
  processResponse: function(response) {
    console.log('done');
    this.pagination.nextPage = response.has_more ? this.pagination.currentPage + 1 : false;
    this.pagination.prevPage = this.pagination.currentPage > 0 ? this.pagination.currentPage - 1 : false;
    this.data = response.results;
    return response;
  },
  getNextPage: function() {
    if(this.pagination.nextPage === false) {return false;}
    this.pagination.currentPage = this.pagination.currentPage + 1;
    return this.fetch();
  },
  getPrevPage: function() {
    if(this.pagination.prevPage === false) {return false;}
    this.pagination.currentPage = this.pagination.currentPage - 1;
    return this.fetch();
  },
  fetch: function() {
    console.log('loading');
    const fetchUrl = `${this.baseUrl}${this.endpoint}&offset=${this.pagination.currentPage*this.itemsPerPage}&api-key=${this.apiKey}`;
    return fetch(fetchUrl).then(this.responseToJSON).then(this.processResponse.bind(this)).then(this.callback);
  }
};