import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmpresasSeguidas = ({ usuarioId }) => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    if (!usuarioId) return;
    const fetchSeguidos = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/seguimientos/usuario/${usuarioId}`);
        setEmpresas(res.data);
      } catch (err) {
        console.error('Error al obtener empresas seguidas:', err);
      }
    };

    fetchSeguidos();
  }, [usuarioId]);

  return (
    <div className="contenedor-empresas">
      <h2>Empresas que sigues ⭐</h2>
      <div className="grid-empresas">
        {empresas.map((empresa) => (
          <Link key={empresa.id} to={`/negocio/${empresa.id}`} className="card-empresa">
            {empresa.imagen && (
              <img src={empresa.imagen} alt="logo" className="logo-empresa" />
            )}
            <h3>{empresa.nombre}</h3>
            <p><strong>📞 Teléfono:</strong> {empresa.telefono || 'No especificado'}</p>
            <p><strong>📍 Dirección:</strong> {empresa.ubicacion || 'No especificado'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmpresasSeguidas;
