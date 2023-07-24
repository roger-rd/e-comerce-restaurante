import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegistroForm() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({});

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setUsuario({ ...usuario, ...field });
  };

  const registrarUsuario = async () => {
      try {
        const urlServer = "http://localhost:3001/api/v1/user";
        const endpoint = "/register";
        await axios.post(urlServer + endpoint, usuario)
      navigate("/login");
    } catch (error) {
        if(usuario.correo == usuario.correo){

        
        toast.error("Algo salió mal...", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
        console.log(error);
    }
      }
    };

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Registrar nuevo usuario</h1>
      <hr />
      <div className="form-group mt-1 ">
        <label>Nombre</label>
        <input
          value={usuario.nombre}
          onChange={handleSetUsuario}
          type="text"
          name="nombre"
          className="form-control"
          placeholder="Nombre"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Apellido</label>
        <input
          value={usuario.apellido}
          onChange={handleSetUsuario}
          type="text"
          name="apellido"
          className="form-control"
          placeholder="Apellido"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Rut</label>
        <input
          value={usuario.rut}
          onChange={handleSetUsuario}
          type="text"
          name="rut"
          className="form-control"
          placeholder="Rut"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Telefono</label>
        <input
          value={usuario.telefono}
          onChange={handleSetUsuario}
          type="tel"
          name="telefono"
          className="form-control"
          placeholder="Numero de Telefono"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Dirección</label>
        <input
          value={usuario.direccion}
          onChange={handleSetUsuario}
          type="text"
          name="direccion"
          className="form-control"
          placeholder="Direccion"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Numero de dirección</label>
        <input
          value={usuario.numeroDedireccion}
          onChange={handleSetUsuario}
          type="number"
          name="numero_de_direccion"
          className="form-control"
          placeholder="Numero de direccion"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Email address</label>
        <input
          value={usuario.correo}
          onChange={handleSetUsuario}
          type="email"
          name="correo"
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group mt-1 ">
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
      <div className="form-group mt-1 ">
        <label>Rol</label>
        <select
          value={usuario.rol}
          onChange={handleSetUsuario}
          name="rol"
          className="form-select"
        >
          <option disabled selected>
            Seleccione un rol
          </option>
          <option value="cliente">Cliente</option>
          <option value="administrativo">Administrativo</option>

        </select>
        </div>
      

      <button onClick={registrarUsuario} className="btn btn-light mt-3">
        Registrarme
      </button>
    </div>
  );
}
