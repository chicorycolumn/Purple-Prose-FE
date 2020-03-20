import React, { Component } from "react";
import styles from "./css/ErrorPage.module.css";
import err400 from "./images/400-p.jpg";
import err404 from "./images/404-p.jpg";
import err500 from "./images/500-p.jpg";

class ErrorPage extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const errCode =
      this.props.errCode ||
      this.props.location.state.err.message.slice(-3) ||
      500;

    return (
      <div className={styles.errorImageHolder}>
        <img
          style={{ display: errCode === "400" ? "block" : "none" }}
          className={styles.errorImage}
          src={err400}
          alt="Error 400: Bad request."
        />

        <img
          style={{ display: errCode === "404" ? "block" : "none" }}
          className={styles.errorImage}
          src={err404}
          alt="Error 404: Page not found."
        />

        <img
          style={{ display: errCode === "500" ? "block" : "none" }}
          className={styles.errorImage}
          src={err500}
          alt="Error 500: Server error."
        />
      </div>
    );
  }
}

export default ErrorPage;
