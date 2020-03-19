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
    fetchArticles(this.sneakyUpwardChange);
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
