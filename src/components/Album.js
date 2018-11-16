import React, {Component} from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album
    };
  }

  render() {
    return(
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          /*This is the Song list protion I'm working on, I have it commented out currently. I'm not at all sure if I'm on the right track at the moment...
            {      
              this.state.album.songs.map((song, index) =>
                <Link to={`/album/${album.slug}`} key={index}>
                  <React.Fragment key={album.title}>

                  </React.Fragment>
                </Link>
              )
            }
            */
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
