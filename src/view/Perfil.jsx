import { useContext, useState, useEffect } from "react";
import Context from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Perfil() {
  const { setUsuario: setUsuarioGlobal, usuario } = useContext(Context);

  const [usuarioLocal, setUsuarioLocal] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Estado local para almacenar los nuevos valores del usuario
  const [nuevosDatos, setNuevosDatos] = useState(usuarioLocal);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevosDatos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getUsuarioData = async () => {
    // const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
    // const endpoint = "/perfil";

    const urlServer = "http://localhost:3001/api/v1/user/";
    const endpoint = "/perfil";


    const token = localStorage.getItem("token");
    console.log("Token:", token)

    try {
      console.log("Realizando petición a:", urlServer + endpoint);
      const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });


      console.log("Datos del usuario:", data);
      setUsuarioGlobal(data);
      setUsuarioLocal(data);
      setNuevosDatos(data);

    } catch (error) {
      console.log("Error al realizar la petición:", error);
      if (error.response && error.response.status === 404) {
        toast.error("No se encontró el perfil del usuario.");
      } else {
        toast.error("Hubo un error al obtener los datos del usuario 🙁");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsuarioData();
  }, []);

  const handleUpdateProfile = async () => {

    try {
      const urlServer = "http://localhost:3001/api/v1/user";
      const endpoint = `/update/${usuario.id_usuario}`;
      const token = localStorage.getItem("token");
      

      console.log("Realizando petición a:", urlServer + endpoint);

      const { rol, id_usuario, ...restoDatos } = nuevosDatos;

      const { data } = await axios.put(
        urlServer + endpoint,
        restoDatos,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      console.log("Datos actualizados:", data);
      toast.success("Perfil actualizado correctamente");
      setUsuarioGlobal(data.result)
      setEditMode(false);
    } catch (error) {
      if (error.response) {
        console.log("Error en la respuesta del servidor:", error.response.data);
        toast.error("Hubo un error al actualizar el perfil: " + error.response.data.error);
      } else if (error.request) {
        console.log("Error de conexión o de red:", error.request);
        toast.error("Hubo un error de conexión o de red al actualizar el perfil");
      } else {
        console.log("Error en la lógica de la solicitud:", error.message);
        toast.error("Hubo un error en la lógica de la solicitud al actualizar el perfil");
      }
    }
  };

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
                      {editMode ? (
                        <>
                          <form>
                            <h5 className="text-muted">Nombre y apellido:
                              <input
                                type="text"
                                name="nombre"
                                value={nuevosDatos.nombre}
                                onChange={handleChange}
                                placeholder="Nuevo nombre"
                              />
                              <input
                                type="text"
                                name="apellido"
                                value={nuevosDatos.apellido}
                                onChange={handleChange}
                                placeholder="Nuevo apellido"
                              />
                            </h5>
                            <h5 className="text-muted">Rut:
                              <input
                                type="text"
                                name="rut"
                                value={nuevosDatos.rut}
                                onChange={handleChange}
                                placeholder="Nuevo rut"
                              />
                            </h5>
                            <h5 className="text-muted">Telefono:
                              <input
                                type="number"
                                name="telefono"
                                value={nuevosDatos.telefono}
                                onChange={handleChange}
                                placeholder="Nuevo teléfono"
                              />
                            </h5>
                            <h5 className="text-muted">correo:
                              <input
                                type="text"
                                name="correo"
                                value={nuevosDatos.correo}
                                onChange={handleChange}
                                placeholder="Nuevo correo"
                              />
                            </h5>
                            <h5 className="text-muted">Contraseña:
                              <input
                                type="password"
                                name="password"
                                value={nuevosDatos.password}
                                onChange={handleChange}
                                placeholder="Nuevo contraseña"
                              />
                            </h5>

                            <hr />

                            <div className="card-footer">
                              <h5 className="text-muted">Direccion:
                                <input
                                  type="text"
                                  name="direccion"
                                  value={nuevosDatos.direccion}
                                  onChange={handleChange}
                                  placeholder="Nueva direccion"
                                />
                                <input
                                  type="number"
                                  name="numero_de_direccion"
                                  value={nuevosDatos.numero_de_direccion}
                                  onChange={handleChange}
                                  placeholder="Nuevo numero_de_direccion"
                                />
                              </h5>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <h5 className="text-muted">Nombre y Apellido: <span>{usuarioLocal.nombre} {usuarioLocal.apellido}</span></h5>
                          <h5 className="text-muted">Rut: {usuarioLocal.rut}</h5>
                          <h5 className="text-muted">Correo: {usuarioLocal.correo}</h5>
                          <h5 className="text-muted">Teléfono: {usuarioLocal.telefono}</h5>
                          <hr />
                          <div className="card-footer">
                            <h2>Dirección de entrega</h2>
                            <h5 className="text-muted">Dirección: {usuarioLocal.direccion} {usuarioLocal.numero_de_direccion}</h5>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="buttonHome">
                      {editMode ? (
                        <button
                          className="btn btn-success"
                          onClick={handleUpdateProfile}
                        >
                          Guardar Perfil
                        </button>
                      ) : (
                        <button
                          className="btn btn-info"
                          onClick={() => setEditMode(true)}
                        >
                          Editar Usuario
                        </button>
                      )}
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
