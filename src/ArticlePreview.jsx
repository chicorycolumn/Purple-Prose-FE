import React from "react";
import styles from "./css/ArticlePreview.module.css";
import { Link, navigate } from "@reach/router";
import VoteDisplayOnArticle from "./VoteDisplayOnArticle";
import { fetchArticleByID } from "./utils/getUtils";
import { deleteArticleByID } from "./utils/deleteUtils";
import { formatDate } from "./utils/formatDate";
import commentIcon from "../src/images/speechbubble6.png";
import globalStyles from "./css/Global.module.css";

class ArticlePreview extends React.Component {
  state = { article: null, votes: null, currentUser: "" };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");

    fetchArticleByID(this.props.article.article_id).then((data) => {
      this.setState({
        currentUser,
        article: data["article"],
        votes: data["article"].votes,
      });
    });
  }

  upwardVoteOnArticle = (voteDirection) => {
    this.setState((currState) => {
      return { votes: currState.votes + voteDirection };
    });
  };

  deleteArticle(e) {
    e.preventDefault();
    var retVal = window.confirm(
      `Hiya ${this.state.currentUser}! You're about to delete your ${this.state.article.topic} article.`
    );
    if (retVal === true) {
      deleteArticleByID(this.props.article.article_id).then(() => {
        window.location.reload(false);
      });
    } else {
      return;
    }
  }

  render() {
    const {
      comment_count,
      title,
      author,
      topic,
      created_at,
      article_id,
    } = this.props.article;

    return (
      <div className={styles.containerGrid}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/articles/${this.props.article.article_id}`}
        >
          <div className={styles.centralContainer}>
            <p className={styles.title}>{title}</p>

            <div className={styles.authorAndButtonsContainer}>
              {this.state.currentUser === this.props.article.author ? (
                <div className={styles.deleteAndEditHolder}>
                  <button
                    className={`${styles.deleteAndEditButton} ${styles.buttonEd} ${globalStyles.buttonColoringLight}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        `/articles/${this.props.article.article_id}/edit`
                      );
                    }}
                  >
                    Edit
                  </button>

                  <p className={styles.author}>by {author}</p>
                  <div className={styles.mobileContainer}>
                    <button
                      className={`${styles.deleteAndEditButton} ${styles.buttonEdMob} ${globalStyles.buttonColoringLight}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(
                          `/articles/edit/${this.props.article.article_id}`
                        );
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.deleteAndEditButton} ${styles.buttonDel} ${globalStyles.buttonColoringLight}`}
                      onClick={(e) => {
                        this.deleteArticle(e);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <p className={styles.author}>by {author}</p>
              )}
            </div>
          </div>
        </Link>

        <div className={styles.leftHandSideContainer}>
          <VoteDisplayOnArticle
            article_id={article_id}
            votes={this.state.votes}
            upwardVoteOnArticle={this.upwardVoteOnArticle}
          />
        </div>

        <div className={styles.rightHandSideContainer}>
          <p className={styles.topic}>{topic}</p>
          <p className={styles.comments}>
            <span>
              <img
                src={commentIcon}
                className={styles.commentIcon}
                alt="Speech bubble"
              />
            </span>

            {` ${comment_count} `}
          </p>
          <p className={styles.created_at}>{formatDate(created_at)}</p>
        </div>
      </div>
    );
  }
}

export default ArticlePreview;
