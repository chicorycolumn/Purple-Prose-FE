import React, { Component } from "react";
import { voteOnComment } from "./utils/patchUtils";
import styles from "./css/CommentGrid.module.css";

//The intention of all this is to check the actual number of votes an article has to display the user having voted new votecount.
//It basically works, just that you don't see the visual feedback if you already have a downvote on sth, then refresh page (which sets castedVote to 0 instead of -1)
//and so then yes the request is sent off fine, but you dont see the feedback. Should be resolvable by using jxn table that already exists to populate whether
//up arrow should be red or blue kinda thing.

class VoteDisplayOnComment extends Component {
  state = { castedVote: 0, currentUser: "" };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");

    this.setState({
      currentUser
    });
  }

  handleVote = voteDirection => {
    if (
      this.state.currentUser !== null &&
      this.state.currentUser !== undefined &&
      this.state.currentUser !== ""
    ) {
      voteOnComment(
        this.state.currentUser,
        this.props.article_id,
        voteDirection
      );
      let newCastedVote = this.state.castedVote;
      // console.log("***", this.state.castedVote, newCastedVote, "***");
      if (newCastedVote < 1 && voteDirection === 1) {
        // console.log(this.state.castedVote, newCastedVote);
        // console.log("gonna plus");
        newCastedVote++;
        // console.log(this.state.castedVote, newCastedVote);
      } else if (newCastedVote > -1 && voteDirection === -1) {
        // console.log(this.state.castedVote, newCastedVote);
        // console.log("gonna minus");
        newCastedVote--;
        // console.log(this.state.castedVote, newCastedVote);
      }
      this.setState({ castedVote: newCastedVote });
    } else {
      alert("To vote on the latest news, log in or sign up!");
    }
  };
  render() {
    return (
      <p className={styles.votes}>
        <span
          onClick={() => {
            this.handleVote(1);
          }}
          role="img"
        >
          ⬆️
        </span>
        <p className={styles.voteCount}>
          {this.state.castedVote + (this.props.votes || 0)}
        </p>
        <span
          onClick={() => {
            this.handleVote(-1);
          }}
          role="img"
        >
          ⬇️
        </span>
      </p>
    );
  }
}

export default VoteDisplayOnComment;
