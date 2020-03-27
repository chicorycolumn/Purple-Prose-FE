import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api";
// const token = localStorage.getItem("currentUserToken");
// export const voteOnArticle = (voting_user, article_id, inc_votes) => {
//   console.log("in util..");

//   axios.patch(`${baseUrl}/articles/${article_id}`, {
//     inc_votes,
//     voting_user
//   });
// };

export const patchAsLogin = async (username, password) => {
  const res = await axios.patch(`${baseUrl}/login`, {
    username,
    password
  });
  if (res.data.loginError) {
    return { loginError: res.data.loginError };
  } else
    return Promise.all([
      localStorage.setItem("currentUserToken", res.data.token),
      localStorage.setItem("currentUser", res.data.username)
    ]).then(() => {
      return { loginError: null };
    });
};

export const postNewUser = async (username, password) => {
  return axios
    .post(`${baseUrl}/users`, {
      username,
      password
    })
    .then(res => {
      return res.data;
    });
};

export const postNewComment = async (username, article_id, body) => {
  const res = await axios.post(`${baseUrl}/articles/${article_id}/comments`, {
    username,
    body
  });
  return res.data.comment;
};

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
