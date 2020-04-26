import React from "react";
import styles from "./css/SortTab.module.css";
import { Link, navigate } from "@reach/router";

class SortTab extends React.Component {
  state = {
    currentFilter: "created_at",
    sortDirection: "desc",
    dropdownShowing: false,
    currentlyLoading: false,
    err: null,
    currentUser: "",
  };

  componentDidMount() {
    const sort_by = localStorage.getItem("sort_by") || "created_at";
    const order = localStorage.getItem("order") || "desc";
    const currentUser = localStorage.getItem("currentUser");

    this.setState({
      currentUser,
      sortDirection: order,
      currentFilter: sort_by,
    });

    setTimeout(() => {
      localStorage.removeItem("sort_by");
      localStorage.removeItem("order");
    }, 5000);
  }

  showDropdown = this.showDropdown.bind(this);
  closeDropdown = this.closeDropdown.bind(this);

  showDropdown(event) {
    event.preventDefault();

    this.setState(
      (currState) => {
        return {
          dropdownShowing: !currState.dropdownShowing,
        };
      },
      () => {
        document.addEventListener("click", this.closeDropdown);
      }
    );
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

  handleFilterClick = (filter) => {
    localStorage.setItem("sort_by", filter);
    localStorage.setItem("order", this.state.sortDirection);

    window.location.reload(false);

    this.setState({
      currentFilter: filter,
      currentlyLoading: true,
    });
    this.closeDropdown();
  };

  handleDirectionClick = (direction) => {
    localStorage.setItem("sort_by", this.state.currentFilter);
    localStorage.setItem("order", direction);

    window.location.reload(false);
    this.setState({ sortDirection: direction, currentlyLoading: true });
  };

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }
    return (
      <>
        <div className={styles.fullWidthBar}>
          <div className={styles.rightContainer}>
            <Link to={"/"}>
              <button className={styles.rightButton}>Home</button>
            </Link>
            <Link to={"/users"}>
              <button className={styles.rightButton}>Users</button>
            </Link>
            <Link to={"/topics"}>
              <button className={styles.rightButton}>Topics</button>
            </Link>
            {this.state.currentUser ? (
              <Link to={"/write"}>
                <button className={styles.rightButton}>Write!</button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  alert("To share your thoughts, log in or sign up!");
                }}
                className={styles.rightButton}
              >
                Write!
              </button>
            )}
          </div>

          {this.props.showSorter ? (
            <div className={styles.leftContainer}>
              <div className={styles.sortbar}>
                <button
                  id="triggerForDropdownFilters"
                  className={styles.trigger}
                  onClick={this.showDropdown}
                >
                  {this.state.currentlyLoading ? (
                    <p className={styles.loadingText}>loading...</p>
                  ) : this.state.currentFilter === "comment_count" ? (
                    "by comments"
                  ) : this.state.currentFilter === "votes" ? (
                    "by votes"
                  ) : (
                    "by date"
                  )}
                </button>
                {this.state.dropdownShowing ? (
                  <div className={styles.dropdown}>
                    <button
                      className={`${styles.button1} ${styles.dropButtons}`}
                      onClick={() => {
                        this.handleFilterClick("created_at");
                      }}
                    >
                      date
                    </button>

                    <button
                      className={`${styles.button2} ${styles.dropButtons}`}
                      onClick={() => {
                        this.handleFilterClick("comment_count");
                      }}
                    >
                      comments
                    </button>
                    <button
                      className={`${styles.button3} ${styles.dropButtons}`}
                      onClick={() => {
                        this.handleFilterClick("votes");
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
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default SortTab;
