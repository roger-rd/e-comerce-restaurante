import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { setUsuario } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setUsuario(null); // Establece el usuario en null o en un valor inicial adecuado
        localStorage.removeItem("usuario"); // Elimina los datos del usuario almacenados en el localStorage
        navigate("/"); // Navega a la página de inicio o a la ruta que desees después del logout
      };
      return (
        <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
          <h1>Cerrar Sesión</h1>
          <hr />
          <button onClick={logout} className="btn btn-light mt-3">
            Cerrar Sesión
          </button>
        </div>
      );
    }
