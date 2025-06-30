// App.jsx
import { useState, useEffect } from 'react';
import appFireBase from './credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import MisNegocios from './components/MisNegocios';
import axios from 'axios';
import CrearNegocio from './components/CrearNegocio'; // ✅ crea el componente si no existe

import './App.css';

const auth = getAuth(appFireBase);

function App() {
  const [usuarioFirebase, setUsuarioFirebase] = useState(null);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      if (usuario) {
        setUsuarioFirebase(usuario);
        try {
          const res = await axios.get(`http://localhost:3001/api/usuarios/${encodeURIComponent(usuario.email)}`);
          setDatosUsuario(res.data);
          console.log('Datos completos del usuario:', res.data);
        } catch (err) {
          console.error("No se pudo obtener datos del usuario:", err);
        }
      } else {
        setUsuarioFirebase(null);
        setDatosUsuario(null);
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) return null;

  return (
    <Router>
      <Header nombreUsuario={datosUsuario?.nombre || ''} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={setDatosUsuario} />} />
          <Route path="/producto-detalle" element={<div>Detalle de Producto</div>} />
          <Route path="/pnegocio" element={<div>Publicar Negocio</div>} />
          <Route path="/signup" element={<div>Registro</div>} />
          <Route path="/mis-negocios" element={<MisNegocios usuarioId={datosUsuario?.id} />} />
          <Route path="/crear-negocio" element={<CrearNegocio usuarioId={datosUsuario?.id} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
