import React from "react";
import ncnewslogo from "./images/logoncnews.png";
import styles from "./css/Navbar.module.css";
import { Router, Link, navigate } from "@reach/router";
import Login from "./Login";

const Navbar = props => {
  return (
    <div className={styles.navGrid}>
      <Link to={"/"}>
        <img className={styles.ncLogo} src={ncnewslogo} alt="logo" />{" "}
      </Link>
      <div className={styles.searchbarAndLoginContainer}>
        <div className={styles.searchbarContainer}>
          <input
            className={styles.searchBar}
            type="text"
            placeholder="Browse pending.."
          />
        </div>
        <Login currentUser={props.currentUser} />
      </div>
    </div>
  );
};

export default Navbar;
