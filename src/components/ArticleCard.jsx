import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../utils/api";
import { AddVote } from "./AddVote";

export const ArticleCard = () => {
  const [articles, setArticles] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    fetchArticles().then((ArticlesFromApi) => {
      setArticles(ArticlesFromApi);
    });
  }, [setArticles]);

  return (
    <div> 
      <ul>
        {articles
          .filter((article) => article.article_id === Number(article_id))
          .map((article) => {
            return (
              <li key={article.article_id}>
                <Link
                  to={`/articles/${article.article_id}/comments`}
                  key={article.article_id}
                >
                  <h6 className="created_at">
                    {article.created_at}
                  </h6>
                  <p className="ArticleCard__topic"># {article.topic}</p>
                  <h6>{article.author}</h6>
                  <p>{article.title}</p>
                </Link>
                <hr />
                <AddVote votes={article.votes} articleId={article.article_id} />
                <h6>comment: {article.comment_count} </h6>
              </li>
            );
          })}
           <button className='top__button'
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
      </ul>
    </div>
  );
};
