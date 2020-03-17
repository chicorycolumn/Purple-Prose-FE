import React, { Component } from 'react';

class UserLogin extends Component {
    state = {currentUser: "jessjelly"}

    sneakyUpwardChange = currentUser => {
        this.setState({ currentUser });
      };

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default UserLogin;