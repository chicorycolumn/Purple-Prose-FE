import React from "react";
import styles from "./css/CreateArticle.module.css";
import { Router, Link, navigate } from "@reach/router";
import {
  postNewArticle,
  postNewTopic,
  patchArticleDetails
} from "./utils/patchUtils";
import { fetchTopics, fetchArticleByID } from "./utils/getUtils";

class CreateComment extends React.Component {
  state = {
    editMode: false,
    article: null,
    shallMakeBodyFlash: false,
    shallMakeTitleFlash: false,
    shallMakeTopicFlash: false,
    err: null,
    currentUser: "",
    bodyInput: "",
    titleInput: "",
    topicInput: "",
    topicDescriptionInput: "",
    topics: null,
    dropdownShowing: false,
    newTopicFieldShowing: false
  };

  componentDidMount() {
    Promise.all([
      fetchTopics(),
      this.props.article_id ? fetchArticleByID(this.props.article_id) : null
    ]).then(resArr => {
      const topics = resArr[0];
      const articleData = resArr[1];
      const currentUser = localStorage.getItem("currentUser");
      this.setState({
        currentUser,
        topics,
        editMode: this.props.editMode || false,
        article: articleData ? articleData.article : null,
        bodyInput: articleData ? articleData.article.body : "",
        titleInput: articleData ? articleData.article.title : "",
        topicInput: articleData ? articleData.article.topic : ""
      });
    });
  }

  showDropdown = this.showDropdown.bind(this);
  closeDropdown = this.closeDropdown.bind(this);

  showDropdown(e) {
    e.preventDefault();
    if (this.state.dropdownShowing) {
      this.setState({ dropdownShowing: false }, () => {
        document.removeEventListener("mouseout", this.closeDropdown);
      });
    } else
      this.setState({ dropdownShowing: true }, () => {
        document.addEventListener("click", this.closeDropdown);
      });
  }

  closeDropdown(event) {
    if (
      event &&
      event.target &&
      event.target.id &&
      event.target.id === "triggerForDropdownFilters"
    ) {
      return;
    } else {
      this.setState({ dropdownShowing: false }, () => {
        document.removeEventListener("mouseout", this.closeDropdown);
      });
    }
  }

  handleTopic = topic => {
    this.setState({ topicInput: topic.slug, dropdownShowing: false });
  };

  submitArticle = () => {
    const {
      currentUser,
      titleInput,
      bodyInput,
      topicInput,
      topicDescriptionInput
    } = this.state;

    if (
      this.state.topics.some(
        topic => topic.slug.toLowerCase() === topicInput.toLowerCase()
      )
    ) {
      this.state.editMode
        ? patchArticleDetails(
            this.state.article.article_id,
            currentUser,
            titleInput,
            bodyInput,
            topicInput
          ).then(newlyUpdatedArticle => {
            navigate(`/articles/${newlyUpdatedArticle.article_id}`);
          })
        : postNewArticle(currentUser, titleInput, bodyInput, topicInput).then(
            newlyPostedArticle => {
              navigate(`/articles/${newlyPostedArticle.article_id}`);
            }
          );
    } else {
      postNewTopic(
        topicInput.toLowerCase(),
        topicDescriptionInput || "A new topic..."
      ).then(() => {
        this.state.editMode
          ? patchArticleDetails(
              this.state.article.article_id,
              currentUser,
              titleInput,
              bodyInput,
              topicInput
            ).then(newlyUpdatedArticle => {
              navigate(`/articles/${newlyUpdatedArticle.article_id}`);
            })
          : postNewArticle(currentUser, titleInput, bodyInput, topicInput).then(
              newlyPostedArticle => {
                navigate(`/articles/${newlyPostedArticle.article_id}`);
              }
            );
      });
    }
  };

  render() {
    // [
    //   "shallMakeBodyFlash",
    //   "shallMakeTitleFlash",
    //   "shallMakeTopicFlash"
    // ].forEach(item => {
    //   if (`this.state.${item}`) {
    //     setTimeout(() => {
    //       let stateObj = {};
    //       stateObj[item] = false;
    //       this.setState(stateObj);
    //     }, 2000);
    //   }
    // });

    if (this.state.shallMakeBodyFlash) {
      setTimeout(() => {
        this.setState({ shallMakeBodyFlash: false });
      }, 2000);
    }
    if (this.state.shallMakeTitleFlash) {
      setTimeout(() => {
        this.setState({ shallMakeTitleFlash: false });
      }, 2000);
    }
    if (this.state.shallMakeTopicFlash) {
      setTimeout(() => {
        this.setState({ shallMakeTopicFlash: false });
      }, 2000);
    }

    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }

    return (
      <form>
        <div className={styles.overbox}>
          <div className={styles.topbox}>
            <textarea
              className={`${styles.titleField} ${this.state
                .shallMakeTitleFlash && styles.flashingField}`}
              placeholder="Title"
              required
              rows="2"
              cols="80"
              maxLength="70"
              onChange={e => {
                this.setState({ titleInput: e.target.value });
              }}
              value={this.state.titleInput}
            ></textarea>

            <div className={styles.separator}></div>

            {this.state.newTopicFieldShowing ? (
              <div className={styles.newTopicFieldOverarch}>
                <input
                  maxLength="12"
                  placeholder="New topic"
                  className={`${styles.newTopicField} ${this.state
                    .shallMakeTopicFlash && styles.flashingField}`}
                  onChange={e => {
                    this.setState({ topicInput: e.target.value.toLowerCase() });
                  }}
                  value={this.state.topicInput}
                ></input>
                <button
                  onClick={() => {
                    this.setState({
                      newTopicFieldShowing: false,
                      topicInput: ""
                    });
                  }}
                  className={styles.exitX}
                >
                  <span role="img" aria-label="red cross">
                    ❌
                  </span>
                </button>
              </div>
            ) : (
              <div className={styles.dropdownHolder}>
                <button
                  id="triggerForDropdownFilters"
                  className={`${styles.trigger} ${this.state
                    .shallMakeTopicFlash && styles.flashingField}`}
                  onClick={e => {
                    e.preventDefault();
                    this.showDropdown(e);
                  }}
                >
                  {this.state.topicInput === ""
                    ? "Select topic"
                    : this.state.topicInput}
                </button>

                {this.state.dropdownShowing ? (
                  <div className={styles.dropdown}>
                    {this.state.topics.map((topic, index) =>
                      index === 0 ? (
                        <>
                          <button
                            className={`${styles.buttonNew} ${styles.dropButtons}`}
                            onClick={e => {
                              e.preventDefault();
                              this.setState({ newTopicFieldShowing: true });
                            }}
                          >
                            Create new topic
                          </button>
                          <button
                            className={`${styles.button1} ${styles.dropButtons}`}
                            onClick={e => {
                              e.preventDefault();
                              this.handleTopic(topic);
                            }}
                          >
                            {topic.slug}
                          </button>
                        </>
                      ) : (
                        <button
                          className={`${styles.button1} ${styles.dropButtons}`}
                          onClick={e => {
                            e.preventDefault();
                            this.handleTopic(topic);
                          }}
                        >
                          {topic.slug}
                        </button>
                      )
                    )}
                    )
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          <textarea
            required
            rows="3"
            cols="80"
            placeholder="Your thoughts!"
            className={`${styles.bodyInputField} ${this.state
              .shallMakeBodyFlash && styles.flashingField}`}
            onChange={e => {
              this.setState({ bodyInput: e.target.value });
            }}
            value={this.state.bodyInput}
          ></textarea>
        </div>
        <button
          className={styles.articleSubmitButton}
          onClick={e => {
            e.preventDefault();

            if (
              this.state.titleInput === "" ||
              this.state.topicInput === "" ||
              this.state.bodyInput === ""
            ) {
              this.setState({
                shallMakeTitleFlash:
                  this.state.titleInput === "" ? true : false,
                shallMakeBodyFlash: this.state.bodyInput === "" ? true : false,
                shallMakeTopicFlash: this.state.topicInput === "" ? true : false
              });
            } else {
              this.submitArticle();

              this.setState({ isLoading: true });
            }
          }}
        >
          {this.state.isLoading
            ? "submitting..."
            : this.state.editMode
            ? "Edit it!"
            : "Say it!"}
        </button>
      </form>
    );
  }
}

export default CreateComment;
