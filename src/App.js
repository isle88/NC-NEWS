import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ArticleCard } from "./components/ArticleCard";
import { Articles } from "./components/Articles";
import { Comments } from "./components/Comments";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { SingleTopic } from "./components/SingleTopic";
import { LoginContext } from './contexts/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState('LOGIN')
  return (
    <div className="App">
      <BrowserRouter>
        <LoginContext.Provider value={{ loggedIn, setLoggedIn}}>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/topics/:topic" element={<SingleTopic />} />
          <Route path="/articles/:article_id" element={<ArticleCard />} />
          <Route path="articles/:article_id/comments" element={<Comments />} />
          <Route path="*" element={<p className='notFound'>Page Not Found</p>} />
        </Routes>
        </LoginContext.Provider> 
      </BrowserRouter>
    </div>
  );
}

export default App;
