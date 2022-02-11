import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../contexts/Login";
import { fetchArticles, fetchComments, postComment } from "../utils/api";

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [articles, setArticles] = useState([]);
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const [author, setAuthor] = useState(loggedIn);
  const { article_id } = useParams();


  useEffect(() => {
    fetchComments(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [setComments]);

  useEffect(() => {
    fetchArticles().then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, [setArticles]);

  return (
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
        {/* <form> */}
        <input
          id="input_body"
          type="text"
          placeholder="your comment here... "
          size="25"
        ></input>
        <button>Add</button>
        {/* </form> */}

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
  );
};
