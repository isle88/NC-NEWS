import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../utils/api";
import { ArticleCard } from "./ArticleCard";

export const Articles = () => {
  const { article_id } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((ArticlesFromApi) => {
      setArticles(ArticlesFromApi);
    });
  }, [setArticles]);

  function filterbyId(articles) {
    const result = articles.filter(
      (article) => article.article_id === Number(article_id)
    );
    return result;
  }

  return (
    <div className="article">
      {article_id ? (
        <>
          <ul>
            {filterbyId(articles).map((article) => {
              return (
                <li key={article.article_id}>
                  <h5>{article.author}</h5>
                  <p>{article.title}</p>
                  <h6 className="articleCard__created_at">
                      {article.created_at}
                    </h6>
                    <hr />
                    <h6>
                      votes: {article.votes} comment: {article.comment_count}{" "}
                    </h6>
                </li>
              );
            })}       
          </ul>
        </>
      ) : (
        <>
          <p className="article__title">Articles</p>
          <ul>
            {articles.map((article) => {
              return (
                <Link
                  to={`/articles/${article.article_id}`}
                  key={article.article_id}
                >
                  <li key={article.article_id}>
                    <p className="articleCard__topic">#{article.topic}</p>
                    <h6>{article.author}</h6>
                    <p>{article.title}</p>
                    <h6 className="articleCard__created_at">
                      {article.created_at}
                    </h6>
                    <hr />
                    <h6>
                      votes: {article.votes} comment: {article.comment_count}{" "}
                    </h6>
                  </li>
                </Link>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};