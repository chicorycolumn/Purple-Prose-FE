import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api";
// const token = localStorage.getItem("currentUserToken");

export const deleteCommentByID = comment_id => {
  return axios.delete(
    `${baseUrl}/comments/${comment_id}`
    // , {
    //   headers: { Authorization: `BEARER ${token}` }
    // }
  );
};

export const deleteArticleByID = article_id => {
  return axios.delete(
    `${baseUrl}/articles/${article_id}`
    // , {
    //   headers: { Authorization: `BEARER ${token}` }
    // }
  );
};
