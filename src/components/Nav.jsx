import { useEffect, useState } from "react";
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
        {topics.map((topicCard) => {
          return topicCard.slug + "\n";
        })}
      </h3>
    </nav>
  );
};
