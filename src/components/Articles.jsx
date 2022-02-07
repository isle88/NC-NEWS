import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles().then((ArticlesFromApi) => {
      setArticles(ArticlesFromApi);
    });
  }, [setArticles]);

  return (
    <article className="Articles">
      <p className='p__Articles'>Articles</p>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <p className='p__topic'>{article.topic}</p>
              <h6>{article.author}</h6>
              <p>{article.title}</p>
              <h6 className="h6__created_at">{article.created_at}</h6>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
