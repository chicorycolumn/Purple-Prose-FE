import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { fetchArticles } from "./utils/getUtils";
import ArticlePreview from "./ArticlePreview";
import SortTab from "./SortTab";

class Frontpage extends Component {
  state = {
    articles: null,
    isLoading: true,
    err: null
  };

  sneakyUpwardChange = articles => {
    this.setState({ articles, isLoading: false });
  };

  passUpQueries = queries => {
    fetchArticles(this.sneakyUpwardChange, queries);
    // promise verison
    // fetchArticles(queries)
    //   .then(articles => {
    //     this.setState({ articles, isLoading: false })
    //   })
    // .catch(err => {
    //   console.log("***************");
    //   console.log(err);
    //   this.setState({
    //     err
    //   });
    // });
  };

  componentDidMount() {
    if (this.props.location.search) {
      const qArr = this.props.location.search.replace("?", "").split("=");

      const qObj = {};

      qObj[qArr[0]] = qArr[1];

      fetchArticles(this.sneakyUpwardChange, qObj);
      // .catch(err => {
      //   console.log("***************");
      //   console.log(err);
      //   this.setState({
      //     err
      //   });
      // });
    } else {
      fetchArticles(this.sneakyUpwardChange);
      // .catch(err => {
      //   console.log("***************");
      //   console.log(err);
      //   this.setState({
      //     err
      //   });
      // });
    }
  }

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }
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
