import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api";

export const deleteCommentByID = async comment_id => {
  axios.delete(`${baseUrl}/comments/${comment_id}`).then(err => {
    console.log(err);
  });
};
