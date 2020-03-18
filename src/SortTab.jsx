import React from "react";
import styles from "./css/SortTab.module.css";
import { Router, Link, navigate } from "@reach/router";

class SortTab extends React.Component {
  constructor() {
    // CAN YOU REMOVE THIS COSTRCOTR LATER?
    super();

    this.state = {
      currentlySelectedFilter: "created_at",
      sortDirection: "desc",
      dropdownShowing: false
    };

    this.showDropdown = this.showDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  showDropdown(event) {
    console.log(event.target.innerText);
    event.preventDefault();

    this.setState({ dropdownShowing: true }, () => {
      document.addEventListener("click", this.closeDropdown);
    });
  }

  closeDropdown(event) {
    if (
      event &&
      event.target &&
      event.target.innerText &&
      event.target.innerText === "Sort by"
    ) {
      return;
    } else {
      this.setState({ dropdownShowing: false }, () => {
        document.removeEventListener("mouseout", this.closeDropdown);
      });
    }
  }

  render() {
    return (
      <>
        <div className={styles.fullWidthBar}>
          <div className={styles.buttonRightContainer}>
            <div className={styles.sortbar}>
              <button className={styles.trigger} onClick={this.showDropdown}>
                Sort by
              </button>
              {this.state.dropdownShowing ? (
                <div className={styles.dropdown}>
                  <button
                    className={`${styles.button1} ${styles.buttons}`}
                    onClick={this.closeDropdown}
                  >
                    date
                  </button>
                  <button
                    className={`${styles.button2} ${styles.buttons}`}
                    onClick={this.closeDropdown}
                  >
                    comments
                  </button>
                  <button
                    className={`${styles.button3} ${styles.buttons}`}
                    onClick={this.closeDropdown}
                  >
                    votes
                  </button>
                </div>
              ) : (
                ""
              )}
              <p className={`${styles.asc} ${styles.littleButtons}`}>▲</p>
              <p className={`${styles.desc} ${styles.littleButtons}`}>▼</p>
            </div>
          </div>
          <div className={styles.buttonLeftContainer}>
            <Link to={"/users"}>
              <button className={styles.buttonLeft}>Users</button>
            </Link>
            <Link to={"/topics"}>
              <button className={styles.buttonLeft}>Topics</button>
            </Link>
            <Link to={"/write"}>
              <button className={styles.buttonLeft}>Write!</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default SortTab;
