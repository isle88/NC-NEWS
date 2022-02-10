import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchArticles, fetchComment } from "../utils/api";

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [articles, setArticles] = useState([]);
  const {article_id} = useParams()

  useEffect(() => {
    fetchComment(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [setComments]);

  useEffect(() => {
    fetchArticles().then((articlesFromApi) => {
      setArticles(articlesFromApi)
    })
  }, [setArticles])

  return (
    <>
      <ul>
       { 
       articles
       .filter(article => article.article_id === Number(article_id)
        )
       .map(filteredArticle => <li key={filteredArticle.article_id}>
         <h5>{filteredArticle.author}</h5>
         <h5>{filteredArticle.title}</h5>
       </li>)
       }
      
        <h5>comments...</h5>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h5>{comment.author}</h5>
              <p>{comment.body}</p>
              <h6>{comment.created_at}</h6>
              <hr />
              <h6>votes: {comment.votes}</h6>
            </li>
          );
        })}
      </ul>
    </>
  );
};
