import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api";

export const voteOnArticle = (voting_user, article_id, inc_votes) => {
  axios
    .patch(`${baseUrl}/articles/${article_id}`, {
      inc_votes,
      voting_user
    })
    .catch(e => console.log(e));
};
