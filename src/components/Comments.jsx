import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchArticles, fetchComments } from "../utils/api";
import { AddVote } from './AddVote';

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [articles, setArticles] = useState([]);
  const { article_id } = useParams()

  useEffect(() => {
    fetchComments(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [setComments]);

  useEffect(() => {
    fetchArticles().then((articlesFromApi) => {
      setArticles(articlesFromApi)
    })
  }, [setArticles])

  return (
    <div>
      <ul>
       { 
       articles
       .filter(article => article.article_id === Number(article_id)
        )
       .map(filteredArticle => 
       <li className='Comments__filteredArticle'  key={filteredArticle.article_id}>
         <h4>{filteredArticle.title}</h4>
         <h6>by {filteredArticle.author}</h6>
       </li>)
       }
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h5>{comment.author}</h5>
              <p>{comment.body}</p>
              <hr />
              <h6 className='created_at'>{comment.created_at}</h6>
            </li>
          );
        })}
      </ul>
      <button
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
