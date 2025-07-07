import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PerfilNegocio({ usuarioId }) {
  const { id } = useParams();
  const [negocio, setNegocio] = useState(null);
  const [esPropietario, setEsPropietario] = useState(false);
  const [sigue, setSigue] = useState(false);
  const [publicaciones, setPublicaciones] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [nuevoComentario, setNuevoComentario] = useState({});
  const [likes, setLikes] = useState({});
  const [mostrarComentarios, setMostrarComentarios] = useState({});

  const [nuevaPublicacion, setNuevaPublicacion] = useState({
    titulo: '',
    contenido: '',
  });
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/emprendimientos/detalle/${id}`)
      .then(res => {
        setNegocio(res.data);
        setEsPropietario(res.data.usuario_id === usuarioId);
        verificarSeguimiento(usuarioId, res.data.id);
        obtenerPublicaciones(res.data.id);
      })
      .catch(err => console.error('Error al obtener negocio:', err));
  }, [id, usuarioId]);

  const verificarSeguimiento = async (usuarioId, emprendimientoId) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/emprendimientos/seguimiento/${usuarioId}/${emprendimientoId}`);
      setSigue(res.data.sigue);
    } catch (err) {
      console.error('Error al verificar seguimiento', err);
    }
  };
  const inicializarMostrarComentarios = (publicaciones, comentariosMap) => {
  const nuevoEstado = {};
  publicaciones.forEach(pub => {
    const hayMuchosComentarios = (comentariosMap[pub.id]?.length || 0) > 2;
    nuevoEstado[pub.id] = hayMuchosComentarios ? false : true;
  });
  return nuevoEstado;
  };
 
 const obtenerPublicaciones = async (emprendimientoId) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/publicaciones/${emprendimientoId}`);
    setPublicaciones(res.data);

    const comentariosRes = await axios.get(`http://localhost:3001/api/comentarios/${emprendimientoId}`);
    const likesRes = await axios.get(`http://localhost:3001/api/likes/${emprendimientoId}`);

    const comentariosMap = {};
    comentariosRes.data.forEach(c => {
      if (!comentariosMap[c.publicacion_id]) comentariosMap[c.publicacion_id] = [];
      comentariosMap[c.publicacion_id].push(c);
    });
    setComentarios(comentariosMap);

    const mostrarInicial = inicializarMostrarComentarios(res.data, comentariosMap);
    setMostrarComentarios(mostrarInicial);

    const likesMap = {};
    likesRes.data.forEach(l => {
      likesMap[l.publicacion_id] = (likesMap[l.publicacion_id] || 0) + 1;
    });
    setLikes(likesMap);
  } catch (err) {
    console.error('Error al obtener publicaciones o datos asociados:', err);
  }
};


  const toggleSeguimiento = async () => {
    try {
      if (sigue) {
        await axios.delete(`http://localhost:3001/api/emprendimientos/dejar-seguir`, {
          data: { usuario_id: usuarioId, emprendimiento_id: negocio.id }
        });
      } else {
        await axios.post(`http://localhost:3001/api/emprendimientos/seguir`, {
          usuario_id: usuarioId,
          emprendimiento_id: negocio.id
        });
      }
      setSigue(!sigue);
    } catch (err) {
      console.error('Error al cambiar seguimiento:', err);
    }
  };

  const handleCrearPublicacion = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';

      if (imagenFile) {
        const formData = new FormData();
        formData.append('imagen', imagenFile);

        const res = await axios.post('http://localhost:3001/api/publicaciones/subir-imagen', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        imageUrl = res.data.url;
      }

      await axios.post('http://localhost:3001/api/publicaciones/crear', {
        ...nuevaPublicacion,
        imagen: imageUrl,
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
        emprendimiento_id: negocio.id
      });

      setNuevaPublicacion({ titulo: '', contenido: '' });
      setImagenFile(null);
      obtenerPublicaciones(negocio.id);
    } catch (err) {
      console.error('Error al publicar:', err);
    }
  };

  const handleComentario = async (pubId) => {
  const mensaje = nuevoComentario[pubId];
  if (!mensaje) return;

  try {
    const fechaFormateada = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await axios.post('http://localhost:3001/api/comentarios/crear', {
      mensaje,
      fecha: fechaFormateada,
      usuario_id: usuarioId,
      publicacion_id: pubId
    });

    setNuevoComentario({ ...nuevoComentario, [pubId]: '' });

    // Recargar comentarios actualizados
    const comentariosRes = await axios.get(`http://localhost:3001/api/comentarios/${negocio.id}`);
    const comentariosMap = {};
    comentariosRes.data.forEach(c => {
      if (!comentariosMap[c.publicacion_id]) comentariosMap[c.publicacion_id] = [];
      comentariosMap[c.publicacion_id].push(c);
    });
    setComentarios(comentariosMap);

    setMostrarComentarios(prev => ({
      ...prev,
      [pubId]: comentariosMap[pubId].length <= 2
    }));

  } catch (err) {
    console.error('Error al comentar:', err);
  }
};


  const darLike = async (pubId) => {
  if (!usuarioId) return;

  try {
    await axios.post('http://localhost:3001/api/likes/toggle', {
      usuario_id: usuarioId,
      publicacion_id: pubId
    });

    // Recargar los likes y comentarios
    obtenerPublicaciones(negocio.id);
  } catch (err) {
    console.error('Error al dar o quitar like:', err);
  }
};


  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImagenFile(file);
    }
  };

  if (!negocio) return <p>Cargando negocio...</p>;

  return (
    <div className="perfil-negocio">
      <div className="banner">
        <img src={negocio.imagen || '/imagen-defecto.jpg'} alt="Portada negocio" />
      </div>

      <div className="info-negocio">
  <h2>{negocio.nombre}</h2>
  <p>{negocio.descripcion}</p>
  <p><strong>📞 Teléfono:</strong> {negocio.telefono || 'No disponible'}</p>
  <p><strong>📍 Dirección:</strong> {negocio.ubicacion || 'No disponible'}</p>

  {!esPropietario && usuarioId && (
    <button onClick={toggleSeguimiento}>
      {sigue ? 'Dejar de seguir' : 'Seguir'}
    </button>
  )}
</div>

      {esPropietario && (
        <div className="form-publicacion">
          <h3>Crear publicación</h3>
          <form onSubmit={handleCrearPublicacion}>
            <input
              type="text"
              placeholder="Título"
              value={nuevaPublicacion.titulo}
              onChange={(e) => setNuevaPublicacion({ ...nuevaPublicacion, titulo: e.target.value })}
              required
            />
            <textarea
              placeholder="Contenido"
              value={nuevaPublicacion.contenido}
              onChange={(e) => setNuevaPublicacion({ ...nuevaPublicacion, contenido: e.target.value })}
              required
            />
            <div className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
              {imagenFile ? (
                <img src={URL.createObjectURL(imagenFile)} alt="Vista previa" className="preview" />
              ) : (
                <p>Arrastra y suelta una imagen aquí</p>
              )}
            </div>
            <button type="submit">Publicar</button>
          </form>
        </div>
      )}

      <div className="lista-publicaciones">
        <h3>Publicaciones</h3>
        {publicaciones.map(pub => (
          <div className="card-publicacion" key={pub.id}>
            <h4>{pub.titulo}</h4>
            <p>{pub.contenido}</p>
            {pub.imagen && <img src={pub.imagen} alt="Imagen publicación" className="preview" />}
            <div className="publicacion-meta">
              <span>{new Date(pub.fecha).toLocaleString()}</span>
              <button onClick={() => darLike(pub.id)}>❤️ {likes[pub.id] || 0}</button>
            </div>

            <div className="comentarios">
              {(comentarios[pub.id] || [])
                .slice(
                  0,
                  comentarios[pub.id]?.length > 2 && !mostrarComentarios[pub.id]
                    ? 2
                    : comentarios[pub.id]?.length
                )
                .map(c => (
                  <div key={c.id} className="comentario">
                    <strong>{c.usuario_nombre}</strong>: {c.mensaje}
                  </div>
                ))}

              {comentarios[pub.id]?.length > 2 && (
                <button
                  className="ver-mas-comentarios"
                  onClick={() =>
                    setMostrarComentarios({
                      ...mostrarComentarios,
                      [pub.id]: !mostrarComentarios[pub.id],
                    })
                  }
                >
                  {mostrarComentarios[pub.id] ? 'Ver menos' : 'Ver más comentarios'}
                </button>
              )}

              {usuarioId && (
                <div className="form-comentario">
                  <input
                    type="text"
                    placeholder="Escribe un comentario..."
                    value={nuevoComentario[pub.id] || ''}
                    onChange={(e) =>
                      setNuevoComentario({ ...nuevoComentario, [pub.id]: e.target.value })
                    }
                  />
                  <button onClick={() => handleComentario(pub.id)}>Comentar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerfilNegocio;
