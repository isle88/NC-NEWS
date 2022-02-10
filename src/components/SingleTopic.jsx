import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../utils/api";

export const SingleTopic = () => {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();

  function filteredByTopic(articles) {
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
    <div className="topic">
      <p className="topic__title">{`# ${topic}`}</p>
      {topics.length ? (
        <ul>
          {topics.map((topic) => {
            return (
              <Link to={`/articles/${topic.article_id}`}>
              <li key={topic.article_id}>
                <h6>{topic.author}</h6>
                <p>{topic.title}</p>
                <h6 className="topic__created_at">{topic.created_at}</h6>
                <hr />
                <h6>
                  votes: {topic.votes} comments: {topic.comment_count}
                </h6>
              </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

};
