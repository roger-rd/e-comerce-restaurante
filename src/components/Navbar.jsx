import "../assets/css/navbarFooter.css";

import { NavLink} from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { useOperationsContext } from "../context/OperationsContext";


export default function Navbar() {

    const {FormatCoin, total} = useOperationsContext ()
    const { usuario } = useContext(AuthContext);

    return (

        <nav>
            <div className=" d-flex ">
                
                <div className=" navHom">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/" >🍕🍝🍔 My Food</NavLink>
                </div>
                <div className=" navHom car">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/menu" >Menu</NavLink>
                </div>

                {!usuario && (
                    <div className=" navHom car">
                        <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/registro" >Registrarse</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/login" >Iniciar Sesión</NavLink>
                    </div>
                    )}

                

                {/* rutas protegidas */}

                {usuario ? (
                    <div className=" d-flex ">
                        <div className=" navHom car">
                            <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/car" >🛒{FormatCoin(total)}</NavLink>
                        </div>
                        <div className=" navHom car">
                            <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/perfil" >Perfil</NavLink>
                        </div>
                        <div className=" navHom car">
                            <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/mispedidos" >Mis Pedidos</NavLink>
                        </div>
                        <div className=" navHom car">
                            <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/favoritos" > Favoritos</NavLink>
                        </div>
                        <div className=" navHom car">
                            <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/logout" > Logout</NavLink>
                        </div>
                    </div> 
                    
                ):(null)}
                </div>
        </nav>
    );
}
