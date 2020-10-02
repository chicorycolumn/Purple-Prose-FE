import React from "react";
import styles from "./css/SingleArticle.module.css";
import { navigate } from "@reach/router";
import globalStyles from "./css/Global.module.css";

class CreateComment extends React.Component {
  state = {
    isLoading: false,
    shallMakeInputBoxFlash: false,
    err: null,
    currentUser: "",
  };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");
    this.setState({
      currentUser,
    });
  }

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
      <>
        <div className={styles.newCommentOverbox}>
          <form>
            <textarea
              required
              rows="3"
              cols="80"
              className={`${styles.newCommentInputField} ${
                this.state.shallMakeInputBoxFlash &&
                styles.flashingNewCommentInputField
              }`}
              onChange={(e) => {
                this.props.upwardNewCommentInput(e.target.value);
              }}
              value={this.props.newCommentInput}
            ></textarea>

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
                className={`${styles.newCommentSubmitButton} ${globalStyles.buttonColoringLight}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (this.props.newCommentInput === "") {
                    this.setState({ shallMakeInputBoxFlash: true });
                  } else {
                    this.props.submitNewComment(e);
                    this.setState({ isLoading: true });
                  }
                }}
              >
                {this.state.isLoading ? "submitting..." : "Say it!"}
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default CreateComment;
