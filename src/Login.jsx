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
        loginError: ""
      };
    });
  };

  showSignupBox = () => {
    this.setState(currState => {
      return {
        signupBoxShowing: !currState.signupBoxShowing,
        loginBoxShowing: false
      };
    });
  };

  sendLoginDetails = event => {
    event.preventDefault();
    patchAsLogin(this.state.usernameInput, this.state.passwordInput).then(
      feedback => {
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
      }
    );
  };

  sendSignupDetails = event => {
    event.preventDefault();
    // axios
    //   .post("https://nc-news-c-matus.herokuapp.com/api/users", {
    //     username: "flo",
    //     password: "flo"
    //   })
    //   .then(x => console.log(x));

    console.log(
      `gonna sign up with ${this.state.usernameSignupInput} and ${this.state.passwordSignupInput}`
    );

    postNewUser(
      this.state.usernameSignupInput,
      this.state.passwordSignupInput
    ).then(feedback => {
      console.log("getting some feedback...");
      if (feedback.err) {
        console.log(`feedback.err is ${feedback.err}`);
        this.setState({ signupError: feedback.err });
      } else {
        console.log(`feedback.user IS ${feedback.user}`);
      }
    });
  };

  logOut = event => {
    localStorage.setItem("currentUserToken", "");
    localStorage.setItem("currentUser", "");
  };

  render() {
    return (
      <>
        {this.state.loginBoxShowing ? (
          <div className={styles.fullPageBox}>
            <div className={styles.loginBox}>
              <span
                onClick={() => {
                  this.setState({
                    loginBoxShowing: false,
                    usernameInput: "",
                    passwordInput: ""
                  });
                }}
                role="img"
                className={styles.exitX}
              >
                ❌
              </span>

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
              <span
                onClick={() => {
                  this.setState({
                    signupBoxShowing: false,
                    usernameSignupInput: "",
                    passwordSignupInput: ""
                  });
                }}
                role="img"
                className={styles.exitX}
              >
                ❌
              </span>

              <img
                className={styles.welcomeBackImage}
                src={signupImage}
                alt="A triangle that says join us."
              />
              <p className={styles.welcomeOrErrorText}>Join us!</p>
              <form>
                <input
                  className={styles.enterUsername}
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
                  onChange={e => {
                    this.setState({ passwordSignupInput: e.target.value });
                  }}
                  value={this.state.passwordSignupInput}
                />
                <br />
                <button
                  onClick={this.sendSignupDetails}
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
