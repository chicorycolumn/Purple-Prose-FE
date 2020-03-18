import React, { Component } from "react";
import { fetchArticles } from "./utils/getUtils";
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
    fetchArticles(this.sneakyUpwardChange);
  }

  render() {
    return (
      <div>
        <p>
          {this.state.isLoading
            ? "loading..."
            : this.state.articles.slice(0, 3).map(article => {
                // DELETE THIS SLICE!
                return <ArticlePreview article={article} />;
              })}
        </p>
      </div>
    );
  }
}

export default Frontpage;
