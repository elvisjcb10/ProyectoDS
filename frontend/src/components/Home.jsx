import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalPublicacion from "./ModalPublicacion";
import { HomeIcon } from "lucide-react";

const Home = ({ usuarioId }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);

  useEffect(() => {
    const obtenerPublicaciones = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/publicaciones/todo");
        setPublicaciones(res.data);
      } catch (err) {
        console.error("Error al cargar publicaciones:", err);
      }
    };

    obtenerPublicaciones();
  }, []);

  const abrirModal = (publicacion) => {
    setPublicacionSeleccionada(publicacion);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPublicacionSeleccionada(null);
  };

  return (
    <div className="home-page">
      <div className="grid-publicaciones">
        {publicaciones.map((pub) => (
          <div key={pub.id} className="card-home" onClick={() => abrirModal(pub)}>
            {pub.imagen && <img src={pub.imagen} alt="Imagen" className="img-card" />}
            <div className="contenido-card">
              <h4>{pub.titulo}</h4>
              <p>{pub.contenido.slice(0, 80)}...</p>
              <div className="empresa-footer">
                <HomeIcon size={16} />
                <span>{pub.nombre_emprendimiento}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalAbierto && publicacionSeleccionada && (
        <ModalPublicacion
          publicacion={publicacionSeleccionada}
          usuarioId={usuarioId}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
};

export default Home;
