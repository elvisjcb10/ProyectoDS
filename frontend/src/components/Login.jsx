// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagen from '../assets/loginvector.jpeg';
import imageProfile from '../assets/profile1.png';

import appFireBase from "../credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(appFireBase);

const Login = ({ onLoginSuccess }) => {
  const [registrando, setRegistrando] = useState(false);
  const navigate = useNavigate();

  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    if (registrando) {
      const nombre = e.target.nombre.value;

      try {
        await createUserWithEmailAndPassword(auth, correo, contraseña);
        const usuario = auth.currentUser;

        await fetch("http://localhost:3001/api/usuarios/registrar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: nombre,
            correo: correo,
            contrasena: contraseña,
            tipo: "cliente",
          }),
        });

        // Obtener los datos del usuario desde el backend
        const res = await fetch(`http://localhost:3001/api/usuarios/${encodeURIComponent(correo)}`);
        const datos = await res.json();
        onLoginSuccess(datos);
        navigate('/');
      } catch (error) {
        console.error("Error en registro:", error);
        alert("Asegúrate de que la contraseña tenga más de 8 caracteres");
      }

    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, contraseña);

        // Obtener los datos del usuario desde el backend
        const res = await fetch(`http://localhost:3001/api/usuarios/${encodeURIComponent(correo)}`);
        const datos = await res.json();
        onLoginSuccess(datos);
        navigate('/');
      } catch (error) {
        console.error("Error en inicio de sesión:", error);
        alert("El correo o contraseña son incorrectos");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Columna pequeña: formulario */}
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow-lg">
              <img src={imageProfile} alt="perfil" className="estilo-profile" />
              <form onSubmit={functAutenticacion}>
                {registrando && (
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    className="cajatexto"
                    required
                  />
                )}
                <input
                  id="email"
                  type="email"
                  placeholder="Ingresa Email"
                  className="cajatexto"
                  required
                />
                <input
                  id="password"
                  type="password"
                  placeholder="Ingresar Contraseña"
                  className="cajatexto"
                  required
                />
                <button className="btnform">
                  {registrando ? "Registrate" : "Inicia Sesión"}
                </button>
              </form>
              <h4 className="texto">
                {registrando ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
                <button
                  className="btnswicth"
                  onClick={() => setRegistrando(!registrando)}
                >
                  {registrando ? "Inicia Sesión" : "Registrate"}
                </button>
              </h4>
            </div>
          </div>
        </div>

        {/* Columna grande: imagen */}
        <div className="col-md-8">
          <img src={imagen} alt="login" className="tamaño-imagen" />
        </div>
      </div>
    </div>
  );
};

export default Login;
