import { useState } from "react";
import { patchArticles } from "../utils/api";

export const AddVote = ({ article_id, addVote }) => {

  const [votesCount, setVotesCount] = useState(0);

  function plusVote() {

    setVotesCount((current) => current + 1);
    patchArticles(article_id)
  }
  {console.log(votesCount, typeof votesCount)}
  return (
    <>
      <button onClick={() => plusVote()}>vote {addVote + votesCount}</button>
    </>
  );
};
