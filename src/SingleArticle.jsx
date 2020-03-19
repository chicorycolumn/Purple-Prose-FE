import React from "react";
import styles from "./css/SingleArticle.module.css";
import { Router, Link, navigate } from "@reach/router";
import { voteOnArticle, postNewComment } from "./utils/patchUtils";
import VoteDisplayOnArticle from "./VoteDisplayOnArticle";
import { fetchArticleByID, fetchArticleWithComments } from "./utils/getUtils";
import CommentGrid from "./CommentGrid";
import CreateComment from "./CreateComment";

class SingleArticle extends React.Component {
  state = {
    createCommentDisplaying: false,
    newCommentInput: "",
    article: null,
    comments: null,
    isLoading: true,
    refreshTicket: 0,
    upToDateWithCommentCount: true,
    temporaryCommentIncrement: 0,
    userSubmitsEmpty: false
  };

  sneakyUpwardChange = (article, comments) => {
    this.setState({
      article,
      comments,
      isLoading: false,
      refreshTicket: Math.random(),
      temporaryCommentIncrement: 0,
      upToDateWithCommentCount: true
    });
  };

  upwardEmptyCheckReset = () => {
    this.setState({ userSubmitsEmpty: false });
  };

  sneakyUpwardNewCommentInput = newCommentInput => {
    this.setState({ newCommentInput });
  };

  sneakyUpwardAmbicrement = crement => {
    this.setState(currState => {
      return {
        temporaryCommentIncrement: currState.temporaryCommentIncrement + crement
      };
    });
  };

  sneakyUpwardDelete = comment_id => {
    this.setState(currState => {
      let newCommentArray = currState.comments.filter(
        comment => comment.comment_id !== comment_id
      );

      return { comments: newCommentArray };
    });
  };

  componentDidMount() {
    fetchArticleWithComments(this.sneakyUpwardChange, this.props.article_id);
  }

  submitNewComment = event => {
    event.preventDefault();

    if (this.state.newCommentInput === "") {
      this.setState({ userSubmitsEmpty: true });
    } else
      postNewComment(
        this.props.currentUser,
        this.state.article.article_id,
        this.state.newCommentInput
      ).then(newlyComment => {
        this.setState(currState => {
          return {
            newCommentInput: "",
            createCommentDisplaying: false,
            comments: [newlyComment, ...currState.comments],
            upToDateWithCommentCount: false,
            temporaryCommentIncrement: currState.temporaryCommentIncrement + 1
          };
        });
      });
  };

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
                  this.props.currentUser !== null &&
                  this.props.currentUser !== undefined &&
                  this.props.currentUser !== ""
                    ? this.setState(currState => {
                        return {
                          createCommentDisplaying: !currState.createCommentDisplaying
                        };
                      })
                    : alert("To vote on the latest news, log in or sign up!");
                }}
                className={styles.joinConvoButton}
              >
                {this.state.createCommentDisplaying
                  ? "Maybe later..."
                  : "Join the conversation!"}
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
                  {` ${this.state.article.comment_count +
                    this.state.temporaryCommentIncrement} `}
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
                <CreateComment
                  currentUser={this.props.currentUser}
                  newCommentInput={this.state.newCommentInput}
                  sneakyUpwardNewCommentInput={this.sneakyUpwardNewCommentInput}
                  submitNewComment={this.submitNewComment}
                  refreshTicket={this.state.refreshTicket}
                  upwardEmptyCheckReset={this.state.upwardEmptyCheckReset}
                  userSubmitsEmpty={this.state.userSubmitsEmpty}
                />
              )}
            </div>

            <div>
              {this.state.comments.map(comment => (
                <CommentGrid
                  comment={comment}
                  currentUser={this.props.currentUser}
                  article_id={this.state.article.article_id}
                  sneakyUpwardDelete={this.sneakyUpwardDelete}
                  sneakyUpwardAmbicrement={this.sneakyUpwardAmbicrement}
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
