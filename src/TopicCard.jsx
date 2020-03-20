import React from "react";
import styles from "./css/TopicCard.module.css";
import { Router, Link, navigate } from "@reach/router";
import { fetchArticleCountsByTopic } from "./utils/getUtils";

class TopicCard extends React.Component {
  state = {
    articleCounts: null,
    isLoading: true
  };

  sneakyUpwardChange = articleCounts => {
    this.setState({ articleCounts, isLoading: false });
  };

  componentDidMount() {
    fetchArticleCountsByTopic(
      this.sneakyUpwardChange,
      this.props.topics.map(topic => topic.slug)
    );
  }

  render() {
    return (
      <div className={styles.topicContainer}>
        {this.props.topics.map(topic => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              to={`/articles?topic=${topic.slug}`}
            >
              <div className={styles.topicCard}>
                <h1 className={styles.slug}>{topic.slug}</h1>
                <div className={styles.descriptionContainer}>
                  <p className={styles.description}>{topic.description}</p>
                </div>
                <p className={styles.articleCount}>
                  {this.state.isLoading
                    ? "..."
                    : this.state.articleCounts[topic.slug]}
                  {" articles"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default TopicCard;
