import React from "react";
import styles from "./css/CreateArticle.module.css";
import { Router, Link, navigate } from "@reach/router";
import { postNewArticle } from "./utils/patchUtils";

class CreateComment extends React.Component {
  state = {
    shallMakeInputBoxFlash: false,
    err: null,
    currentUser: "",
    bodyInput: "",
    titleInput: "",
    topicInput: ""
  };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");
    this.setState({
      currentUser
    });
  }

  submitArticle(e) {}

  render() {
    if (this.state.shallMakeInputBoxFlash) {
      setTimeout(() => {
        this.setState({ shallMakeInputBoxFlash: false });
      }, 3000);
    }

    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }
    return (
      <div className={styles.newCommentOverbox}>
        <div className={styles.newCommentHeader}>
          <div className={styles.boxInHeader}>
            {this.state.currentUser && (
              <>
                <p className={styles.newCommentInfo}>posting as</p>

                <p className={styles.usernameOnComment}>
                  {this.state.currentUser}
                </p>
              </>
            )}
          </div>

          <button
            className={styles.newCommentSubmitButton}
            onClick={e => {
              if (this.props.newCommentInput === "") {
                this.setState({ shallMakeInputBoxFlash: true });
              } else {
                this.submitArticle(e);
                this.setState({ isLoading: true });
              }
            }}
          >
            {this.state.isLoading ? "submitting..." : "Say it!"}
          </button>
        </div>
        <form>
          <textarea
            required
            rows="3"
            cols="80"
            className={`${styles.bodyInputField} ${this.state
              .shallMakeInputBoxFlash && styles.flashingBodyInputField}`}
            onChange={e => {
              this.setState({ bodyInput: e.target.value });
            }}
            value={this.state.bodyInput}
          ></textarea>
        </form>
      </div>
    );
  }
}

export default CreateComment;
