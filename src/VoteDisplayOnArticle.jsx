import React, { Component } from "react";
import { voteOnArticle } from "./utils/patchUtils";
import styles from "./css/ArticlePreview.module.css";
import { queryUserVoteOnArticle } from "./utils/getUtils";

class VoteDisplayOnArticle extends Component {
  state = {
    castedVote: 0,
    error: false,
    currentUser: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentUser === "" && this.state.currentUser) {
      this.setState({});
    }
  }

  sneakyUpwardChange = article_votes_junction => {
    if (article_votes_junction.length === 0) {
      this.setState({
        castedVote: 0
      });
    } else
      this.setState({
        castedVote: article_votes_junction[0]["inc_votes"]
      });
  };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");
    return Promise.all([this.setState({ currentUser })]).then(res => {
      if (this.state.currentUser) {
        queryUserVoteOnArticle(
          this.sneakyUpwardChange,
          this.state.currentUser,
          this.props.article_id
        );
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
      const { article_id } = this.props;
      const { currentUser } = this.state;

      //If nullifying or de novo:
      if (voteDirection !== this.state.castedVote) {
        //Send off to database.
        voteOnArticle(currentUser, article_id, voteDirection);

        this.props.voteOnArticleUpstream(voteDirection);

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
        <span
          className={styles.voteEmoji}
          onClick={() => {
            if (this.state.castedVote !== 1) {
              this.handleVote(1);
            }
          }}
          role="img"
        >
          {this.state.castedVote.toString() === "1" ? "▲" : "▵"}
        </span>
        <p className={styles.voteCount}>{this.props.votes || 0}</p>
        <span
          className={styles.voteEmoji}
          onClick={() => {
            if (this.state.castedVote !== -1) {
              this.handleVote(-1);
            }
          }}
          role="img"
        >
          {this.state.castedVote.toString() === "-1" ? "▼" : "▿"}
        </span>
      </p>
    );
  }
}

export default VoteDisplayOnArticle;
