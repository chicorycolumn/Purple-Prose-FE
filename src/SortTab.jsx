import React from "react";
import styles from "./css/SortTab.module.css";
import { Router, Link, navigate } from "@reach/router";

class SortTab extends React.Component {
  constructor() {
    // CAN YOU REMOVE THIS COSTRCOTR LATER?
    super();

    this.state = {
      currentFilter: "created_at",
      currentlyFilterDisplay: "Sort by",
      sortDirection: "desc",
      dropdownShowing: false,
      isLoading: false
    };

    this.showDropdown = this.showDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  showDropdown(event) {
    event.preventDefault();

    this.setState({ dropdownShowing: true }, () => {
      document.addEventListener("click", this.closeDropdown);
    });
  }

  closeDropdown(event) {
    if (
      event &&
      event.target &&
      event.target.id &&
      event.target.id === "triggerForDropdownFilters"
    ) {
      return;
    } else {
      this.setState({ dropdownShowing: false }, () => {
        document.removeEventListener("mouseout", this.closeDropdown);
      });
    }
  }

  handleFilterClick = (filter, displayName) => {
    this.props.passUpQueries({
      sort_by: filter,
      order: this.state.sortDirection
    });
    this.setState({
      currentFilter: filter,
      currentlyFilterDisplay: displayName
    });
    this.closeDropdown();
  };

  handleDirectionClick = direction => {
    this.props.passUpQueries({
      sort_by: this.state.currentFilter,
      order: direction
    });
    this.setState({ sortDirection: direction });
  };

  render() {
    return (
      <>
        <div className={styles.fullWidthBar}>
          <div className={styles.leftContainer}>
            <div className={styles.sortbar}>
              <button
                id="triggerForDropdownFilters"
                className={styles.trigger}
                onClick={this.showDropdown}
              >
                {this.state.currentlyFilterDisplay}
              </button>
              {this.state.dropdownShowing ? (
                <div className={styles.dropdown}>
                  <button
                    className={`${styles.button1} ${styles.dropButtons}`}
                    onClick={() => {
                      this.handleFilterClick("created_at", "date");
                    }}
                  >
                    date
                  </button>

                  <button
                    className={`${styles.button2} ${styles.dropButtons}`}
                    onClick={() => {
                      this.handleFilterClick("comment_count", "comments");
                    }}
                  >
                    comments
                  </button>
                  <button
                    className={`${styles.button3} ${styles.dropButtons}`}
                    onClick={() => {
                      this.handleFilterClick("votes", "votes");
                    }}
                  >
                    votes
                  </button>
                </div>
              ) : (
                ""
              )}
              <p
                onClick={() => {
                  this.handleDirectionClick("asc");
                }}
                className={`${styles.asc} ${styles.littleButtons}`}
              >
                {this.state.sortDirection === "asc" ? "▲" : "▵"}
              </p>
              <p
                onClick={() => {
                  this.handleDirectionClick("desc");
                }}
                className={`${styles.desc} ${styles.littleButtons}`}
              >
                {this.state.sortDirection === "asc" ? "▿" : "▼"}
              </p>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <Link to={"/users"}>
              <button className={styles.rightButton}>Users</button>
            </Link>
            <Link to={"/topics"}>
              <button className={styles.rightButton}>Topics</button>
            </Link>
            <Link to={"/write"}>
              <button className={styles.rightButton}>Write!</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default SortTab;
