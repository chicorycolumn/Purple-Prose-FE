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

  componentDidMount() {
    fetchArticles(this.sneakyUpwardChange);
  }

  render() {
    return (
      <div>
        <SortTab />
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
