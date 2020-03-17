import React, { Component } from "react";
import fetchArticlesUtil from "./utils/fetchArticlesUtil";
import ArticlePreview from "./ArticlePreview";

class Frontpage extends Component {
  state = {
    articles: null,
    isLoading: true
  };

  sneakyUpwardChange = articles => {
    this.setState({ articles, isLoading: false });
  };

  componentDidMount() {
    fetchArticlesUtil(this.sneakyUpwardChange);
  }

  render() {
    return (
      <div>
        <p>
          {this.state.isLoading
            ? "loading..."
            : this.state.articles.map(article => {
                return <ArticlePreview article={article} />;
              })}
        </p>
      </div>
    );
  }
}

export default Frontpage;
