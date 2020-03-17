import React from "react";
import ncnewslogo from "./logoncnews.png";
import styles from "./css/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navGrid}>
      <img className={styles.ncLogo} src={ncnewslogo} alt="logo" />
      <div className={styles.searchbarContainer}>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Browse away!"
        />
      </div>
      <div className={styles.loginHolder}>
        <button>Log In</button>
        <button>Sign up</button>
      </div>
    </div>
  );
};

export default Navbar;
