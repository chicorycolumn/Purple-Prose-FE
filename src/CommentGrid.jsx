import React from "react";
import styles from "./css/CommentGrid.module.css";
import { Router, Link, navigate } from "@reach/router";
import { voteOnComment } from "./utils/patchUtils";
import { deleteCommentByID } from "./utils/deleteUtils";
import VoteDisplayOnComment from "./VoteDisplayOnComment";
import DateFormat from "./DateFormat";

class CommentGrid extends React.Component {
  state = { err: null, currentUser: "" };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");

    this.setState({
      currentUser
    });
  }

  deleteComment = () => {
    deleteCommentByID(this.props.comment.comment_id);
    this.props.sneakyUpwardDelete(this.props.comment.comment_id);
  };

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }

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
      <div className={styles.containerGrid}>
        <div className={styles.middleTop}>
          <div className={styles.usernameAndDeleteBox}>
            <p className={styles.author}>{this.props.comment.author}</p>

            {this.props.comment.author === this.state.currentUser && (
              <button
                className={styles.deleteCommentButton}
                onClick={this.deleteComment}
              >
                Delete
              </button>
            )}
          </div>

          <p className={styles.commentTime}>
            <DateFormat created_at={this.props.comment.created_at} />
          </p>
          {/* <p className={styles.commentTime}>{`${
            lookup[new Date(this.props.comment.created_at).getMonth()]
          } ${new Date(this.props.comment.created_at).getDate()} ${new Date(
            this.props.comment.created_at
          ).getHours()}:${new Date(
            this.props.comment.created_at
          ).getMinutes()} (${new Date(
            this.props.comment.created_at
          ).getFullYear()})`}</p> */}
        </div>

        <div className={styles.middleBottom}>
          <p className={styles.bodyText}>{this.props.comment.body}</p>
        </div>

        <div className={styles.leftHandSideContainer}>
          <VoteDisplayOnComment
            article_id={this.props.article_id}
            votes={this.props.comment.votes}
          />
        </div>
      </div>
    );
  }
}

export default CommentGrid;
