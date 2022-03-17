import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../utils/api";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export const SingleTopic = () => {
  /* eslint-disable no-unused-vars */
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchArticles()
      .then((res) => {
        const filteredByTopic = (articles) => {
          const result = articles.filter((article) => article.topic === topic);
          return result;
        };
        return filteredByTopic(res);
      })
      .then((res) => setTopics(res));
  }, [setTopics, topic]);

  useEffect(() => {
    fetchArticles().then((res) => {
      setArticles(res);
    });
  }, [setArticles]);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        created_at: "created_at",
        comment_count: "comment_count",
        votes: "votes",
      };
      const sortTopics = types[type];

      if (sortTopics === "created_at") {
        const sortedCreated = [...topics].sort((a, b) => {
          return (
            new Date(b[sortTopics]).getTime() - new Date(a[sortTopics]).getTime()
          );
        });
        setTopics(sortedCreated);
      } else {
        const sorted = [...topics].sort((a, b) => b[sortTopics] - a[sortTopics]);
        setTopics(sorted);       
      }
    };
    sortArray(sortBy)
  }, [sortBy, setTopics]); // eslint-disable-line react-hooks/exhaustive-deps

  const SortBySelect = () => {
    return (
      <div onChange={(e) => setSortBy(e.target.value)}>
        <Box sx={{ minWidth: 60 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Sort by
            </InputLabel>
            <NativeSelect defaultValue={sortBy}>
              <option value={"created_at"}>Created</option>
              <option value={"comment_count"}>Comments</option>
              <option value={"votes"}>Votes</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </div>
    );
  };

  return (
    <div>
      <p className="SingleTopic__title">{`# ${topic}`}</p>
      <div className="sort">
        <SortBySelect />
      </div>
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
        <>
          <p>Loading...</p>
        </>
      )}
      <button
        className="top__button2"
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
