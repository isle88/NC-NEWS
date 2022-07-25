import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils/api";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchArticles().then((ArticlesFromApi) => {
      setArticles(ArticlesFromApi);
      setIsLoaded(true)
    });
  }, [setArticles, setIsLoaded]);

  return (
    <div>
      {isLoaded ? (
        <>
          <p className="Articles__title"># All</p>
          <ul>
            {articles.map((article) => {
              return (
                <Link
                  to={`/articles/${article.article_id}`}
                  key={article.article_id}
                >
                  <li key={article.article_id}>
                    <h6 className="created_at">{new Date(article.created_at).toLocaleDateString("en-GB")}</h6>
                    <h5 className="Articles__topic">#{article.topic}</h5>
                    <p>{article.title}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <p>is Loading...</p>
        </>
      )}

      <button
        className="top__button"
        onClick={() =>
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        Top
      </button>
    </div>
  );
};
