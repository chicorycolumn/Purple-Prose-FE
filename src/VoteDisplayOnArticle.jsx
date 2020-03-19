import React, { Component } from "react";
import { voteOnArticle } from "./utils/patchUtils";
import styles from "./css/ArticlePreview.module.css";
import { queryUserVoteOnArticle } from "./utils/getUtils";

//The intention of all this is to check the actual number of votes an article has to display the user having voted new votecount.
//It basically works, just that you don't see the visual feedback if you already have a downvote on sth, then refresh page (which sets voteBuffer to 0 instead of -1)
//and so then yes the request is sent off fine, but you dont see the feedback. Should be resolvable by using jxn table that already exists to populate whether
//up arrow should be red or blue kinda thing.

class VoteDisplayOnArticle extends Component {
  state = {
    voteBuffer: 0,
    voteNullifier: 0,
    error: false,
    hasParentRefreshed: true
  };

  sneakyUpwardChange = article_votes_junction => {
    console.log(`in SUC and VB: ${this.state.voteBuffer}`);
    this.setState({ voteBuffer: article_votes_junction[0]["inc_votes"] });
  };

  componentDidMount() {
    console.log(`in CDMt and VB: ${this.state.voteBuffer}`);
    queryUserVoteOnArticle(
      this.sneakyUpwardChange,
      this.props.currentUser,
      this.props.article_id
    );
  }

  componentDidUpdate(prevProps) {
    console.log(`in CDUp and VB: ${this.state.voteBuffer}`);
    if (prevProps.refreshTicket !== this.props.refreshTicket) {
      this.setState({ hasParentRefreshed: true });
    }
  }

  handleVote = voteDirection => {
    console.log(`in handleVote and VB: ${this.state.voteBuffer}`);
    // if (
    //   this.props.currentUser !== null &&
    //   this.props.currentUser !== undefined &&
    //   this.props.currentUser !== ""
    // ) {
    const { article_id, currentUser } = this.props;

    //Undoing the invalid double-vote the user just gave.
    voteOnArticle(currentUser, article_id, voteDirection).catch(err => {
      console.log(`in catch and VB: ${this.state.voteBuffer}`);
      this.setState(currState => {
        return {
          error: true,
          voteBuffer: currState.voteBuffer + (voteDirection === -1 ? 1 : -1),
          hasParentRefreshed: false
        };
      });
    });

    //If nullifying a previous vote:
    if (
      (voteDirection === -1 && this.state.voteBuffer === 1) ||
      (voteDirection === 1 && this.state.voteBuffer === -1)
    ) {
      console.log(`in NULL PREV and VB: ${this.state.voteBuffer}`);
      this.setState(currState => {
        return {
          voteBuffer: 0,
          // voteBuffer: currState.voteBuffer + voteDirection,
          hasParentRefreshed: false,
          voteNullifier: voteDirection
        };
      });
    }
    //If voting de novo:
    else
      this.setState(currState => {
        console.log(`in DE NOVO and VB: ${this.state.voteBuffer}`);
        return {
          voteBuffer: currState.voteBuffer + (voteDirection === 1 ? 1 : -1),
          error: false,
          hasParentRefreshed: false,
          voteNullifier: 0
        };
      });
    // let newCastedVote = this.state.voteBuffer;

    // if (newCastedVote < 1 && voteDirection === 1) {
    //   newCastedVote++;
    // } else if (newCastedVote > -1 && voteDirection === -1) {
    //   newCastedVote--;
    // }
    // this.setState({ voteBuffer: newCastedVote });
    // } else {
    //   alert("To vote on the latest news, log in or sign up!");
    // }
  };

  render() {
    return (
      <p className={styles.votes}>
        {console.log(
          `RENDER. tx: ${this.state.hasParentRefreshed}, VB: ${this.state.voteBuffer}. PV: ${this.props.votes}, VN: ${this.state.voteNullifier}`
        )}
        <span
          className={styles.voteEmoji}
          onClick={() => {
            this.handleVote(1);
          }}
          role="img"
        >
          {this.state.voteBuffer === 1 ? "▲" : "▵"}
        </span>
        <p className={styles.voteCount}>
          {/* {this.state.voteBuffer + (this.props.votes || 0)} */}
          {(this.props.votes || 0) +
            (this.state.hasParentRefreshed
              ? 0
              : this.state.voteBuffer + this.state.voteNullifier)}
        </p>
        <span
          className={styles.voteEmoji}
          onClick={() => {
            this.handleVote(-1);
          }}
          role="img"
        >
          {this.state.voteBuffer.toString() === "-1" ? "▼" : "▿"}
        </span>
      </p>
    );
  }
}

export default VoteDisplayOnArticle;
