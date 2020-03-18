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

export const voteOnComment = (voting_user, article_id, inc_votes) => {
  //THIS FXNTY IS ACTUALLY NOT UP IN THE BACKEND YET!
  // axios
  //   .patch(`${baseUrl}/articles/${article_id}`, {
  //     inc_votes,
  //     voting_user
  //   })
  //   .catch(e => console.log(e));
};
