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


// export const fetchArticlesBy = (order, sort_by) => {
//   return myApi
//     .get("/articles", { params: { order, sort_by } })
//     .then(({ data }) => {
//       return data.articles;
//     });
// };

