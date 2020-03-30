import React from "react";
import styles from "./css/Login.module.css";
import { Router, Link, navigate } from "@reach/router";
import loginImage from "./images/rush.png";
import signupImage from "./images/naughty.jpg";
import { postNewUser, patchAsLogin } from "./utils/patchUtils";
import axios from "axios";

class Login extends React.Component {
  state = {
    loginBoxShowing: false,
    signupBoxShowing: false,
    currentUser: "",
    currentUserToken: "",
    usernameInput: "",
    passwordInput: "",
    loginError: "",
    usernameSignupInput: "",
    passwordSignupInput: "",
    signupError: ""
  };

  componentDidMount() {
    const currentUserToken = localStorage.getItem("currentUserToken");
    const currentUser = localStorage.getItem("currentUser");

    this.setState({
      currentUser,
      currentUserToken,
      loginError: ""
    });
  }

  showLoginBox = () => {
    this.setState(currState => {
      return {
        loginBoxShowing: !currState.loginBoxShowing,
        signupBoxShowing: false,
        usernameInput: "",
        passwordInput: "",
        loginError: "",
        usernameSignupInput: "",
        passwordSignupInput: "",
        signupError: ""
      };
    });
  };

  showSignupBox = () => {
    this.setState(currState => {
      return {
        signupBoxShowing: !currState.signupBoxShowing,
        loginBoxShowing: false,
        usernameInput: "",
        passwordInput: "",
        loginError: "",
        usernameSignupInput: "",
        passwordSignupInput: "",
        signupError: ""
      };
    });
  };

  sendLoginDetails = event => {
    if (event) {
      event.preventDefault();
    }

    patchAsLogin(
      this.state.usernameInput || this.state.usernameSignupInput,
      this.state.passwordInput || this.state.passwordSignupInput
    ).then(feedback => {
      if (feedback.loginError) {
        this.setState({ loginError: feedback.loginError });
      } else {
        const currentUserToken = localStorage.getItem("currentUserToken");
        const currentUser = localStorage.getItem("currentUser");
        window.location.reload(false);
        this.setState({
          loginBoxShowing: false,
          usernameInput: "",
          passwordInput: "",
          currentUser,
          currentUserToken,
          loginError: ""
        });
      }
    });
  };

  sendSignupDetails = () => {
    postNewUser(
      this.state.usernameSignupInput,
      this.state.passwordSignupInput
    ).then(feedback => {
      if (feedback.err) {
        this.setState({ signupError: feedback.err });
      } else {
        this.sendLoginDetails();
      }
    });
  };

  logOut = () => {
    localStorage.setItem("currentUserToken", "");
    localStorage.setItem("currentUser", "");
  };

  render() {
    return (
      <>
        {this.state.loginBoxShowing ? (
          <div className={styles.fullPageBox}>
            <div className={styles.loginBox}>
              <button
                onClick={() => {
                  this.setState({
                    loginBoxShowing: false,
                    usernameInput: "",
                    passwordInput: ""
                  });
                }}
                className={styles.exitX}
              >
                <span role="img" aria-label="red cross">
                  ❌
                </span>
              </button>

              <img
                className={styles.welcomeBackImage}
                src={loginImage}
                alt="A triangle that says welcome back."
              />
              <p className={styles.basicText}>
                {this.state.loginError
                  ? this.state.loginError
                  : "Welcome back!"}
              </p>
              <form>
                <input
                  className={styles.enterUsername}
                  maxLength="12"
                  type="text"
                  placeholder="Who goes there?"
                  onChange={e => {
                    this.setState({ usernameInput: e.target.value });
                  }}
                  value={this.state.usernameInput}
                />

                <input
                  className={styles.enterPassword}
                  type="password"
                  maxLength="24"
                  placeholder="What be ye password?"
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

        {this.state.signupBoxShowing ? (
          <div className={styles.fullPageBox}>
            <div className={styles.signupBox}>
              <button
                onClick={() => {
                  this.setState({
                    signupBoxShowing: false,
                    usernameSignupInput: "",
                    passwordSignupInput: ""
                  });
                }}
                className={styles.exitX2}
              >
                <span role="img" aria-label="red cross">
                  ❌
                </span>
              </button>

              <img
                className={styles.welcomeBackImage}
                src={signupImage}
                alt="A triangle that says join us."
              />
              <div className={styles.errorTextHolder}>
                <p className={styles.welcomeOrErrorText}>
                  {this.state.signupError ? this.state.signupError : "Join us!"}
                </p>
              </div>
              <form>
                <input
                  className={styles.enterUsername}
                  maxLength="12"
                  type="text"
                  placeholder="Username"
                  onChange={e => {
                    this.setState({ usernameSignupInput: e.target.value });
                  }}
                  value={this.state.usernameSignupInput}
                />

                <input
                  className={styles.enterPassword}
                  type="password"
                  placeholder="Password"
                  maxLength="24"
                  onChange={e => {
                    this.setState({ passwordSignupInput: e.target.value });
                  }}
                  value={this.state.passwordSignupInput}
                />
                <br />
                <button
                  onClick={e => {
                    if (!this.state.usernameSignupInput) {
                      e.preventDefault();
                      this.setState({
                        signupError: "Please choose a username"
                      });
                    } else if (this.state.usernameSignupInput.length > 12) {
                      e.preventDefault();
                      this.setState({
                        signupError:
                          "Username should be less than 12 characters"
                      });
                    } else if (!this.state.passwordSignupInput) {
                      e.preventDefault();
                      this.setState({
                        signupError: `Please choose a password, ${this.state.usernameSignupInput}`
                      });
                    } else if (this.state.passwordSignupInput.length < 4) {
                      e.preventDefault();
                      this.setState({
                        signupError: `Password should be at least four characters, ${this.state.usernameSignupInput}`
                      });
                    } else {
                      e.preventDefault();
                      this.sendSignupDetails();
                    }
                  }}
                  className={styles.loginButtonFromForm}
                  type="submit"
                >
                  Register
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
              <div className={styles.loggedInUserContainer}>
                <p className={styles.loggedInUser}>{this.state.currentUser}</p>
              </div>
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
              <button
                onClick={this.showSignupBox}
                className={styles.buttonRight}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Login;
