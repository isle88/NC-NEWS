import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../contexts/Login";
import { fetchArticles, fetchComments, postComment } from "../utils/api";

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [articles, setArticles] = useState([]);
  const { loggedIn } = useContext(LoginContext);
  const username = loggedIn;
  const [body, setBody] = useState();
  const { article_id } = useParams();
  const writeComment = { username, body };

  useEffect(() => {
    fetchComments(article_id)
    .then((commentsFromApi) => {
     setComments(commentsFromApi);
    });
    //eslint-disable-next-line
  }, [setComments]);

  useEffect(() => {
    fetchArticles().then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, [setArticles]);

  const handleSubmit = (e) => {
    postComment(article_id, writeComment).then((data) => {
      return data;
    });
  };

  const handleInput = (e) => {
    e.preventDefault()
    setBody(e.target.value);
  };

  return (
    <>
      {loggedIn === "jessjelly" ? (
        <div>
          <ul>
            {articles
              .filter((article) => article.article_id === Number(article_id))
              .map((filteredArticle) => (
                <li
                  className="Comments__filteredArticle"
                  key={filteredArticle.article_id}
                >
                  <h4>{filteredArticle.title}</h4>
                  <h6 className="Comment__article-author">
                    by {filteredArticle.author}
                  </h6>
                </li>
              ))}
              <div className='input__div'>
            <form onSubmit={handleSubmit}>
              <input
                id="input_body"
                type="text"
                placeholder="your comment here... "
                size='30'
                onChange={handleInput}
                required
              ></input>
              <button>Add</button>
            </form>
              </div>
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <h6 className="created_at">{comment.created_at}</h6>
                  <h5>{comment.author}</h5>
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
            {articles
              .filter((article) => article.article_id === Number(article_id))
              .map((filteredArticle) => (
                <li
                  className="Comments__filteredArticle"
                  key={filteredArticle.article_id}
                >
                  <h4>{filteredArticle.title}</h4>
                  <h6 className="Comment__article-author">
                    by {filteredArticle.author}
                  </h6>
                </li>
              ))}
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <h6 className="created_at">{comment.created_at}</h6>
                  <h5>{comment.author}</h5>
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
      )}
    </>
  );
};
