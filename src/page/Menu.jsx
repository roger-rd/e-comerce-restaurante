import "../assets/css/home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../components/ButtonAdd";
import { useUserContext } from "../context/UserContext";
import { useContext } from "react";
import Context from "../context/Context";

export default function Menu() {
  const { platos, favorito, setfavorito } = useUserContext();
  const { usuario} = useContext(Context);
  const navigate = useNavigate();
  

  const handleToggleFavorite = (id) => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar a favoritos.");
      return;
    }

    const index = favorito.findIndex((ele) => ele.id === id);
    favorito[index].favorito = !favorito[index].favorito;
    setfavorito([...favorito]);
  };

  const handleAddToCart = (id) => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar al carrito.");
      return;
    }

     }
  

  return (
    <div>
      <div className="home">
        {platos.map((item) => (
          <div className="row-cols-1 row-cols-md-1 " key={item.id}>
            <div className="col">
              <div className="card h-100">
                <img src={item.img} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <ul className="card-text">
                    <li>{item.ingredients[0]}</li>
                    <li>{item.ingredients[1]}</li>
                    <li>{item.ingredients[2]}</li>
                    <li>{item.ingredients[3]}</li>
                  </ul>
                </div>
                <hr />
                <div className="card-footer">
                  <h5 className="text-muted">$ {item.price}</h5>
                  <h5 className="text-muted">👨🏼‍💼 {item.cantidad}</h5>

                  <div className="buttonHome">
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        navigate(`/DetalleMenu/${item.id}`);
                      }}
                    >
                      Ver más 👀
                    </button>
                    <ButtonAdd
                      idPlato={item.id}
                      onClick={() => handleAddToCart(item.id)}
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => handleToggleFavorite(item.id)}
                    >
                      {favorito.find((photo) => photo.id === item.id)?.favorito
                        ? "Quitar de favoritos ❤️"
                        : "Agregar a favoritos 🤍"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

