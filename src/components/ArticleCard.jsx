import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/api";
import { AddVote } from "./AddVote";
import { Comments } from './Comments';

export const ArticleCard = () => {
  const [articleById, setArticleById] = useState([])
  const { article_id } = useParams();

  useEffect(() => {
    fetchArticleById(article_id).then((ArticleFromApi) => {
      setArticleById([ArticleFromApi])
    })
  }, [setArticleById, article_id])

  return (
    <div> 
      <ul>
        { articleById.map((article) => {
            return (
              <li key={article.article_id}>
                  <h6 className="created_at">
                    {new Date(article.created_at).toLocaleDateString("en-GB")}
                  </h6>
                  <p style={{fontSize:20, fontStyle: 'italic', marginTop: 5}}>{article.title}</p>
                  <p>{article.body}</p>
                <hr />
                <div className='addVote__div'>
                <h6 className='h6__comments'>{article.comment_count} comments</h6>
                <AddVote votes={article.votes} articleId={article.article_id} />
                </div>
              </li>
            );
          })}
          <Comments />
           <button className='top__button'
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
      </ul>
    </div>
  );
};
