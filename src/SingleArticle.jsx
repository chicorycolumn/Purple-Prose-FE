import React from "react";
import styles from "./css/SingleArticle.module.css";
import { Router, Link, navigate } from "@reach/router";
import { voteOnArticle } from "./utils/patchUtils";
import VoteDisplayOnArticle from "./VoteDisplayOnArticle";
import { fetchArticleByID, fetchArticleWithComments } from "./utils/getUtils";
import CommentGrid from "./CommentGrid";

let currentUser = "jessjelly"; //CHANGE THIS TO SOME VARIABLE FROM SOMEWHERE BUT WHERE?

class SingleArticle extends React.Component {
  state = { article: null, comments: null, isLoading: true };

  sneakyUpwardChange = (article, comments) => {
    this.setState({ article, comments, isLoading: false });
  };

  componentDidMount() {
    fetchArticleWithComments(this.sneakyUpwardChange, this.props.article_id);
  }

  render() {
    console.log("***");
    console.log(this.state.comments);
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

              <div className={styles.leftHandSideContainer}>
                <VoteDisplayOnArticle
                  currentUser={currentUser}
                  article_id={this.state.article.article_id}
                  votes={this.state.article.votes}
                />
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
            </div>
            <div>
              {this.state.comments.map(comment => (
                <CommentGrid
                  comment={comment}
                  currentUser={currentUser}
                  // article_id={...?}
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
