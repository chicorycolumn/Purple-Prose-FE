import React from "react";
import ncnewslogo from "./images/logoncnews.png";
import styles from "./css/Navbar.module.css";
import { Router, Link, navigate } from "@reach/router";

const Navbar = props => {
  const logYourselfIn = () => {
    props.logInOrOut("jessjelly");
  };

  const logYourselfOut = () => {
    props.logInOrOut("");
  };

  return (
    <div className={styles.navGrid}>
      {/* <div className={styles.leftContainer}> */}
      <Link to={"/"}>
        {" "}
        <img className={styles.ncLogo} src={ncnewslogo} alt="logo" />{" "}
      </Link>
      {/* </div> */}
      <div className={styles.searchbarAndLoginContainer}>
        <div className={styles.searchbarContainer}>
          <input
            className={styles.searchBar}
            type="text"
            placeholder="Browse.."
          />
        </div>
        <div className={styles.loginHolder}>
          {props.currentUser !== null &&
          props.currentUser !== undefined &&
          props.currentUser !== "" ? (
            <>
              <p className={styles.loggedInUser}>{props.currentUser}</p>
              <button onClick={logYourselfOut} className={styles.buttonRight}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button className={styles.buttonRight} onClick={logYourselfIn}>
                Log In
              </button>
              <button className={styles.buttonRight}>Sign up</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
