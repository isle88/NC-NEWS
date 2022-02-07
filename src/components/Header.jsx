import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="Header">
      <Link to='/'>
      <h1>NC-NEWS</h1>
      </Link>
    </header>
  );
};
