import React from "react";
import { Router, Link, navigate } from "@reach/router";
import styles from "./css/App.module.css";
// import axios from "axios";
import Navbar from "./Navbar";
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
            {/* <Users path="/users/*" /><Topics path="/topics/*" /> */}
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
