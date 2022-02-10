import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../utils/api";
import { AddVote } from './AddVote';

export const Articles = () => {
  const { article_id } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((ArticlesFromApi) => {
      setArticles(ArticlesFromApi);
    });
  }, [setArticles]);

  function filteredById(articles) {
    const result = articles.filter(
      (article) => article.article_id === Number(article_id)
    );
    return result;
  }

  return (
    <div className="article">
      {article_id ? (
        // article by article_id
        <>
          <ul>
            {filteredById(articles).map((article) => {
              return (
                <Link
                to={`/articles/${article.article_id}/comments`}
                key={article.article_id}
              >
                <li key={article.article_id}>
                  <h5>{article.author}</h5>
                  <p>{article.title}</p>
                  <h6 className="articleCard__created_at">
                    {article.created_at}
                  </h6>
                  <hr />
                  <h6>votes: {article.votes} comment: {article.comment_count} </h6>
                  {/* <AddVote addVote={article.votes} article_id={article.article_id}/>      */}
                </li>
                </Link>
              );
            })}
          </ul>
        </>
      ) : (
        // all the articles
        <>
          <p className="article__title"># All</p>
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
                    <AddVote addVote={article.votes} article_id={article.article_id}/>     
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
