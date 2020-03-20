import React, { Component } from "react";
import { fetchArticles } from "./utils/getUtils";
import ArticlePreview from "./ArticlePreview";
import SortTab from "./SortTab";

class Frontpage extends Component {
  state = {
    articles: null,
    isLoading: true
  };

  sneakyUpwardChange = articles => {
    this.setState({ articles, isLoading: false });
  };

  passUpQueries = queries => {
    fetchArticles(this.sneakyUpwardChange, queries);
  };

  componentDidMount() {
    if (this.props.location.search) {
      const qArr = this.props.location.search.replace("?", "").split("=");

      const qObj = {};

      qObj[qArr[0]] = qArr[1];

      fetchArticles(this.sneakyUpwardChange, qObj);
    } else {
      fetchArticles(this.sneakyUpwardChange);
    }
  }

  render() {
    return (
      <div>
        <SortTab passUpQueries={this.passUpQueries} ticket={Math.random()} />
        <p>
          {this.state.isLoading
            ? "loading..."
            : this.state.articles.map(article => {
                return (
                  <ArticlePreview
                    currentUser={this.props.currentUser}
                    article={article}
                  />
                );
              })}
        </p>
      </div>
    );
  }
}

export default Frontpage;
