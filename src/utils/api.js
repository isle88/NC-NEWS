import axios from "axios";

const myApi = axios.create({
  baseURL: "https://hyunjung-kim.cyclic.app/api",
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

export const fetchArticleById = (article_id) => {
  return myApi.get(`articles/${article_id}`).then(({ data }) => {
    return data.article;
  })
}

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

export const patchComment = (comment_id) => {
  return myApi
   .patch(`/comments/${comment_id}`, { inc_votes: 1 })
   .then(({ data }) => {
     return data.comment
   })
}

export const postComment = (article_id, comment) => {
  return myApi
  .post(`/articles/${article_id}/comments`, comment)
  .then(({ data }) => {
    return data
  })
}

export const deleteComment = (comment_id) => {
  return myApi
  .delete(`/comments/${comment_id}`)
}

