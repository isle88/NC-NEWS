import axios from "axios";

const myApi = axios.create({
  baseURL: "https://hyunjungs-nc-news.herokuapp.com/api",
});

export const fetchTopics = () => {
  return myApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const fetchArticles = () => {
  return myApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const fetchComments = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchArticle = (article_id) => {
  return myApi
    .patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data.articles;
    })
};

export const postComment = (article_id, comment) => {
  return myApi
  .post(`/articles/${article_id}/comments`, comment)
  .then(({ data }) => {
    return data
  })
}

