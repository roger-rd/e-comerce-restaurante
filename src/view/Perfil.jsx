import { useContext, useState, useEffect } from "react";
import Context from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Perfil() {
  const { setUsuario: setUsuarioGlobal } = useContext(Context);

  const [usuario, setUsuarioLocal] = useState({});
  const [loading, setLoading] = useState(true);

  const getUsuarioData = async () => {
    const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
    const endpoint = "/usuario";
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsuarioGlobal(data);
      setUsuarioLocal(data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No se encontró el perfil del usuario.");
      } else {
        toast.error("Hubo un error al obtener los datos del usuario 🙁");
      }
    } finally {
      setLoading(false); // Establece loading en falso después de completar la solicitud, ya sea con éxito o con error.
    }
  };

  useEffect(() => {
    getUsuarioData();
  }, []);

  // Agrega una lógica para mostrar un mensaje de carga mientras los datos se están obteniendo
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div>
        <h1>
          <span className="badge bg-secondary">Bienvenid@</span>
        </h1>
      </div>
      <div className="container text-center">
        <div className="row">
          <div>
            <div className="perfil">
              <div className="row-cols-1 row-cols-md-1 ">
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body">
                      <h2>Datos Personales</h2>
                      <h5 className="text-muted">Nombre y apellido: <span>{usuario.nombre} {usuario.apellido}</span></h5>
                      <h5 className="text-muted">Rut: {usuario.rut}</h5>
                      <h5 className="text-muted">Correo: {usuario.correo}</h5>
                      <h5 className="text-muted">Teléfono: {usuario.telefono}</h5>
                    </div>
                    <hr />
                    <div className="card-footer">
                      <h2>Dirección de entrega</h2>
                      <h5 className="text-muted">Dirección: {usuario.direccion} {usuario.numero_de_direccion}</h5>
                    </div>

                    <div className="buttonHome">
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          // Agrega la lógica para la acción de "Editar perfil"
                          console.log("Editar perfil");
                        }}
                      >
                        Editar Perfil
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          // Agrega la lógica para la acción de "Eliminar usuario"
                          console.log("Eliminar usuario");
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
