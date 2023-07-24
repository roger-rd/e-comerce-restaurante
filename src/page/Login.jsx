import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export default function RegistroForm() {
  const { setUsuario } = useContext(AuthContext); // Utiliza useContext para obtener el contexto
  const navigate = useNavigate();
  
  const [usuario, setUsuarioLocal] = useState({});

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setUsuarioLocal({ ...usuario, ...field });
  };

  const iniciarSesion = async () => {
    const urlServer = "http://localhost:3001/api/v1/user";
    const endpoint = "/login";
    const { correo, password } = usuario;
    try {
      if (!correo || !password) return alert("correo y password obligatorias");
      const { data: token } = await axios.post(urlServer + endpoint, usuario);
      toast.success("Usuario identificado con éxito 😀", { autoClose: 3000 });
      localStorage.setItem("token", token);
      setUsuario({ correo }); 
      navigate("/perfil");
    } catch ({ response: { data: message } }) {
      alert("correo o Password incorrecto 🙁, intente nuevamente");
      console.log(message);
    }
  };

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className="form-group mt-1">
        <label>correo address</label>
        <input
          value={usuario.correo}
          onChange={handleSetUsuario}
          type="correo"
          name="correo"
          className="form-control"
          placeholder="Enter correo"
        />
      </div>
      <div className="form-group mt-1">
        <label>Password</label>
        <input
          value={usuario.password}
          onChange={handleSetUsuario}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <button onClick={iniciarSesion} className="btn btn-light mt-3">
        Iniciar Sesión
      </button>
    </div>
  );
}
