import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { fetchUsers } from "./utils/getUtils";

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
    return <div>{JSON.stringify(this.state.users)}</div>;
  }
}

export default Users;
