
//let accessToken = "";
const clientID = "99f7afb2114045ff935df101b53fc1a4";
const redirectURI = "http://localhost:3000/";

//https://accounts.spotify.com/authorize?client_id=99f7afb2114045ff935df101b53fc1a4&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000/
//https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=token&scope=playlist-modify-public&redirect_uri=REDIRECT_URI

const Spotify = {

  accessToken: "",

  getAccessToken() {

    if(this.accessToken) {
      return this.accessToken;
    }

    const url = window.location.href;
    const accessTokenRegEx = url.match(/access_token=([^&]*)/);
    const tokenExpiresInRegEx = url.match(/expires_in=([^&]*)/);
    let tokenExpiresIn;

    if (accessTokenRegEx && tokenExpiresInRegEx) {
      this.accessToken = accessTokenRegEx[1];
      tokenExpiresIn = Number(tokenExpiresInRegEx[1]);
      window.setTimeout(() => this.accessToken = '', tokenExpiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return this.accessToken;
    } else {
      //redirect to spotify accounts page:
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }

  },

  async search(term) {

    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const accessToken = this.getAccessToken();
    console.log(accessToken);

    try {
      const response = await fetch( endpoint, {headers: {Authorization: `Bearer ${accessToken}`} } );
      console.log('response:', response);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('json response:', jsonResponse);
        if (!jsonResponse.tracks) {
          return [];
        } else {
          const tracksArray = jsonResponse.tracks.items.map(track => {
            return {
            id: track.id,
            name: track.name,
            album: track.album.name,
            artist: track.artists[0].name,
            uri: track.uri
          };
        } );
        return tracksArray;
      }
    }
  } catch (error) {
    console.log(error);
  }
},

  async savePlaylist(playlistName, playlistTrackURIs) {

    if (playlistName && playlistTrackURIs) {
      const accessToken = this.getAccessToken();
      const headers = {Authorization: `Bearer ${accessToken}`};
      let userID;

      try {

        const response = await fetch('https://api.spotify.com/v1/me', {headers: headers} );

        if (response.ok) {

          const jsonResponse = await response.json();
          userID = jsonResponse.id;

          try {

            const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify( {name: playlistName} )
              });

              if (response.ok) {

                const jsonResponse = await response.json();
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                {
                  headers: headers,
                  method: 'POST',
                  body: JSON.stringify( {uris: playlistTrackURIs} )
                })

              }

          } catch(error) {
            console.log(error);
          }

        }

      } catch(error) {
        console.log(error);
      }
    } else {
      return;
    }
  }

}

export default Spotify;
