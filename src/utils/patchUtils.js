import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api";

// export const voteOnArticle = (voting_user, article_id, inc_votes) => {
//   console.log("in util..");

//   axios.patch(`${baseUrl}/articles/${article_id}`, {
//     inc_votes,
//     voting_user
//   });
// };

export const voteOnArticle = async (voting_user, article_id, inc_votes) => {
  const res = await axios.patch(`${baseUrl}/articles/${article_id}`, {
    inc_votes,
    voting_user
  });

  return res;
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
