import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// from env.json loaded by webpack
const YOUTUBE_API_KEY = ENV['API_KEY'];

// Create a new component. This should produce some HTML
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.search('surfboards');
  }

  render() {
    const debouncedSearch = _.debounce(term => this.search(term), 300);
    return (
      <div>
        <SearchBar onSearchTermChange={term => debouncedSearch(term)} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }

  search(term) {
    YTSearch({key: YOUTUBE_API_KEY, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }
}

// Take the component's generated HTML and put it in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));