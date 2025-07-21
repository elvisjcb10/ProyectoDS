<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
=======
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
>>>>>>> main
import appFireBase from "../credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(appFireBase);

const Login = ({ onLoginSuccess }) => {
  const [registrando, setRegistrando] = useState(false);
<<<<<<< HEAD
  const navigate = useNavigate();

=======
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Verificar si viene de un botón específico
  useEffect(() => {
    const modo = searchParams.get('modo');
    if (modo === 'registro') {
      setRegistrando(true);
    } else if (modo === 'login') {
      setRegistrando(false);
    }
  }, [searchParams]);

>>>>>>> main
  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    if (registrando) {
      const nombre = e.target.nombre.value;

      try {
        await createUserWithEmailAndPassword(auth, correo, contraseña);
        await fetch("http://localhost:3001/api/usuarios/registrar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            correo,
            contrasena: contraseña,
            tipo: "cliente",
          }),
        });

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
      <div className="row login-wrapper">
        {/* Columna izquierda: Bienvenida visual */}
        <div className="col-md-8 login-izquierda">
          <div className="contenido-bienvenida">
            <h1>Bienvenido a MiNegocio.pe</h1>
            <p>
              Descubre negocios locales, explora sus publicaciones y apoya a los emprendedores de tu comunidad.
            </p>
          </div>
        </div>

<<<<<<< HEAD
        {/* Columna derecha: Formulario sin tarjeta */}
        <div className="col-md-4 login-derecha">
          <form onSubmit={functAutenticacion} className="formulario">
=======
        {/* Columna derecha: Formulario */}
        <div className="col-md-4 login-derecha">
          <form onSubmit={functAutenticacion} className="formulario">
            <h2 className="form-title">
              {registrando ? "Crear Cuenta" : "Iniciar Sesión"}
            </h2>
            
>>>>>>> main
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
<<<<<<< HEAD
              {registrando ? "Registrate" : "Inicia Sesión"}
=======
              {registrando ? "Registrarse" : "Iniciar Sesión"}
>>>>>>> main
            </button>
            <h4 className="texto">
              {registrando ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
              <button
                className="btnswicth"
                onClick={() => setRegistrando(!registrando)}
                type="button"
              >
<<<<<<< HEAD
                {registrando ? "Inicia Sesión" : "Registrate"}
=======
                {registrando ? "Iniciar Sesión" : "Registrarse"}
>>>>>>> main
              </button>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> main
