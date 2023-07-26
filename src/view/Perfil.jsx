import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { perfilContext } from "../context/PerfilContext";

export default function Perfil() {
  const { setUsuario } = useContext(UserContext);
  const { usuarios } = useContext(perfilContext);

  useEffect(() => {
    const usuarioLocalStorage = localStorage.getItem("usuario");
    if (usuarioLocalStorage) {
      setUsuario(JSON.parse(usuarioLocalStorage));
    }
  }, []);

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
              {usuarios &&
                usuarios.map((item) => (
                  <div className="row-cols-1 row-cols-md-1 " key={item.id}>
                    <div className="col">
                      <div className="card h-100">
                        <div className="card-body">
                          <h2>Datos Personales</h2>
                          <h5 className="text-muted">Nombre y apellido: <span>{item.nombre} {item.apellido}</span></h5>
                          <h5 className="text-muted">Rut: {item.rut}</h5>
                          <h5 className="text-muted">Correo: {item.correo}</h5>
                          <h5 className="text-muted">Teléfono: {item.telefono}</h5>
                        </div>
                        <hr />
                        <div className="card-footer">
                          <h2>Dirección de entrega</h2>
                          <h5 className="text-muted">Dirección: {item.direccion} {item.numeroDeCalle}</h5>
                          <h5 className="text-muted">Comuna: {item.comuna}</h5>
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
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
