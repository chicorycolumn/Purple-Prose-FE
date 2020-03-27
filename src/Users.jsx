import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { fetchUsers } from "./utils/getUtils";
import UserCard from "./UserCard";
import styles from "./css/UserCard.module.css";

class Users extends Component {
  state = {
    users: null,
    isLoading: true,
    err: null
  };

  componentDidMount() {
    fetchUsers().then(users => {
      this.setState({ users, isLoading: false });
    });
  }

  render() {
    if (this.state.err) {
      navigate("/error", { state: { err: this.state.err } });
    }

    return (
      <div className={styles.userContainer}>
        {this.state.isLoading
          ? "loading..."
          : this.state.users.map(user => {
              return <UserCard user={user} />;
            })}
      </div>
    );
  }
}

export default Users;
