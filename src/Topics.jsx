import React, { Component } from "react";
import { navigate } from "@reach/router";
import { fetchTopics } from "./utils/getUtils";
import TopicCard from "./TopicCard";
import SortTab from "./SortTab";
import LoadingPage from "./LoadingPage";

class Topics extends Component {
  state = {
    topics: null,
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    fetchTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  }

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }

    return (
      <>
        <SortTab showSorter={false} />
        <div>
          <div>
            {this.state.isLoading ? (
              <LoadingPage />
            ) : (
              <TopicCard topics={this.state.topics} />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Topics;
