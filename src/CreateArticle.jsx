import React from "react";
import styles from "./css/CreateArticle.module.css";
import { Router, Link, navigate } from "@reach/router";
import { postNewArticle } from "./utils/patchUtils";
import { fetchTopics } from "./utils/getUtils";

class CreateComment extends React.Component {
  state = {
    shallMakeBodyFlash: false,
    shallMakeTitleFlash: false,
    shallMakeTopicFlash: false,
    err: null,
    currentUser: "",
    bodyInput: "",
    titleInput: "",
    topicInput: "",
    topics: null,
    dropdownShowing: false
  };

  componentDidMount() {
    fetchTopics().then(topics => {
      const currentUser = localStorage.getItem("currentUser");
      this.setState({
        currentUser,
        topics
      });
    });
  }

  showDropdown = () => {
    this.setState(currState => {
      return { dropdownShowing: !currState.dropdownShowing };
    });
  };

  handleTopic = topic => {
    this.setState({ topicInput: topic.slug, dropdownShowing: false });
  };

  submitArticle = () => {
    const { currentUser, titleInput, bodyInput, topicInput } = this.state;
    postNewArticle(currentUser, titleInput, bodyInput, topicInput).then(
      newlyPostedArticle => {
        console.log(newlyPostedArticle);
        navigate(`/articles/${newlyPostedArticle.article_id}`);
      }
    );
  };

  render() {
    if (this.state.shallMakeBodyFlash) {
      setTimeout(() => {
        this.setState({ shallMakeBodyFlash: false });
      }, 3000);
    }
    if (this.state.shallMakeTitleFlash) {
      setTimeout(() => {
        this.setState({ shallMakeTitleFlash: false });
      }, 3000);
    }
    if (this.state.shallMakeTopicFlash) {
      setTimeout(() => {
        this.setState({ shallMakeTopicFlash: false });
      }, 3000);
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
              onChange={e => {
                this.setState({ titleInput: e.target.value });
              }}
              value={this.state.titleInput}
            ></textarea>

            <div className={styles.dropdownHolder}>
              <button
                id="triggerForDropdownFilters"
                className={styles.trigger}
                onClick={e => {
                  e.preventDefault();
                  this.showDropdown();
                }}
              >
                {this.state.topicInput === ""
                  ? "Select topic"
                  : this.state.topicInput}
              </button>

              {this.state.dropdownShowing ? (
                <div className={styles.dropdown}>
                  {this.state.topics.map(topic => (
                    <button
                      className={`${styles.button1} ${styles.dropButtons}`}
                      onClick={e => {
                        e.preventDefault();
                        this.handleTopic(topic);
                      }}
                    >
                      {topic.slug}
                    </button>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
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

            if (this.state.titleInput === "") {
              this.setState({ shallMakeTitleFlash: true });
            } else if (this.state.bodyInput === "") {
              this.setState({ shallMakeBodyFlash: true });
            } else {
              this.submitArticle();
              this.setState({ isLoading: true });
            }
          }}
        >
          {this.state.isLoading ? "submitting..." : "Say it!"}
        </button>
      </form>
    );
  }
}

export default CreateComment;
