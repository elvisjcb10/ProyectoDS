import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import appFireBase from '../credenciales';
import "../styles/Header.css";
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

  const handleLoginClick = () => {
    navigate('/login?modo=login');
  };

  const handleRegisterClick = () => {
    navigate('/login?modo=registro');
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
        {nombreUsuario ? (
          // Usuario logueado - Mostrar perfil y menú desplegable
          <div
            className="perfil-container"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <FaUserCircle className="icono-perfil" />
            <span className="nombre-usuario">{nombreUsuario}</span>

            {menuVisible && (
              <div className="menu-desplegable">
                <Link to="/mis-negocios">Mis negocios</Link>
                <Link to="/mis-ligues">Mis likes</Link>
                <Link to="/empresas-seguidas">Empresas que sigo</Link>
                <Link to="/inicio">Inicio</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          // Usuario no logueado - Mostrar botones de autenticación
          <div className="auth-buttons">
            <button 
              onClick={handleLoginClick} 
              className="login-button"
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={handleRegisterClick} 
              className="register-button"
            >
              Registrarse
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;