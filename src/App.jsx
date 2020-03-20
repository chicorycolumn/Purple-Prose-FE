import React from "react";
import { Router, Link, navigate } from "@reach/router";
import styles from "./css/App.module.css";
import Navbar from "./Navbar";
import Users from "./Users";
import Topics from "./Topics";
import Frontpage from "./Frontpage";
import SingleArticle from "./SingleArticle";
import ErrorPage from "./ErrorPage";

//ArticlePreview and Navbar are RSC so have no error block added.

class App extends React.Component {
  state = { currentUser: "", err: null };

  logInOrOut = currentUser => {
    localStorage.setItem("currentUser", currentUser);
    this.setState({ currentUser });
  };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser && currentUser !== "") {
      this.setState({ currentUser });
    }
  }

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }
    return (
      <>
        <Navbar
          logInOrOut={this.logInOrOut}
          currentUser={this.state.currentUser}
        />
        <div className={styles.App}>
          <header className="NC News"></header>
          <div>
            <Router>
              <Frontpage currentUser={this.props.currentUser} path="/" />
              <Frontpage
                currentUser={this.props.currentUser}
                path="/articles/*"
              />
              <SingleArticle
                currentUser={this.state.currentUser}
                path="/articles/:article_id"
              />
              <Users path="/users/*" />
              <Topics path="/topics/*" />
              <ErrorPage path="/error" />
              <ErrorPage errCode="500" default />
            </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App;
