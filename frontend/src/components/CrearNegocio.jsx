import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CrearNegocio({ usuarioId }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImagenFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';

      if (imagenFile) {
        const formData = new FormData();
        formData.append('imagen', imagenFile);

        const res = await axios.post('http://localhost:3001/api/emprendimientos/subir-imagen', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        imageUrl = res.data.url;
      }

      await axios.post('http://localhost:3001/api/emprendimientos/crear', {
        nombre,
        descripcion,
        telefono,
        imagen: imageUrl,
        ubicacion, // ✅ Nuevo campo
        usuario_id: usuarioId,
      });

      alert('Negocio creado correctamente');
      navigate('/mis-negocios'); // ✅ Redirige
    } catch (error) {
      console.error('Error al crear negocio:', error);
      alert('Hubo un error al registrar el negocio.');
    }
  };

  return (
    <div className="form-negocio">
      <h2>Crear Nuevo Negocio</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del negocio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección o ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />

        <div
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {imagenFile ? (
            <img src={URL.createObjectURL(imagenFile)} alt="Vista previa" className="preview" />
          ) : (
            <p>Arrastra y suelta una imagen aquí</p>
          )}
        </div>

        <button type="submit">Guardar Negocio</button>
      </form>
    </div>
  );
}

export default CrearNegocio;
