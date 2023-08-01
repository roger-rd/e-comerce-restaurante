import React, { useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function Logout() {
   const { setUsuario } = useContext(Context);
    const navigate = useNavigate();

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario"); 
        navigate("/"); 
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
