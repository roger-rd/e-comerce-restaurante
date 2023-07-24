import './App.css'

import {  Route, Routes } from 'react-router-dom'
import { useLocalStorage } from 'react-use';

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './page/Home';
import DetalleMenu from './page/DetalleMenu';
import Registro from './page/Registro';
import Login from './page/Login';
import Menu from './page/Menu';

//rutas protegidas//
import Perfil from './view/Perfil';
import MisPedidos from './view/MisPedidos';
import Favoritos from './view/Favoritos';
import Car from './page/Car';
import Logout from './view/Logout';
import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const [user, setUser] = useLocalStorage('user');

  
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/detalleMenu/:id" element={<DetalleMenu />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute canActivate={setUser}/>}>
          
            <Route path="/car" element={<Car/>} />
            <Route path="/perfil" element={<Perfil/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/misPedidos" element={<MisPedidos />} />
          
          </Route>

        </Routes>
      </main>
      <Footer />
      <ToastContainer/>
    </>
  );
}




export default App;
