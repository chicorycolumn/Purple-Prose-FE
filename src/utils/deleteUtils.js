import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api";
// const token = localStorage.getItem("currentUserToken");

export const deleteCommentByID = async comment_id => {
  axios
    .delete(
      `${baseUrl}/comments/${comment_id}`
      // , {
      //   headers: { Authorization: `BEARER ${token}` }
      // }
    )
    .then(err => {
      console.log(err);
    });
};
