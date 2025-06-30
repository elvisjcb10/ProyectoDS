import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import appFireBase from '../credenciales';

const auth = getAuth(appFireBase);

function Header({ nombreUsuario }) {
  const [query, setQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
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
          <div
            className="perfil-container"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <FaUserCircle className="icono-perfil" />
            <span className="nombre-usuario">{nombreUsuario}</span>

            {menuVisible && (
              <div className="menu-desplegable">
                <Link to="/mis-negocios">Mis negocios</Link>
                <Link to="/mis-ligues">Mis ligues</Link>
                <Link to="/empresas-seguidas">Empresas que sigo</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-link">Registrarse</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
