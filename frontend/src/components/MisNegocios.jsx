import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importar
import { obtenerEmprendimientos } from '../services/usuarioService';
import '../styles/MisNegocios.css'; // Asegúrate de tener un archivo CSS para estilos
function MisNegocios({ usuarioId }) {
  const [negocios, setNegocios] = useState([]);
  const navigate = useNavigate(); // ✅ Hook de navegación

  useEffect(() => {
    if (usuarioId) {
      obtenerEmprendimientos(usuarioId)
        .then(res => setNegocios(res.data))
        .catch(err => console.error(err));
    }
  }, [usuarioId]);

  return (
    <div className="mis-negocios">
      {negocios.map((negocio) => (
        <div key={negocio.id} className="card-negocio" onClick={() => navigate(`/negocio/${negocio.id}`)}>
  <img src={negocio.imagen || 'imagen-defecto.jpg'} alt={negocio.nombre} />
  <h3>{negocio.nombre}</h3>
  <p>{negocio.descripcion}</p>
</div>
      ))}
      
      <button onClick={() => navigate('/crear-negocio')}>
        Crear nuevo negocio
      </button>
    </div>
  );
}

export default MisNegocios;
