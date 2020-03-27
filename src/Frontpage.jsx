import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { fetchArticles } from "./utils/getUtils";
import ArticlePreview from "./ArticlePreview";
import SortTab from "./SortTab";
import noArticlesYetBackground from "./images/emptypage.jpg";
import styles from "./css/Frontpage.module.css";

class Frontpage extends Component {
  state = {
    articles: null,
    isLoading: true,
    err: null
  };

  sneakyUpwardChange = articles => {
    console.dir(articles);

    const sort_by = localStorage.getItem("sort_by") || "created_at";
    const order = localStorage.getItem("order") || "desc";

    if (sort_by === "votes") {
      articles.sort((a, b) =>
        order === "desc" ? b.votes - a.votes : a.votes - b.votes
      );
    }

    this.setState({ articles, isLoading: false });
  };

  passUpQueries = queries => {
    window.location.reload(false);
    // fetchArticles(this.sneakyUpwardChange, queries);

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
      const sort_by = localStorage.getItem("sort_by") || "created_at";
      const order = localStorage.getItem("order") || "desc";
      fetchArticles(this.sneakyUpwardChange, { sort_by, order });
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

        {this.state.isLoading ? (
          <>
            <br />
            <br />
            <br />l o a d i n g . . .
          </>
        ) : this.state.articles.length ? (
          this.state.articles.map(article => {
            return (
              <div id={article.article_id}>
                <ArticlePreview article={article} />
              </div>
            );
          })
        ) : (
          <div className={styles.errorImageHolder}>
            <img
              className={styles.errorImage}
              src={noArticlesYetBackground}
              alt="Pens and paper"
            />
            <p className={styles.errorText}>
              No articles found for this topic.
            </p>

            <br />

            <p className={styles.errorText}>
              Why not be the first to write one!
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Frontpage;
