import React from "react";
import styles from "./css/Login.module.css";
import { Router, Link, navigate } from "@reach/router";
import loginImage from "./images/rush.png";
import { postNewUser, patchAsLogin } from "./utils/patchUtils";

class Login extends React.Component {
  state = {
    loginBoxShowing: false,
    currentUser: "",
    currentUserToken: "",
    usernameInput: "",
    passwordInput: "",
    toggle: false
  };

  componentDidMount() {
    const currentUserToken = localStorage.getItem("currentUserToken");
    const currentUser = localStorage.getItem("currentUser");

    this.setState({
      currentUser,
      currentUserToken
    });
  }

  showLoginBox = () => {
    this.setState(currState => {
      return { loginBoxShowing: !currState.loginBoxShowing };
    });
  };

  sendLoginDetails = event => {
    event.preventDefault();
    patchAsLogin(this.state.usernameInput, this.state.passwordInput).then(
      msg => {
        console.log(msg);

        const currentUserToken = localStorage.getItem("currentUserToken");
        const currentUser = localStorage.getItem("currentUser");

        this.setState({
          usernameInput: "",
          passwordInput: "",
          currentUser,
          currentUserToken
        });
      }
    );
  };

  // componentDidUpdate(prevProps, prevState) {
  // if (prevState.usernameInput && this.state.usernameInput === ""
  // }

  logOut = event => {
    // event.preventDefault();
    console.log(888);
    localStorage.setItem("currentUserToken", "");
    localStorage.setItem("currentUser", "");
  };

  render() {
    return (
      <>
        {this.state.loginBoxShowing ? (
          <div className={styles.fullPageBox}>
            <div className={styles.loginBox}>
              <img
                className={styles.welcomeBackImage}
                src={loginImage}
                alt="A triangle that says welcome back."
              />
              <form>
                <input
                  className={styles.enterUsername}
                  type="text"
                  placeholder="Who goes there?"
                  onChange={e => {
                    this.setState({ usernameInput: e.target.value });
                  }}
                  value={this.state.usernameInput}
                />

                <input
                  className={styles.enterPassword}
                  type="text"
                  placeholder="What be the password?"
                  onChange={e => {
                    this.setState({ passwordInput: e.target.value });
                  }}
                  value={this.state.passwordInput}
                />
                <br />
                <button
                  onClick={this.sendLoginDetails}
                  className={styles.loginButtonFromForm}
                  type="submit"
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={styles.loginHolder}>
          {this.state.currentUser !== null &&
          this.state.currentUser !== undefined &&
          this.state.currentUser !== "" ? (
            <>
              <p className={styles.loggedInUser}>{this.state.currentUser}</p>
              <form>
                <button
                  type="submit"
                  onClick={this.logOut}
                  className={styles.buttonRight}
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <button
                className={`${styles.buttonRight} ${styles.buttonRightWithoutRightBorder}`}
                onClick={this.showLoginBox}
              >
                Log In
              </button>
              <button className={styles.buttonRight}>Sign up</button>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Login;
