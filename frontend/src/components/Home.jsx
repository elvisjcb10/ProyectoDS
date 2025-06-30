// src/components/Home.jsx
import React from "react";
import appFireBase from "../credenciales";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(appFireBase);

const Home = ({ correoUsuario }) => {
  // Debug: Verificar si la prop llega correctamente
  console.log("correoUsuario:", correoUsuario);
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Cabecera */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>
          Bienvenido, {correoUsuario || 'Usuario'}
        </h2>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => signOut(auth)}
        >
          Cerrar sesión
        </button>
      </header>

      {/* Imagen de bienvenida */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <img 
          src="/src/Bienvenida.avif" 
          alt="Bienvenida a Mi-App" 
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '300px',
            borderRadius: '10px',
            objectFit: 'cover'
          }}
        />
        <h2 style={{
          marginTop: '20px',
          color: '#007bff',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          ¡Bienvenido a Mi-App!
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginTop: '10px'
        }}>
          Tu plataforma para impulsar emprendimientos locales
        </p>
      </div>

      {/* Presentación "Quiénes somos" */}
      <section style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#007bff', marginBottom: '20px', fontSize: '24px' }}>
          ¿Quiénes somos?
        </h3>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          <strong>Mi‑App</strong> es una plataforma creada para impulsar el
          crecimiento de los emprendedores locales. Nuestro objetivo es conectar
          negocios emergentes con clientes que valoran el talento y la
          creatividad de su comunidad.
        </p>

        <h4 style={{ marginTop: '30px', marginBottom: '15px', color: '#333' }}>
          Nuestra misión
        </h4>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          Brindar a cada emprendedor las herramientas digitales necesarias para
          gestionar, promocionar y hacer crecer su negocio de manera sencilla y
          asequible.
        </p>

        <h4 style={{ marginTop: '30px', marginBottom: '15px', color: '#333' }}>
          Nuestros valores
        </h4>
        <ul style={{ fontSize: '16px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Innovación constante</li>
          <li>Compromiso con la comunidad</li>
          <li>Transparencia y confianza</li>
          <li>Sostenibilidad</li>
        </ul>
      </section>

      {/* Sección adicional para verificar que el componente se renderiza completamente */}
      <div style={{
        padding: '20px',
        backgroundColor: '#e9ecef',
        borderRadius: '5px',
        textAlign: 'center'
      }}>
        
      </div>
    </div>
  );
};

export default Home;