import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api";
const token = localStorage.getItem("currentUserToken");

export const fetchUsers = cb => {
  axios
    .get(`${baseUrl}/users`, {
      headers: { Authorization: `BEARER ${token}` }
    })
    .then(res => {
      console.log("***");
      console.dir(res);
      console.log("***");
      return res.data;
    })
    .then(data => {
      cb(data["users"]);
    })
    .catch(err => console.log(err));
};

export const queryUserVoteOnArticle = (cb, voting_user, article_id) => {
  axios
    .get(
      `${baseUrl}/articles/votes?voting_user=${voting_user}&article_id=${article_id}`
    )
    .then(res => res.data)
    .then(data => {
      cb(data["article_votes_junction"]);
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

export const fetchArticles = (cb, qObj) => {
  let qString = "";

  if (qObj && Object.keys(qObj).length) {
    let qStringArray = [];
    Object.keys(qObj).forEach(qKey =>
      qStringArray.push(`${qKey}=${qObj[qKey]}`)
    );
    qString = "?" + qStringArray.join("&");
  }
  axios
    .get(`${baseUrl}/articles/${qString}`)
    .then(res => res.data)
    .then(data => {
      cb(data["articles"]);
    });
};

// I AM AIMING TO MAKE THIS ONE SOLELY PROMISE AND NOT CALLBACK BASED.
export const fetchArticleByID = article_id => {
  return axios.get(`${baseUrl}/articles/${article_id}`).then(res => res.data);
};

export const fetchArticleCountsByTopic = (cb, topicsArray) => {
  console.log(topicsArray);

  const promisesArr = [];

  topicsArray.forEach(topic =>
    promisesArr.push(
      axios
        .get(`${baseUrl}/articles?topic=${topic}&limit=none`)
        .then(res => res.data)
    )
  );

  Promise.all(promisesArr).then(resArr => {
    const articleCounts = {};

    for (let i = 0; i < topicsArray.length; i++) {
      console.log(topicsArray[i], resArr[i].articles.length);
      articleCounts[topicsArray[i]] = resArr[i].articles.length;
    }

    cb(articleCounts);
  });
};

export const fetchTopics = cb => {
  // cb([
  //   { description: "Please be civil.", slug: "politics" },
  //   { description: "For all pet related questions", slug: "pets" },
  //   { description: "Star crossed lovers", slug: "astronomy" },
  //   { description: "Live. Laugh. Lift.", slug: "fitness" },
  //   { description: "stitch me up, scotty", slug: "embroidery" },
  //   { description: "Code is love, code is life", slug: "coding" },
  //   { description: "FOOTIE!", slug: "football" },
  //   { description: "Hey good looking, what you got cooking?", slug: "cooking" }
  // ]);
  axios
    .get(`${baseUrl}/topics`)
    .then(res => res.data)
    .then(data => {
      cb(data["topics"]);
    });
};
