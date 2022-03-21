import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchTopics } from "../utils/api";

export const Nav = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetchTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <nav className="Nav">
      <h3>
        {topics.map((topic) => {
          return (
            <Link to={`/topics/${topic.slug}`} key={topic.slug}>
              <span>{topic.slug}</span>
              </Link>
            );
        })}
      </h3>
    </nav>
  );
};
