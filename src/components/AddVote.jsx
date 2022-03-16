
import { useState } from "react";
import { patchArticle, patchComment } from "../utils/api";

export const AddVote = ({ articleId, commentId, votes }) => {
  const [votesCount, setVotesCount] = useState(votes);

  const addOne = () => {
    setVotesCount((current) => current + 1);
    if(articleId) {
      patchArticle(articleId)
    } patchComment(commentId)
    .catch((err) => {
    setVotesCount((current) => current - 1);
    });
  }

  const subtractOne = () => {
    setVotesCount((current) => current - 1);
    if(articleId) {
      patchArticle(articleId)
    } patchComment(commentId)
    .catch((err) => {
    setVotesCount((current) => current + 1);
    });
  }

    return (
      <div className='addVote__div'>
        <button onClick={() => addOne()}>🙂</button>
        <h6>votes: {votesCount}</h6>
        <button onClick={() => subtractOne()}>🙁</button>
      </div>
    );
};
