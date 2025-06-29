import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import appFireBase from '../credenciales';

const auth = getAuth(appFireBase);

function Header({ nombreUsuario }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-text">MiNegocio.pe</Link>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <nav className="nav">
        <Link to="/pnegocio" className="nav-link">Publicar Negocio</Link>

        {nombreUsuario ? (
          <div className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaUserCircle />
            <span>{nombreUsuario}</span>
          </div>
        ) : (
          <Link to="/login" className="nav-link">Registrarse</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
