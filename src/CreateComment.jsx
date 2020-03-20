import React from "react";
import styles from "./css/SingleArticle.module.css";
import { Router, Link, navigate } from "@reach/router";
import { voteOnArticle, postNewComment } from "./utils/patchUtils";
import VoteDisplayOnArticle from "./VoteDisplayOnArticle";
import { fetchArticleByID, fetchArticleWithComments } from "./utils/getUtils";
import CommentGrid from "./CommentGrid";

class CreateComment extends React.Component {
  state = { isLoading: false, shallMakeInputBoxFlash: false, err: null };

  componentDidUpdate(prevProps) {
    if (prevProps.refreshTicket !== this.props.refreshTicket) {
      this.setState({ isLoading: false });
    }

    if (this.state.shallMakeInputBoxFlash) {
      setTimeout(() => {
        this.setState({ shallMakeInputBoxFlash: false });
      }, 3000);
    }
  }

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }
    return (
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

          <button
            className={styles.newCommentSubmitButton}
            onClick={e => {
              if (this.props.newCommentInput === "") {
                this.setState({ shallMakeInputBoxFlash: true });
              } else {
                this.props.submitNewComment(e);
                this.setState({ isLoading: true });
              }
            }}
          >
            {this.state.isLoading ? "submitting..." : "Say it!"}
          </button>
        </div>
        <form>
          <textarea
            required
            rows="3"
            cols="80"
            className={`${styles.newCommentInputField} ${this.state
              .shallMakeInputBoxFlash && styles.flashingNewCommentInputField}`}
            onChange={e => {
              this.props.sneakyUpwardNewCommentInput(e.target.value);
            }}
            value={this.props.newCommentInput}
          ></textarea>
        </form>
      </div>
    );
  }
}

export default CreateComment;
