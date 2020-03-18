import React, { Component } from "react";
import { fetchTopics } from "./utils/getUtils";
import TopicCard from "./TopicCard";

class Users extends Component {
  state = {
    topics: null,
    isLoading: true
  };

  sneakyUpwardChange = topics => {
    this.setState({ topics, isLoading: false });
  };

  componentDidMount() {
    fetchTopics(this.sneakyUpwardChange);
  }

  render() {
    return (
      <div>
        <p>
          {this.state.isLoading ? (
            "loading..."
          ) : (
            <TopicCard topics={this.state.topics} />
          )}
        </p>
      </div>
    );
  }
}

export default Users;
