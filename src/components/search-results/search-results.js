import React from 'react';
import './search-results.css';
import {Tracklist} from '../tracklist/tracklist.js';

export class SearchResults extends React.Component {

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <Tracklist
        onAdd={this.props.onAdd}
        isRemoval={false}
        tracks={this.props.searchResults} />
      </div>
    );
  }

}
