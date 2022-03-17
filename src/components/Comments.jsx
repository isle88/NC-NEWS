import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../contexts/Login";
import {
  deleteComment,
  fetchArticleById,
  fetchComments,
  postComment,
} from "../utils/api";
import { AddVote } from "./AddVote";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState();
  const [articles, setArticles] = useState([]);
  let comment_id = "";
  const { loggedIn } = useContext(LoginContext);
  const username = loggedIn;
  const [body, setBody] = useState("");
  const { article_id } = useParams();
  const writeComment = { username, body };
  const [sortBy, setSortBy] = useState("created_at");

  useEffect(() => {
    fetchArticleById(article_id).then((articlesFromApi) => {
      setArticles([articlesFromApi]);
    });
  }, [setArticles, article_id]);

  useEffect(() => {
    fetchComments(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi)
      setCommentsCount(comments.length)
    });
  }, [article_id, comments.length])

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(article_id, writeComment);
    e.target.reset();
    setCommentsCount((curr) => curr + 1);
  };

  const handleInput = (e) => {
    setBody(e.target.value);
  };

  const handleDelete = (e) => {
    comment_id = e.target.value
    if (comment_id !== "") {
      deleteComment(comment_id);
      setCommentsCount((curr) => curr - 1);
    }
  };
  
  useEffect(() => {
    if (commentsCount !== comments.length) {
      fetchComments(article_id).then((commentsFromApi) => {
        setComments(commentsFromApi);
      });
    }
  }, [commentsCount, article_id, comments]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        created_at: "created_at",
        votes: "votes",
      };
      const sortComments = types[type];
    
      if (sortComments === "created_at") {
        const sortedCreated = [...comments].sort((a, b) => {
          return (
            new Date(b[sortComments]).getTime() - new Date(a[sortComments]).getTime()
          );
        });
        setComments(sortedCreated);
      } else {
        const sorted = [...comments].sort((a, b) => b[sortComments] - a[sortComments]);
        setComments(sorted);       
      }
    };
    sortArray(sortBy);
  }, [sortBy, setComments]) // eslint-disable-line react-hooks/exhaustive-deps

  const SortBySelect = () => {
    return (
      <div onChange={(e) => setSortBy(e.target.value)}>
        <Box sx={{ minWidth: 60 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Sort by
            </InputLabel>
            <NativeSelect defaultValue={sortBy}>
              <option value={"created_at"} navigate="">
                Created
              </option>
              <option value={"votes"}>Votes</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </div>
    );
  };

  return (
    <>
      <div>
        <ul>
          {articles.map((article) => (
            <li className="Comments__filteredArticle" key={article.article_id}>
              <h4>{article.title}</h4>
              <h6 className="Comment__article-author">by {article.author}</h6>
            </li>
          ))}
          <div className="sort">
            <SortBySelect />
          </div>
          {loggedIn === "jessjelly" ? (
            <>
              <div className="input__div">
                <form onSubmit={handleSubmit}>
                  <input
                    className="input__textField"
                    id="input_body"
                    type="text"
                    placeholder="your comment here... "
                    onChange={handleInput}
                    required
                  ></input>
                  <button>Add</button>
                </form>
              </div>
            </>
          ) : null}
          {[...comments].map((comment) => {
            return (
              <li key={comment.comment_id}>
                <h6 className="created_at">{comment.created_at}</h6>
                <h5>{comment.author}</h5>
                {comment.author === loggedIn ? (
                  <>
                    <button value={comment.comment_id} onClick={handleDelete}>
                      Delete
                    </button>
                  </>
                ) : null}
                <p>{comment.body}</p>
                <hr />
                <div className='addVote__div'>
                <AddVote votes={comment.votes} commentId={comment.comment_id} />
                </div>
              </li>
            );
          })}
        </ul>
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
    </>
  );
};