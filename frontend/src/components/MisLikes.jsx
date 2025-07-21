
// ======== FRONTEND: MisLikes.jsx =========
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalPublicacion from './ModalPublicacion';
const MisLikes = ({ usuarioId }) => {
  const [likes, setLikes] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);

  useEffect(() => {
    const obtenerLikes = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/likes/usuario/${usuarioId}`);
        setLikes(res.data);
      } catch (err) {
        console.error('Error al obtener likes:', err);
      }
    };
    if (usuarioId) obtenerLikes();
  }, [usuarioId]);

  const abrirModal = (publicacion) => {
    setPublicacionSeleccionada(publicacion);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPublicacionSeleccionada(null);
  };

  return (
    <div className="contenedor-likes">
      <h2>Mis Likes </h2>
      <div className="grid-publicaciones">
        {likes.map((publi) => (
          <div key={publi.publicacion_id} className="card" onClick={() => abrirModal(publi)}>
            {publi.imagen && <img src={publi.imagen} alt="img" className="imagen-publicacion" />}
            <h3>{publi.titulo}</h3>
            <p>{publi.contenido}</p>
            <span className="nombre-empresa">🏠 {publi.nombre_emprendimiento}</span>
          </div>
        ))}
      </div>
      {modalAbierto && publicacionSeleccionada && (
        <ModalPublicacion
          publicacion={publicacionSeleccionada}
          onClose={cerrarModal}
          usuarioId={usuarioId}
        />
      )}
    </div>
  );
};

export default MisLikes;
