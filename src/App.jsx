import React from "react";
import { Router, Link, navigate } from "@reach/router";
import styles from "./css/App.module.css";
import Navbar from "./Navbar";
import Users from "./Users";
import Topics from "./Topics";
import Frontpage from "./Frontpage";
import SingleArticle from "./SingleArticle";
import ErrorPage from "./ErrorPage";
import CreateArticle from "./CreateArticle";

//ArticlePreview and Navbar are RSC so have no error block added.

class App extends React.Component {
  state = { currentUser: "", err: null };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");
    this.setState({
      currentUser
    });
  }

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }
    return (
      <>
        <Navbar currentUser={this.state.currentUser} />
        <body className={styles.App}>
          <header className="NC News"></header>
          <Router>
            <Frontpage currentUser={this.state.currentUser} path="/" />
            <Frontpage
              currentUser={this.state.currentUser}
              path="/articles/*"
            />
            <SingleArticle
              currentUser={this.state.currentUser}
              path="/articles/:article_id"
            />
            <CreateArticle
              currentUser={this.state.currentUser}
              editMode={true}
              path="/articles/:article_id/edit"
            />
            <Users path="/users/*" />
            <CreateArticle path="/write/" />
            <Topics path="/topics/*" />
            <ErrorPage path="/error" />
            <ErrorPage errCode="404" default />
          </Router>
        </body>
      </>
    );
  }
}

export default App;
