
import { useState } from "react";
import { patchArticle } from "../utils/api";

export const AddVote = ({ articleId, votes }) => {
  const [votesCount, setVotesCount] = useState(votes);

  const addOne = () => {
    setVotesCount((current) => current + 1);
    patchArticle(articleId).catch((err) => {
    setVotesCount((current) => current - 1);
    });
  }

  const subtractOne = () => {
    setVotesCount((current) => current - 1);
    patchArticle(articleId).catch((err) => {
    setVotesCount((current) => current + 1);
    });
  }

    return (
      <>
        <button onClick={() => addOne()}>🙂</button>
        <button>votes: {votesCount}</button>
        <button onClick={() => subtractOne()}>🙁</button>
      </>
    );
};
