import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { fetchTopics } from "./utils/getUtils";
import TopicCard from "./TopicCard";

class Users extends Component {
  state = {
    topics: null,
    isLoading: true,
    err: null
  };

  sneakyUpwardChange = topics => {
    this.setState({ topics, isLoading: false });
  };

  componentDidMount() {
    fetchTopics(this.sneakyUpwardChange);
  }

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }

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
