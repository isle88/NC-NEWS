import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../utils/api";

export const SingleTopic = () => {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();

  const filteredByTopic = (articles) => {
    const result = articles.filter((article) => article.topic === topic);
    return result;
  }

  useEffect(() => {
    fetchArticles()
      .then((res) => {
        return filteredByTopic(res);
      })
      .then((res) => setTopics(res));
  }, [topic]);

  useEffect(() => {
    fetchArticles().then((res) => {
      setArticles(res);
    });
  }, [setArticles]);
  
  return (
    <div>
      <p className="SingleTopic__title">{`# ${topic}`}</p>
      {topics.length ? (
        <ul>
          {topics.map((topic) => {
            return (
              <li key={topic.article_id}>
                <Link to={`/articles/${topic.article_id}`}>
                <h6 className="created_at">{topic.created_at}</h6>
                <p>{topic.title}</p>
              </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
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
    </div>
  );

};


