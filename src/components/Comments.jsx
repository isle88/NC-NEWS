import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../contexts/Login";
import {
  deleteComment,
  fetchArticleById,
  fetchComments,
  postComment,
} from "../utils/api";

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState();
  const [articles, setArticles] = useState([]);
  let comment_id = ''
  const { loggedIn } = useContext(LoginContext);
  const username = loggedIn;
  const [body, setBody] = useState("");
  const { article_id } = useParams();
  const writeComment = { username, body };

  useEffect(() => {
    fetchArticleById(article_id).then((articlesFromApi) => {
      setArticles([articlesFromApi]);
    });
  }, [setArticles, article_id]);
  
  useEffect(() => {
    fetchComments(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
      setCommentsCount(comments.length);
    });
  }, [article_id, comments.length]);

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
      comment_id = e.target.value;
      if (comment_id !== '') {
        deleteComment(comment_id);
      }
    };

  useEffect(() => {
    if (commentsCount !== comments.length || comment_id !== undefined) {
      fetchComments(article_id).then((commentsFromApi) => {
        setComments(commentsFromApi);
      });
    }
  }, [commentsCount, comments, article_id, comment_id]);

  return (
    <>
      {loggedIn === "jessjelly" ? (
        <div>
          <ul>
            {articles.map((article) => (
                <li
                  className="Comments__filteredArticle"
                  key={article.article_id}
                >
                  <h4>{article.title}</h4>
                  <h6 className="Comment__article-author">
                    by {article.author}
                  </h6>
                </li>
              ))}
            <div className="input__div">
              <form onSubmit={handleSubmit}>
                <input
                  id="input_body"
                  type="text"
                  placeholder="your comment here... "
                  size="30"
                  onChange={handleInput}
                  required
                ></input>
                <button>Add</button>
              </form>
            </div>
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
                      {console.log()}
                    </>
                  ) : null}
                  <p>{comment.body}</p>
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
      ) : (
        <div>
          <ul>
          {articles.map((article) => (
                <li
                  className="Comments__filteredArticle"
                  key={article.article_id}
                >
                  <h4>{article.title}</h4>
                  <h6 className="Comment__article-author">
                    by {article.author}
                  </h6>
                </li>
              ))}
            {[...comments].map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <h6 className="created_at">{comment.created_at}</h6>
                  <h5>{comment.author}</h5>
                  <p>{comment.body}</p>
                  <hr />
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
      )}
    </>
  );
};
