import React, { Component } from "react";
import { voteOnComment } from "./utils/patchUtils";
import styles from "./css/ArticlePreview.module.css";
import { queryUserVoteOnComment } from "./utils/getUtils";
import { fetchArticleByID } from "./utils/getUtils";
import { formatVotes } from "./utils/formatVotes";

class VoteDisplayOnArticle extends Component {
  state = {
    castedVote: 0,
    error: false,
    currentUser: ""
  };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");
    return Promise.all([this.setState({ currentUser })]).then(res => {
      if (this.state.currentUser) {
        queryUserVoteOnComment(
          this.state.currentUser,
          this.props.comment_id
        ).then(comment_votes_junction => {
          if (comment_votes_junction.length === 0) {
            this.setState({
              castedVote: 0
            });
          } else
            this.setState({
              castedVote: comment_votes_junction[0]["inc_votes"]
            });
        });
      }
    });
  }

  handleVote = voteDirection => {
    if (
      !(
        this.state.currentUser !== null &&
        this.state.currentUser !== undefined &&
        this.state.currentUser !== ""
      )
    ) {
      alert("To vote on the latest news, log in or sign up!");
    } else {
      const { comment_id } = this.props;
      const { currentUser } = this.state;

      //If nullifying or de novo:
      if (voteDirection !== this.state.castedVote) {
        //Send off to database.

        console.log("voteOnComment(currentUser, comment_id, voteDirection);");
        voteOnComment(currentUser, comment_id, voteDirection);

        this.props.upwardVoteOnComment(voteDirection);

        //Set a local change so user sees immediate (optim ren).
        this.setState(currState => {
          return {
            castedVote: currState.castedVote + voteDirection,
            error: false
          };
        });
      }
    }
  };

  render() {
    return (
      <p className={styles.votes}>
        <button
          className={styles.voteEmoji}
          onClick={() => {
            if (this.state.castedVote !== 1) {
              this.handleVote(1);
            }
          }}
        >
          {this.state.castedVote.toString() === "1" ? "▲" : "▵"}
        </button>
        <p className={styles.voteCount}>{formatVotes(this.props.votes)}</p>
        <button
          className={styles.voteEmoji}
          onClick={() => {
            if (this.state.castedVote !== -1) {
              this.handleVote(-1);
            }
          }}
        >
          {this.state.castedVote.toString() === "-1" ? "▼" : "▿"}
        </button>
      </p>
    );
  }
}

export default VoteDisplayOnArticle;
