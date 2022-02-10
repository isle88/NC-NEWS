import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ArticleCard } from "./components/ArticleCard";
import { Articles } from "./components/Articles";
import { Comments } from "./components/Comments";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { SingleTopic } from "./components/SingleTopic";
// import { LoginContext } from './contexts/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <LoginContext.Provider value={{ loggedIn, setLoggedIn}}> */}
        <Header />
        <Nav />
        {/* </LoginContext.Provider> */}
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/topics/:topic" element={<SingleTopic />} />
          <Route path="/articles/:article_id" element={<ArticleCard />} />
          <Route path="articles/:article_id/comments" element={<Comments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
