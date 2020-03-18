import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api";

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

export const fetchUsers = cb => {
  axios
    .get(`${baseUrl}/users`)
    .then(res => res.data)
    .then(data => {
      cb(data["users"]);
    });
};

export const fetchTopics = cb => {
  cb([
    { description: "Please be civil.", slug: "politics" },
    { description: "For all pet related questions", slug: "pets" },
    { description: "Star crossed lovers", slug: "astronomy" },
    { description: "Live. Laugh. Lift.", slug: "fitness" },
    { description: "stitch me up, scotty", slug: "embroidery" },
    { description: "Code is love, code is life", slug: "coding" },
    { description: "FOOTIE!", slug: "football" },
    { description: "Hey good looking, what you got cooking?", slug: "cooking" }
  ]);
  // axios
  //   .get(`${baseUrl}/topics`)
  //   .then(res => res.data)
  //   .then(data => {
  //     cb(data["topics"]);
  //   });
};
