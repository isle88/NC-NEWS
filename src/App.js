import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import { Articles } from './components/Articles';
import { Header } from './components/Header'
import { Nav } from './components/Nav';
import { SingleTopic } from './components/SingleTopic';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Nav />
      <Routes>
      <Route path='/' element={<Articles />}/>
      <Route path='/topics/:topic' element={<SingleTopic/>}/>
      <Route path='/articles/:article_id' element={<Articles/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;