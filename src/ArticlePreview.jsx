import React from "react";
import styles from "./css/ArticlePreview.module.css";
import { Router, Link, navigate } from "@reach/router";
import { voteOnArticle } from "./utils/patchUtils";
import VoteDisplayOnArticle from "./VoteDisplayOnArticle";

let currentUser = "jessjelly"; //CHANGE THIS TO SOME VARIABLE FROM SOMEWHERE BUT WHERE?

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

const ArticlePreview = props => {
  const {
    comment_count,
    title,
    author,
    topic,
    created_at,
    article_id,
    votes
  } = props.article;
  const year = new Date(created_at).getFullYear();
  const month = new Date(created_at).getMonth();
  const day = new Date(created_at).getDate();
  const hour = new Date(created_at).getHours();
  const minute = new Date(created_at).getMinutes();
  const formattedDate = `${lookup[month]} ${day} ${hour}:${minute} (${year})`;

  return (
    <div className={styles.containerGrid}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/articles/${props.article.article_id}`}
      >
        <div className={styles.centralContainer}>
          <p className={styles.title}>{title}</p>
          <p className={styles.author}>by {author}</p>
        </div>
      </Link>

      <div className={styles.leftHandSideContainer}>
        <VoteDisplayOnArticle
          currentUser={currentUser}
          article_id={article_id}
          votes={votes}
        />
      </div>

      <div className={styles.rightHandSideContainer}>
        <p className={styles.topic}>{topic}</p>
        <p className={styles.comments}>
          <span role="img">💬</span>
          {` ${comment_count} `}
        </p>
        <p className={styles.created_at}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default ArticlePreview;
