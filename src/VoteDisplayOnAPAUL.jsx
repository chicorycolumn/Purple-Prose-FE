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
    castedVote: 0,
    error: false,
    hasParentRefreshed: true,
    castedVoteValueAtMount: 0
  };

  sneakyUpwardChange = article_votes_junction => {
    console.log(article_votes_junction);
    console.log(`SUC: cast as ${article_votes_junction[0]["inc_votes"]}`);
    this.setState({
      castedVote: article_votes_junction[0]["inc_votes"], // This should reset once you're logged out.
      castedVoteValueAtMount: article_votes_junction[0]["inc_votes"]
    });
  };

  componentDidMount() {
    console.log("mount");
    if (this.props.currentUser) {
      queryUserVoteOnArticle(
        this.sneakyUpwardChange,
        this.props.currentUser,
        this.props.article_id
      );
    }
  }

  componentDidUpdate(prevProps) {
    console.log("update");
    if (prevProps.refreshTicket !== this.props.refreshTicket) {
      this.setState({ hasParentRefreshed: true });
    }
    // Prop drilling
    if (prevProps.currentUser !== this.props.currentUser) {
      if (this.props.currentUser) {
        queryUserVoteOnArticle(
          this.sneakyUpwardChange,
          this.props.currentUser,
          this.props.article_id
        );
      } else {
        // reset to default
      }
    }
    // 2. Context Api (Part of React)
    // 3. Global State (Redux / Mobx)
  }

  handleVote = voteDirection => {
    console.log(
      `beginning of handleVote, cast is ${this.state.castedVote} and voteDir is ${voteDirection}`
    );
    if (
      !(
        this.props.currentUser !== null &&
        this.props.currentUser !== undefined &&
        this.props.currentUser !== ""
      )
    ) {
      alert("To vote on the latest news, log in or sign up!");
    } else {
      const { article_id, currentUser } = this.props;
      //If nullifying or de novo:
      if (voteDirection !== this.state.castedVote) {
        console.log(`sending to db...`);
        //Send off to database.
        voteOnArticle(currentUser, article_id, voteDirection);

        // .then(
        //   this.setState(currState => {
        //     return {
        //       error: true,
        //       castedVote:
        //         currState.castedVote + (voteDirection === -1 ? 1 : -1),
        //       hasParentRefreshed: false
        //     };
        //   })
        // );

        //Set a local change so user sees immediate (optim ren).
        this.setState(currState => {
          console.log(
            `setting local change where new cast will be ${currState.castedVote +
              voteDirection}`
          );
          return {
            castedVote: currState.castedVote + voteDirection,
            error: false,
            hasParentRefreshed: false
          };
        });
      }

      // let newCastedVote = this.state.castedVote;

      // if (newCastedVote < 1 && voteDirection === 1) {
      //   newCastedVote++;
      // } else if (newCastedVote > -1 && voteDirection === -1) {
      //   newCastedVote--;
      // }
      // this.setState({ castedVote: newCastedVote });
      //
      // voteOnArticle(currentUser, article_id, voteDirection).then(
      //   this.setState(currState => {
      //     return {
      //       error: true,
      //       castedVote: currState.castedVote + (voteDirection === -1 ? 1 : -1),
      //       hasParentRefreshed: false
      //     };
      //   })
      // )
    }
  };

  render() {
    console.log(this.state.hasParentRefreshed);
    console.log(`CVAM ${this.state.castedVoteValueAtMount}`);
    console.log(
      `start of render, cast:${this.state.castedVote} parentVote:${this.props.votes}`
    );
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
        <p className={styles.voteCount}>{this.props.votes}</p>
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
