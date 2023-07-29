import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';


import UserContextProvider from "./context/UserContext"
import OperationsContextProvider from "./context/OperationsContext";
import PerfilProvider from './context/PerfilContext';



import { AuthProvider } from './context/AuthContext';


createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
  
   
      <UserContextProvider>
        <PerfilProvider>
          <OperationsContextProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </OperationsContextProvider>
        </PerfilProvider>
      </UserContextProvider>
    
  
  </React.StrictMode>
);
