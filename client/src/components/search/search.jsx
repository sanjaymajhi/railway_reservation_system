import React, { Component } from "react";
import Searchsidenav from "./searchSideNav";
import Searchresults from "./searchResults";
class Search extends Component {
  render() {
    return (
      <div id="train-search-page">
        <div id="train-side-nav">
          <Searchsidenav {...this.props} />
        </div>
        <div id="train-main">
          {this.props.location.state.trains.map(train => (
            <div key={train._id} className="train-search-results">
              <Searchresults
                {...this.props}
                date={this.props.location.state.date}
                class={this.props.location.state.class}
                train={train}
                route={this.props.location.state.route_detail}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
