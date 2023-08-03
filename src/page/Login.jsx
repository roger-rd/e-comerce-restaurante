import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function RegistroForm() {
  const { setUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [usuario, setUsuarioLocal] = useState({
    correo: "", 
    password: "",
  });

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setUsuarioLocal({ ...usuario, ...field });
  };

  const iniciarSesion = async () => {
    const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
    const endpoint = "/login";

    // const urlServer = "http://localhost:3001/api/v1/user/";
    // const endpoint = "/login";

    const { correo, password } = usuario;
    try {
      if (!correo || !password) 
      return alert("correo y password obligatorias");
      
      setLoading(true); // Activar el estado de loading

      const { data: token } = await axios.post(urlServer + endpoint, usuario);
      toast.success("Usuario identificado con éxito 😀", { autoClose: 3000 });
      localStorage.setItem("token",token); // Guardar el token en el localStorage
      setUsuario();
      setLoading(false);
      navigate("/perfil");
    } catch ({ response: { data: message } }) {
      alert( "Email o Password incorrecto 🙁, intente nuevamente  ");
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
        {loading ? "Cargando..." : "Iniciar Sesión"}
      </button>
    </div>
    
  );
}


