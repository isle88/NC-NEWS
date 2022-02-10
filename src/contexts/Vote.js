import { createContext, useState } from "react";

export const VoteContext = createContext();

export const VoteProvider = (props) => {
  const [articles, setArticles] = useState();

  return (
    <VoteContext.Provider value={{ articles, setArticles }}>
      {props.children}
    </VoteContext.Provider>
  );
};
