import React from "react";
import axios from "axios";
const baseUrl = "https://nc-news-c-matus.herokuapp.com/api"

export const fetchArticles = cb => {
    axios
      .get(`${baseUrl}/articles`)
      .then(res => res.data)
      .then(allArticlesData => {
        cb(allArticlesData["articles"]);
      });
};
