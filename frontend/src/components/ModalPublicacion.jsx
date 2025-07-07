import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ModalPublicacion = ({ publicacion, onClose }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [likes, setLikes] = useState(0);
  const [yaDioLike, setYaDioLike] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);

  // Obtener el ID del usuario logueado desde Firebase y luego desde MySQL
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await axios.get(`http://localhost:3001/api/usuarios/${user.email}`);
          setUsuarioId(res.data.id);
        } catch (err) {
          console.error("No se pudo obtener el ID del usuario:", err);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (publicacion) {
      obtenerComentarios();
      contarLikes();
    }
  }, [publicacion]);

  const obtenerComentarios = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/comentarios/${publicacion.emprendimiento_id}`);
      const filtrados = res.data.filter(c => c.publicacion_id === publicacion.id);
      setComentarios(filtrados);
    } catch (err) {
      console.error("Error al obtener comentarios:", err);
    }
  };

  const contarLikes = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/likes/${publicacion.emprendimiento_id}`);
      const likesPub = res.data.filter(l => l.publicacion_id === publicacion.id);
      setLikes(likesPub.length);
      setYaDioLike(likesPub.some(l => l.usuario_id === usuarioId));
    } catch (err) {
      console.error("Error al contar likes:", err);
    }
  };

  const toggleLike = async () => {
    if (!usuarioId) {
      alert("Debes iniciar sesión para dar like.");
      return;
    }
    try {
      await axios.post("http://localhost:3001/api/likes/toggle", {
        usuario_id: usuarioId,
        publicacion_id: publicacion.id,
      });
      contarLikes();
    } catch (err) {
      console.error("Error al dar like:", err);
    }
  };

  const enviarComentario = async () => {
    if (!nuevoComentario.trim()) return;
    if (!usuarioId) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }

    try {
      const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");
      await axios.post("http://localhost:3001/api/comentarios/crear", {
        mensaje: nuevoComentario,
        fecha,
        usuario_id: usuarioId,
        publicacion_id: publicacion.id,
      });
      setNuevoComentario("");
      obtenerComentarios();
    } catch (err) {
      console.error("Error al comentar:", err);
    }
  };

  if (!publicacion) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={publicacion.imagen}
          alt="publicacion"
          className="modal-image"
        />

        <div className="modal-info">
          <span className="modal-close" onClick={onClose}>✕</span>

          <h2>{publicacion.titulo}</h2>
          <Link
  to={`/negocio/${publicacion.emprendimiento_id}`}
  className="modal-empresa"
>
  🏠 {publicacion.nombre_emprendimiento}
</Link>
          <p className="modal-descripcion">{publicacion.contenido}</p>

          <div className="modal-likes">
            <span
              className={`corazon ${yaDioLike ? "liked" : ""}`}
              onClick={toggleLike}
            >
              ♥
            </span>
            <span>{likes}</span>
          </div>

          <div className="modal-comments">
            {comentarios.map(c => (
              <div key={c.id} className="comentario">
                <strong>{c.usuario_nombre}</strong>: {c.mensaje}
              </div>
            ))}
          </div>

          <div className="modal-input-comentario">
            <input
              type="text"
              placeholder="Escribe un comentario..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <button onClick={enviarComentario}>Comentar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPublicacion;
