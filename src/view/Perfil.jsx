// import { useEffect, useContext } from "react";
// import { UserContext } from "../context/UserContext";
// import { perfilContext } from "../context/PerfilContext";
// import axios from "axios";

// export default function Perfil() {
//   const { setUsuario } = useContext(UserContext);
//   const { usuarios } = useContext(perfilContext);

//   const getUsuarioData = async (correo) => {
//     const urlServer = "https://proyect-backend.onrender.com/api/v1/user/usuario";
//     try {
//       const { data } = await axios.get(urlServer, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         params: {
//           correo: correo,
//         },
//       });
//       setUsuario(data);
//     } catch (error) {
//       alert("Hubo un error al obtener los datos del usuario 🙁");
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const usuarioLocalStorage = localStorage.getItem("usuario");
//     if (usuarioLocalStorage) {
//       const usuario = JSON.parse(usuarioLocalStorage);
//       getUsuarioData(usuario.correo);
//     }
//   }, []);


import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Perfil() {
  const { setUsuario } = useContext(UserContext);

  const getUsuarioData = async () => {
    const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
    const endpoint = "/perfil/:id_usuario ";
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(urlServer, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsuario(data);
    } catch (error) {
      alert("Hubo un error al obtener los datos del usuario 🙁");
      console.log(error);
    }
  };

  useEffect(() => {
    getUsuarioData();
  }, []);




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
             
                  <div className="row-cols-1 row-cols-md-1 ">
                    <div className="col">
                      <div className="card h-100">
                        <div className="card-body">
                          <h2>Datos Personales</h2>
                          <h5 className="text-muted">Nombre y apellido: <span>{usuarios.nombre} {usuarios.apellido}</span></h5>
                          <h5 className="text-muted">Rut: {usuarios.rut}</h5>
                          <h5 className="text-muted">Correo: {usuarios.correo}</h5>
                          <h5 className="text-muted">Teléfono: {usuarios.telefono}</h5>
                        </div>
                        <hr />
                        <div className="card-footer">
                          <h2>Dirección de entrega</h2>
                          <h5 className="text-muted">Dirección: {usuarios.direccion} {usuarios.numero_de_direccion}</h5>
                          {/* <h5 className="text-muted">Comuna: {item.comuna}</h5> */}
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


//   return (
//     <>
//       <div>
//         <h1>
//           <span className="badge bg-secondary">Bienvenid@</span>
//         </h1>
//       </div>
//       <div className="container text-center">
//         <div className="row">
//           <div>
//             <div className="perfil">
//               {usuarios &&
//                 usuarios.map((item) => (
//                   <div className="row-cols-1 row-cols-md-1 " key={item.id}>
//                     <div className="col">
//                       <div className="card h-100">
//                         <div className="card-body">
//                           <h2>Datos Personales</h2>
//                           <h5 className="text-muted">Nombre y apellido: <span>{item.nombre} {item.apellido}</span></h5>
//                           <h5 className="text-muted">Rut: {item.rut}</h5>
//                           <h5 className="text-muted">Correo: {item.correo}</h5>
//                           <h5 className="text-muted">Teléfono: {item.telefono}</h5>
//                         </div>
//                         <hr />
//                         <div className="card-footer">
//                           <h2>Dirección de entrega</h2>
//                           <h5 className="text-muted">Dirección: {item.direccion} {item.numero_de_direccion}</h5>
//                           {/* <h5 className="text-muted">Comuna: {item.comuna}</h5> */}
//                         </div>

//                         <div className="buttonHome">
//                           <button
//                             className="btn btn-info"
//                             onClick={() => {
//                               // Agrega la lógica para la acción de "Editar perfil"
//                               console.log("Editar perfil");
//                             }}
//                           >
//                             Editar Perfil
//                           </button>
//                           <button
//                             className="btn btn-danger"
//                             onClick={() => {
//                               // Agrega la lógica para la acción de "Eliminar usuario"
//                               console.log("Eliminar usuario");
//                             }}
//                           >
//                             Eliminar
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
