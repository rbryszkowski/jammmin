import React from 'react';
import './playlist.css';
import {Tracklist} from '../tracklist/tracklist.js';

export class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    let newName = e.target.value;
    this.props.onNameChange(newName);
  }

  render() {
    return (
      <div className="Playlist">
        <input
        onChange={this.handleNameChange}
        defaultValue="New Playlist"/>
        <Tracklist
        onRemove={this.props.onRemove}
        isRemoval={true}
        tracks={this.props.playlistTracks} />
        <button
        className="Playlist-save"
        onClick={this.props.onSave}>
        SAVE TO SPOTIFY
        </button>
      </div>
    );
  }

}
