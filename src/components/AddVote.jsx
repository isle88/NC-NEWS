
import { useState } from "react";
import { patchArticle, patchComment } from "../utils/api";

export const AddVote = ({ articleId, commentId, votes }) => {
  const [votesCount, setVotesCount] = useState(votes);

  const addOne = () => {
    setVotesCount((current) => current + 1);
    if(articleId) {
     return  patchArticle(articleId)
      .catch((err) => {
        setVotesCount((current) => current - 1);
        });
    } else {
      return patchComment(commentId)
    .catch((err) => {
    setVotesCount((current) => current - 1);
    });
  }
  }

  const subtractOne = () => {
    setVotesCount((current) => current - 1);
    if(articleId) {
     return patchArticle(articleId)
      .catch((err) => {
        setVotesCount((current) => current + 1);
        });
    } else { 
      return patchComment(commentId)
    .catch((err) => {
    setVotesCount((current) => current + 1);
    });
  }
  }

    return (
      <>
        <button onClick={() => addOne()}>&#x2B06;</button>
        <h6>{votesCount} votes</h6>
        <button onClick={() => subtractOne()}>&#x2B07;</button>
      </>
    );
};
