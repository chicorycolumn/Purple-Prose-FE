import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api";
const token = localStorage.getItem("currentUserToken");

export const fetchUsers = () => {
  return axios
    .get(
      `${baseUrl}/users`
      // ,
      // {
      //   headers: { Authorization: `BEARER ${token}` }
      // }
    )
    .then(res => {
      return res.data;
    })
    .then(data => {
      return data["users"];
    });
};

export const queryUserVoteOnComment = (voting_user, comment_id) => {
  return axios
    .get(
      `${baseUrl}/comments/votes?voting_user=${voting_user}&comment_id=${comment_id}`
    )
    .then(res => res.data)
    .then(data => {
      return data["comment_votes_junction"];
    });
};

export const queryUserVoteOnArticle = (voting_user, article_id) => {
  return axios
    .get(
      `${baseUrl}/articles/votes?voting_user=${voting_user}&article_id=${article_id}`
    )
    .then(res => res.data)
    .then(data => {
      return data["article_votes_junction"];
    });
};

export const fetchArticleWithComments = article_id => {
  return Promise.all([
    axios.get(`${baseUrl}/articles/${article_id}`).then(res => res.data),
    axios
      .get(`${baseUrl}/articles/${article_id}/comments`)
      .then(res => res.data)
  ]).then(resArr => {
    const articleData = resArr[0];
    const commentData = resArr[1];
    console.log(777);

    return [null, articleData["article"], commentData["comments"]];
  });
};

export const fetchArticles = qObj => {
  let qString = "";

  if (qObj && Object.keys(qObj).length) {
    let qStringArray = [];
    Object.keys(qObj).forEach(qKey =>
      qStringArray.push(`${qKey}=${qObj[qKey]}`)
    );
    qString = "?" + qStringArray.join("&");
  }
  return axios
    .get(`${baseUrl}/articles/${qString}`)
    .then(res => res.data)
    .then(data => {
      return data["articles"];
    });
};

export const fetchArticleByID = article_id => {
  return axios.get(`${baseUrl}/articles/${article_id}`).then(res => res.data);
};

export const fetchArticleCountsByTopic = topicsArray => {
  console.log(topicsArray);

  const promisesArr = [];

  topicsArray.forEach(topic =>
    promisesArr.push(
      axios
        .get(`${baseUrl}/articles?topic=${topic}&limit=none`)
        .then(res => res.data)
    )
  );

  return Promise.all(promisesArr).then(resArr => {
    const articleCounts = {};

    for (let i = 0; i < topicsArray.length; i++) {
      console.log(topicsArray[i], resArr[i].articles.length);
      articleCounts[topicsArray[i]] = resArr[i].articles.length;
    }

    return articleCounts;
  });
};

export const fetchTopics = () => {
  return axios
    .get(`${baseUrl}/topics`)
    .then(res => res.data)
    .then(data => {
      return data["topics"];
    });
};
