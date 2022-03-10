
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../contexts/Login';

export const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext)

 
  const toggleLogIn = (e) => {
    setLoggedIn((current) => {
      return current === 'LOGIN' ? `jessjelly` : 'LOGIN'
    })
  }

  return (
    <>
    <header className="Header">
      <Link to='/'>
      <h1>NC-NEWS</h1>
      <button style={{border: "2px solid #aaa", background: "#FFFF", borderRadius: 5}} onClick={() => toggleLogIn()} className='Header__login' >{loggedIn}</button>
      </Link>
    </header>
    </>
  );
};
