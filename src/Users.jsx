import React, { Component } from "react";
import { fetchUsers } from "./utils/getUtils";

class Users extends Component {
  state = {
    users: null,
    isLoading: true
  };

  sneakyUpwardChange = users => {
    this.setState({ users, isLoading: false });
  };

  componentDidMount() {
    fetchUsers(this.sneakyUpwardChange);
  }

  render() {
    return <div>{JSON.stringify(this.state.users)}</div>;
  }
}

export default Users;
