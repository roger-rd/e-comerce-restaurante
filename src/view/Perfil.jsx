import "../assets/css/perfil.css"; 
import { useContext, useState, useEffect } from "react";
import Context from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Perfil() {
  const { setUsuario: setUsuarioGlobal, usuario } = useContext(Context);

  const [usuarioLocal, setUsuarioLocal] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [nuevosDatos, setNuevosDatos] = useState(usuarioLocal);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevosDatos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getUsuarioData = async () => {
    const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
    const endpoint = "/perfil";

    // const urlServer = "http://localhost:3001/api/v1/user/";
    // const endpoint = "/perfil";


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
      const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
      const endpoint = `/update/${usuario.id_usuario}`;

      // const urlServer = "http://localhost:3001/api/v1/user";
      // const endpoint = `/update/${usuario.id_usuario}`;

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
                            <h5 className="text-muted">Nombre y Apellido:
                              <input 
                                className="input-perfil"
                                type="text"
                                name="nombre"
                                value={nuevosDatos.nombre}
                                onChange={handleChange}
                                placeholder="Nuevo nombre"
                                maxlength="50"
                              />
                              <input 
                                className="input-perfil "
                                type="text"
                                name="Apellido"
                                value={nuevosDatos.apellido}
                                onChange={handleChange}
                                placeholder="Nuevo apellido"
                                maxlength="50"
                              />
                            </h5>
                            <h5 className="text-muted ">Rut:
                              <input
                                className="input-perfil"
                                type="text"
                                name="rut"
                                value={nuevosDatos.rut}
                                onChange={handleChange}
                                placeholder="Nuevo rut"
                                maxlength="10"
                              />
                              <h5 className="fs-6 fw-lighter" >(ingrese rut sin puntos y con guión)</h5>
                            </h5>
                            <h5 className="text-muted">Telefono:
                              <input
                                className="input-perfil"
                                type="number"
                                name="telefono"
                                value={nuevosDatos.telefono}
                                onChange={handleChange}
                                placeholder="Nuevo teléfono"
                                maxlength="10"

                              />
                            </h5>
                            <h5 className="text-muted">Correo:
                              <input
                                className="input-perfil"
                                type="text"
                                name="correo"
                                value={nuevosDatos.correo}
                                onChange={handleChange}
                                placeholder="Nuevo correo"
                                maxlength="50"
                              />
                            </h5>
                            <h5 className="text-muted">Contraseña:
                              <input
                                className="input-perfil"
                                type="password"
                                name="password"
                                value={nuevosDatos.password}
                                onChange={handleChange}
                                placeholder="Nuevo contraseña"
                                maxlength="100"
                              />
                              <h5 className="fs-6 fw-lighter">(Deben se más de 6 digitos)</h5>
                            </h5>

                            <hr />

                            <div className="card-footer-perfil">
                            <h2>Dirección de entrega</h2>
                              <div>
                                <h5 className="text-muted">Direccion:
                                <hr />
                                <input
                                  className="input-perfil"
                                  type="text"
                                  name="direccion"
                                  value={nuevosDatos.direccion}
                                  onChange={handleChange}
                                  placeholder="Nueva direccion"
                                maxlength="100"

                                />
                                <input
                                  className="input-perfil"
                                  type="number"
                                  name="numero_de_direccion"
                                  value={nuevosDatos.numero_de_direccion}
                                  onChange={handleChange}
                                  placeholder="Nuevo numero de direccion"
                                />
                              </h5>
                                </div>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <h4 className="text-muted">Nombre y Apellido: <span><h5>{usuarioLocal.nombre} {usuarioLocal.apellido}</h5></span> </h4>
                         
                          <h4 className="text-muted">Rut: <span><h6>{usuarioLocal.rut}</h6></span> </h4>
            
                          <h4 className="text-muted">Correo: <span><h6>{usuarioLocal.correo}</h6></span> </h4>
                          
                          <h4 className="text-muted">Teléfono: <span><h5>{usuarioLocal.telefono}</h5></span></h4>
                          <hr />
                          <div className="card-footer">
                            <h2>Dirección de entrega</h2>
                            
                              <h5 className="text-muted">Dirección: {usuarioLocal.direccion} {usuarioLocal.numero_de_direccion}</h5>
                            
                            
                          </div>
                        </>
                      )}
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                        {editMode ? (
                        <>
                          <button className="btn btn-success boton-perfil" onClick={handleUpdateProfile}>
                            Guardar
                          </button>
                          <Link to="/menu" className="btn btn-warning boton-perfil">Volver</Link>
                        </>
                      ) : (
                        <button
                          className="btn btn-info" boton-perfil
                          onClick={() => setEditMode(true)}
                        >
                          Editar Usuario
                        </button>
                        
                      )}
                      <button
                        className="btn btn-danger boton-perfil"
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
