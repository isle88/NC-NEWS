import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import { Articles } from './components/Articles';
import { Header } from './components/Header'
import { Nav } from './components/Nav';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Nav />
      <Routes>
      <Route path='/' element={<Articles />}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;