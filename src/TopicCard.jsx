import React from "react";
import styles from "./css/TopicCard.module.css";
import { Link, navigate } from "@reach/router";
import { fetchArticleCountsByTopic } from "./utils/getUtils";
import LoadingPage from "./LoadingPage";
import { patchTopic } from "./utils/patchUtils";
import globalStyles from "./css/Global.module.css";

class TopicCard extends React.Component {
  state = {
    articleCounts: null,
    isLoading: true,
    err: null,
    currentUser: "",
    currentTopicToEdit: null,
    descriptionInput: "",
    isLoadingNew: false,
    shallMakeBoxFlash: true,
  };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");
    fetchArticleCountsByTopic(
      this.props.topics.map((topic) => topic.slug)
    ).then((articleCounts) => {
      this.setState({ articleCounts, isLoading: false, currentUser });
    });
  }

  showTopicEditor = (topic) => {
    this.setState({ currentTopicToEdit: topic.slug });
  };

  sendNewDescription = (slug, description) => {
    this.setState({ isLoadingNew: true });
    patchTopic(slug, description).then(() => {
      this.setState({ isLoadingNew: true });
      window.location.reload(false);
    });
  };

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }

    if (this.state.shallMakeBoxFlash) {
      setTimeout(() => {
        this.setState({ shallMakeBoxFlash: false });
      }, 2000);
    }
    return (
      <>
        {this.state.isLoading ? (
          <LoadingPage />
        ) : (
          <div className={styles.topicContainer}>
            {this.props.topics.map((topic) => {
              return this.state.articleCounts[topic.slug] > 0 ? (
                <Link
                  key={`Link-${topic.slug}`}
                  style={{ textDecoration: "none" }}
                  to={`/articles?topic=${topic.slug}`}
                  onClick={(e) => {
                    if (this.state.currentTopicToEdit !== null) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div key={`div-${topic.slug}`} className={styles.topicCard}>
                    <h1 key={`h1-${topic.slug}`} className={styles.slug}>
                      {topic.slug}
                    </h1>
                    <p key={`p-${topic.slug}`} className={styles.articleCount}>
                      {this.state.articleCounts[topic.slug] +
                        (this.state.articleCounts[topic.slug] === 1
                          ? " article"
                          : " articles")}
                    </p>
                    {this.state.currentTopicToEdit !== topic.slug ? (
                      <div
                        key={`div2-${topic.slug}`}
                        className={styles.descriptionContainer}
                      >
                        <p
                          key={`p2-${topic.slug}`}
                          className={styles.description}
                        >
                          {topic.description}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}

                    {this.state.currentTopicToEdit !== topic.slug ? (
                      <>
                        {this.state.currentUser !== "" ? (
                          <button
                            key={`button-${topic.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              this.showTopicEditor(topic);
                            }}
                            className={`${styles.editTopicButton} ${globalStyles.buttonColoringLight}`}
                          >
                            Edit
                          </button>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        <textarea
                          key={`textarea-${topic.slug}`}
                          className={`${styles.descriptionField} ${
                            this.state.shallMakeBoxFlash && styles.flashingField
                          }`}
                          placeholder="Description"
                          required
                          rows="2"
                          cols="20"
                          maxLength="50"
                          onChange={(e) => {
                            this.setState({
                              descriptionInput: e.target.value,
                            });
                          }}
                          value={this.state.descriptionInput}
                        ></textarea>
                        {this.state.currentUser !== "" ? (
                          <div
                            key={`div3-${topic.slug}`}
                            className={styles.sendAndExitHolder}
                          >
                            <button
                              key={`button2-${topic.slug}`}
                              onClick={(e) => {
                                e.preventDefault();

                                this.state.descriptionInput === ""
                                  ? this.setState({ shallMakeBoxFlash: true })
                                  : this.sendNewDescription(
                                      topic.slug,
                                      this.state.descriptionInput
                                    );
                              }}
                              className={`${styles.sendTopicButton} ${globalStyles.buttonColoringLight}`}
                            >
                              {this.state.isLoadingNew ? "Sending..." : "Done"}
                            </button>
                            <button
                              key={`button3-${topic.slug}`}
                              onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                  currentTopicToEdit: null,
                                  descriptionInput: "",
                                });
                              }}
                              className={styles.topicX}
                            >
                              <span role="img" aria-label="Red X">
                                ❌
                              </span>
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                </Link>
              ) : (
                ""
              );
            })}
          </div>
        )}
      </>
    );
  }
}

export default TopicCard;
