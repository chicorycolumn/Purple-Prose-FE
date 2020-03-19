import React from "react";
import styles from "./css/SingleArticle.module.css";
import { Router, Link, navigate } from "@reach/router";
import { voteOnArticle } from "./utils/patchUtils";
import VoteDisplayOnArticle from "./VoteDisplayOnArticle";
import { fetchArticleByID, fetchArticleWithComments } from "./utils/getUtils";
import CommentGrid from "./CommentGrid";

class SingleArticle extends React.Component {
  state = {
    createCommentDisplaying: false,

    article: null,
    comments: null,
    isLoading: true,
    refreshTicket: 0
  };

  sneakyUpwardChange = (article, comments) => {
    this.setState({
      article,
      comments,
      isLoading: false,
      refreshTicket: Math.random()
    });
  };

  componentDidMount() {
    fetchArticleWithComments(this.sneakyUpwardChange, this.props.article_id);
  }

  render() {
    const lookup = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    // const {
    //   title,
    //   author,
    //   topic,
    //   created_at,
    //   article_id,
    //   votes
    // } = this.state.article;
    // const year = new Date(created_at).getFullYear();
    // const month = new Date(created_at).getMonth();
    // const day = new Date(created_at).getDate();
    // const hour = new Date(created_at).getHours();
    // const minute = new Date(created_at).getMinutes();
    // const formattedDate = `${lookup[month]} ${day} ${hour}:${minute} (${year})`;
    return (
      <>
        {this.state.isLoading ? (
          "loading..."
        ) : (
          <>
            <div className={styles.containerGrid}>
              <div className={styles.centralContainer}>
                <p className={styles.title}>{this.state.article.title}</p>
                <p className={styles.author}>by {this.state.article.author}</p>
              </div>

              <div className={styles.bodyContainer}>
                <p className={styles.bodyText}>{this.state.article.body}</p>
              </div>

              <button
                onClick={() => {
                  this.setState(currState => {
                    return {
                      createCommentDisplaying: !currState.createCommentDisplaying
                    };
                  });
                }}
                className={styles.joinConvoButton}
              >
                Join the conversation!
              </button>

              <div className={styles.leftHandSideContainer}>
                {/* <VoteDisplayOnArticle
                  currentUser={this.props.currentUser}
                  article_id={this.state.article.article_id}
                  votes={this.state.article.votes}
                  refreshTicket={this.state.refreshTicket}
                /> */}
              </div>

              <div className={styles.rightHandSideContainer}>
                <p className={styles.topic}>{this.state.article.topic}</p>
                <p className={styles.comments}>
                  <span role="img">💬</span>
                  {` ${this.state.article.comment_count} `}
                </p>
                <p className={styles.created_at}>{`${
                  lookup[new Date(this.state.article.created_at).getMonth()]
                } ${new Date(
                  this.state.article.created_at
                ).getDate()} ${new Date(
                  this.state.article.created_at
                ).getHours()}:${new Date(
                  this.state.article.created_at
                ).getMinutes()} (${new Date(
                  this.state.article.created_at
                ).getFullYear()})`}</p>
              </div>
              {this.state.createCommentDisplaying && (
                <div className={styles.newCommentOverbox}>
                  <div className={styles.newCommentHeader}>
                    <div className={styles.boxInHeader}>
                      {this.props.currentUser && (
                        <>
                          <p className={styles.newCommentInfo}>posting as</p>

                          <p className={styles.usernameOnComment}>
                            {this.props.currentUser}
                          </p>
                        </>
                      )}
                    </div>

                    <button className={styles.newCommentSubmitButton}>
                      Say it!
                    </button>
                  </div>
                  <form>
                    <textarea
                      rows="3"
                      cols="80"
                      className={styles.newCommentInputField}
                    ></textarea>
                  </form>
                </div>
              )}
            </div>

            <div>
              {this.state.comments.map(comment => (
                <CommentGrid
                  comment={comment}
                  currentUser={this.props.currentUser}
                  article_id={this.state.article.article_id}
                />
              ))}
            </div>
          </>
        )}
      </>
    );
  }
}

export default SingleArticle;
