import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
//import './css-jams.css';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 1,
      isPlaying: false,
      isHovered: null
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({currentTime: this.audioElement.currentTime});
      },
      durationchange: e => {
        this.setState({duration: this.audioElement.duration});
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play() {
    this.audioElement.play();
    this.setState({isPlaying: true});
  }

  pause() {
    this.audioElement.pause();
    this.setState({isPlaying: false});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {this.setSong(song);}
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length -1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({currentTime: newTime});
  }

  formatTime(duration) {
    const songMinutes = Math.floor(duration / 60) + ":" + Math.floor(duration % 60);
    const songTime = duration === null ? "-:--" : songMinutes;
    return songTime.toString();
  }

  handleVolumeChange(e) {
    const newVolume = this.audioElement.volume = e.target.value;
    //console.log(newVolume);
    this.setState({volume: newVolume});
  }

  handleSongHover(song) {
      this.setState({isHovered: song})
    //console.log(song);
  }

  handleSongLeave(song) {
    this.setState({isHovered: null})
  }

/*  getIconFor(song, index) {
    const isCurrentHover = this.state.currentSong === this.state.isHovered;
    const play = <span className="ion-md-play"></span>;
    const pause = <span className="ion-md-pause"></span>;
    if (isCurrentHover && this.state.isPlaying) {
      //console.log('1')
      return (pause)
    } else if (this.state.isHovered) {
      //console.log('2')
      return (play)
    } else {
      //console.log('3')
      return index + 1;
    }
  }*/

  getIconFor(song, index) {
    const isCurrentHover = this.state.currentSong === this.state.isHovered;
    const play = <span className="ion-md-play"></span>;
    const pause = <span className="ion-md-pause"></span>;
    if (isCurrentHover && this.state.isPlaying) {
      //console.log('1')
      return (pause)
    } else if (this.state.isHovered) {
      //console.log('2')
      return (play)
    } else {
      //console.log('3')
      return index + 1;
    }
  }

//Am working on a way to correct the behavior where all songs are treated as hovered.
  /*getIconFor(song, index) {
    //const isCurrentHover = this.state.currentSong === this.state.isHovered;
    const play = <span className="ion-md-play"></span>;
    const pause = <span className="ion-md-pause"></span>;

    if (this.state.isHovered) {
      if (song === this.state.isHovered && this.state.isPlaying) {
        return (pause);
      } else {
        return index + 1;
      }
    } else {
      if ((song === this.state.isHovered) && (song !== this.state.isPlaying)) {
        return (play)
      } else {
        return index + 1;
      }
    }
  }*/

  render() {
    //console.log(this.state.isHovered);
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
            {
              this.state.album.songs.map((song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleSongHover(song)} onMouseLeave={() => this.handleSongLeave()}>
                  <td>{this.getIconFor(song, index)}</td>
                  <td>{song.title}</td>
                  <td>{this.formatTime(song.duration)}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentVolume={this.audioElement.currentVolume}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={this.formatTime}
        />
      </section>
    );
  }
}

export default Album;
