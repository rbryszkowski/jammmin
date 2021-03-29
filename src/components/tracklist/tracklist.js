import React from 'react';
import './tracklist.css';
import {Track} from '../track/track.js';

export class Tracklist extends React.Component {

  createTracklist() {
    //console.log('the culprit, this should be an array:', this.props.tracks);
    const tracklist = this.props.tracks.map(track => {
      return (
        <Track
        onAdd={this.props.onAdd}
        isRemoval={this.props.isRemoval}
        onRemove={this.props.onRemove}
        track={track}
        key={track.id}/>
      );
    } );
    return tracklist;
  }

  render() {
    return (
      <div className="TrackList">
        {this.createTracklist()}
      </div>
    );
  }

}
