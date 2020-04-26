import React from "react";
import ncnewslogo from "./images/logoncnews.png";
import styles from "./css/Navbar.module.css";
import { Link, navigate } from "@reach/router";
import Login from "./Login";

class Navbar extends React.Component {
  state = {
    searchInput: "",
  };

  render() {
    return (
      <div className={styles.navGrid}>
        <Link to={"/"}>
          <img className={styles.ncLogo} src={ncnewslogo} alt="logo" />{" "}
        </Link>
        <div className={styles.searchbarAndLoginContainer}>
          <div className={styles.searchbarContainer}>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                navigate(`/articles?search=${this.state.searchInput}`);
              }}
            >
              <input
                className={styles.searchBar}
                type="text"
                placeholder="Browse pending.."
                onChange={(e) => {
                  this.setState({ searchInput: e.target.value });
                }}
                value={this.state.searchInput}
              />
            </form>
          </div>
          <Login currentUser={this.props.currentUser} />
        </div>
      </div>
    );
  }
}

export default Navbar;
