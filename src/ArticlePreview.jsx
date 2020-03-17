import React from "react";
import styles from "./css/ArticlePreview.module.css";

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
  const title = props.article.title;
  const author = props.article.author;
  const topic = props.article.topic;
  //const body = props.article.body;
  const created_at = props.article.created_at;
  const year = new Date(created_at).getFullYear();
  const month = new Date(created_at).getMonth();
  const day = new Date(created_at).getDate();
  const hour = new Date(created_at).getHours();
  const minute = new Date(created_at).getMinutes();
  const formattedDate = `${lookup[month]} ${day} ${hour}:${minute} (${year})`;

  return (
    <div className={styles.containerGrid}>
      
      <div className={styles.centralContainer}>
      <p className={styles.title}>{title}</p>
      <p className={styles.author}>by {author}</p>
      {/* <p className={styles.body}>{body.slice(0, 110)}...</p> */}
      </div>
      <div className={styles.leftHandSideContainer}>
        <p className={styles.votes}>
          <span role="img">⬆️</span>
          <p className={styles.voteCount}>666</p>
          <span role="img">⬇️</span>
        </p>
      
      </div>
      
      <div className={styles.rightHandSideContainer}>
        <p className={styles.topic}>{topic}</p>
        <p className={styles.comments}>
          <span role="img">💬</span>
          100
        </p>
        <p className={styles.created_at}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default ArticlePreview;
