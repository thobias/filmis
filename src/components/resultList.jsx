import React from 'react';
import ReactModal from 'react-modal';

class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false
    };
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  toggleDescription() {
    this.setState({showDescription: !this.state.showDescription});
  }

  render() {
    return (
      <div className="resultItem" onClick={this.toggleDescription}>
        <div className="resultItem-front">
          <h2>{this.props.title}</h2>
          {this.props.image && <img src={this.props.image} />}
        </div>
        {this.state.showDescription &&
        <div className="resultItem-back">
          <h1>{this.props.headline}</h1>
          <h2>{this.props.title}</h2>
          <p>{this.props.summary}</p>
          <a href={this.props.url} target="_blank">Read the review</a>
        </div>
      }
      </div>
    )
  }
}

export default class ResultList extends React.Component {
  render() {
    const generateListItem = (result) => <ResultItem key={result.link.url} url={result.link.url} summary={result.summary_short} headline={result.headline} image={result.multimedia ? result.multimedia.src : false} title={result.display_title} />;
    const results = this.props.results.map(generateListItem);

    return (
      <div className="resultList">{results}</div>
    )
  };
}