import React from "react";
import { Router, Link, navigate } from "@reach/router";
import styles from "./css/App.module.css";
import Navbar from "./Navbar";
import Users from "./Users";
import Topics from "./Topics";
import Frontpage from "./Frontpage";

function App() {
  return (
    <>
      <Navbar />
      <div className={styles.App}>
        <header className="NC News"></header>
        <div>
          Welcome to NC News
          <Router>
            <Frontpage path="/" />
            <Users path="/users/*" />
            <Topics path="/topics/*" />
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
