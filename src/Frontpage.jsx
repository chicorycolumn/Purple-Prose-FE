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

  passUpQueries = queries => {
    window.location.reload(false);
  };

  componentDidMount() {
    const qObj = {};

    const qArr = this.props.location.search.replace("?", "").split("=");

    qObj[qArr[0]] = qArr[1];

    const sort_by = localStorage.getItem("sort_by") || "created_at";
    const order = localStorage.getItem("order") || "desc";

    qObj.sort_by = sort_by;
    qObj.order = order;

    fetchArticles(qObj).then(articles => {
      if (sort_by === "votes") {
        articles.sort((a, b) =>
          order === "desc" ? b.votes - a.votes : a.votes - b.votes
        );
      }

      this.setState({ articles, isLoading: false });
    });
  }

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }
    return (
      <div>
        <SortTab passUpQueries={this.passUpQueries} />

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
