import axios from "axios";
import { baseUrl } from "./baseUrl.js";
// const token = localStorage.getItem("currentUserToken");

export const deleteCommentByID = (comment_id) => {
  return axios.delete(
    `${baseUrl}/comments/${comment_id}`
    // , {
    //   headers: { Authorization: `BEARER ${token}` }
    // }
  );
};

export const deleteArticleByID = (article_id) => {
  return axios.delete(
    `${baseUrl}/articles/${article_id}`
    // , {
    //   headers: { Authorization: `BEARER ${token}` }
    // }
  );
};
